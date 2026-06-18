/* Controller layer: routing, search, SQL simulator, activities. */
const ADAMS_VIEW_API = window.ADAMS_VIEWS;
const ADAMS_SECTIONS = ADAMS_VIEW_API.SECTIONS;
const adamsRowsToTable = ADAMS_VIEW_API.rowsToTable;
const adamsEsc = ADAMS_VIEW_API.esc;
const state = { current:'home', cardIndex:0, cardBack:false, mock:null };
const page = document.getElementById('page');
const nav = document.getElementById('lessonNav');
const sidebar = document.getElementById('sidebar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
function id(){ return location.hash.replace('#','') || 'home'; }
function strip(html){ const d=document.createElement('div'); d.innerHTML=html; return d.textContent || ''; }
function sectionText(s){ try { return strip(s.render()); } catch(e){ return ''; } }
function buildNav(){
  nav.innerHTML = ADAMS_SECTIONS.filter(s=>!s.hiddenNav).map(s=>`<a class="nav-link" href="#${s.id}" data-id="${s.id}"><small>${adamsEsc(s.kind)}</small><span>${adamsEsc(s.title)}</span></a>`).join('');
}
function render(){
  const sec = ADAMS_SECTIONS.find(s=>s.id===id()) || ADAMS_SECTIONS[0]; state.current = sec.id;
  document.title = `${sec.title} | ADAMS Course`;
  page.innerHTML = sec.render();
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.toggle('active', a.dataset.id===sec.id));
  wirePage();
  const i = ADAMS_SECTIONS.findIndex(s=>s.id===sec.id);
  prevBtn.disabled = i<=0; nextBtn.disabled = i>=ADAMS_SECTIONS.length-1;
  prevBtn.onclick = ()=> location.hash = ADAMS_SECTIONS[Math.max(0,i-1)].id;
  nextBtn.onclick = ()=> location.hash = ADAMS_SECTIONS[Math.min(ADAMS_SECTIONS.length-1,i+1)].id;
  window.scrollTo(0,0); sidebar.classList.remove('open');
}
function wirePage(){
  document.querySelectorAll('.show-answer').forEach(btn=>btn.onclick=()=>{ const ans=btn.parentElement.querySelector('.answer'); if(ans) ans.style.display = ans.style.display==='block'?'none':'block'; });
  if(document.getElementById('sqlInput')) initSqlPlayground();
  if(document.getElementById('quizBox')) initQuiz();
  if(document.getElementById('tableExplorer')) initTableExplorer();
  if(document.getElementById('flashcard')) initFlashcards();
  if(document.getElementById('sqlChallenges')) initSqlChallenges();
  if(document.getElementById('startMock')) initMockDefense();
  if(document.querySelector('[data-cardinality]')) initCardinality();
  if(document.querySelector('[data-normalization]')) initNormalization();
  if(document.getElementById('searchInput')) initSearchPage();
  document.querySelectorAll('[data-table]').forEach(g=>g.onclick=()=>showTableInfo(g.dataset.table));
}
function initTableExplorer(){
  const root=document.getElementById('tableExplorer');
  root.innerHTML = `<div class="grid">${Object.entries(DATA.tables).map(([name,t])=>`<div class="card"><b>${adamsEsc(name)}</b><p>${adamsEsc(t.purpose)}</p><p><b>PK:</b> ${adamsEsc(t.pk.join(', '))}</p><p><b>FK:</b> ${t.fk.length?adamsEsc(t.fk.join('; ')):'None'}</p><button data-open-table="${name}">View sample rows</button></div>`).join('')}</div><div id="tableRows"></div>`;
  root.querySelectorAll('[data-open-table]').forEach(btn=>btn.onclick=()=>{ const name=btn.dataset.openTable; document.getElementById('tableRows').innerHTML=`<h2>${adamsEsc(name)} sample rows</h2>${adamsRowsToTable(DATA.sampleRows[name]||[])}`; });
}
function showTableInfo(name){
  const t = DATA.tables[name];
  const box = document.getElementById('diagramInfo');
  if(!box || !t) return;
  box.innerHTML = `<h3>${adamsEsc(name)}</h3><p>${adamsEsc(t.purpose)}</p><p><b>Primary Key:</b> ${adamsEsc(t.pk.join(', '))}</p><p><b>Foreign Keys:</b> ${t.fk.length?adamsEsc(t.fk.join('; ')):'None'}</p><p><b>Columns:</b> ${adamsEsc(t.columns.join(', '))}</p>`;
}
const examples = [
  ['SHOW TABLES','SHOW TABLES;'],['DESCRIBE students','DESCRIBE students;'],['SELECT students','SELECT * FROM students;'],['COUNT students','SELECT COUNT(*) AS total_students FROM students;'],['JOIN category','SELECT s.student_id, s.student_name, c.category_name\nFROM students s\nLEFT JOIN student_categories c ON c.category_id = s.category_id\nORDER BY s.student_name;'],['Requirements per category','SELECT c.category_name, r.requirement_name\nFROM category_requirements cr\nJOIN student_categories c ON c.category_id = cr.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nORDER BY c.category_name, r.requirement_name;'],['Missing/Pending','SELECT s.student_id, s.student_name, r.requirement_name, COALESCE(sr.status, \'MISSING\') AS status_result\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR) AND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL OR sr.status IS NULL OR sr.status IN (\'PENDING\',\'INSUFFICIENT\',\'REJECTED\')\nORDER BY s.student_name, r.requirement_name;']
];
function initSqlPlayground(){
  const input=document.getElementById('sqlInput'), out=document.getElementById('sqlOutput');
  document.getElementById('sqlExamples').innerHTML=examples.map(([label,sql])=>`<button class="example-btn" data-sql="${adamsEsc(sql)}">${adamsEsc(label)}</button>`).join('');
  document.querySelectorAll('[data-sql]').forEach(b=>b.onclick=()=>{input.value=b.dataset.sql; runSql();});
  document.getElementById('runSql').onclick=runSql;
  document.getElementById('copySql').onclick=()=>navigator.clipboard?.writeText(input.value);
  document.getElementById('clearSql').onclick=()=>{input.value='';out.innerHTML='';};
  function runSql(){ out.innerHTML = simulateSql(input.value); }
  runSql();
}
function simulateSql(sqlRaw){
  const sql = sqlRaw.trim().replace(/;$/,'');
  const upper = sql.toUpperCase().replace(/\s+/g,' ');
  if(!sql) return '<p class="muted">Type a SQL command first.</p>';
  if(/^USE\s+/i.test(sql)) return '<div class="note">Database selected: doc_admission_db</div>';
  if(/^SHOW\s+TABLES$/i.test(sql)) return adamsRowsToTable(Object.keys(DATA.tables).map(x=>({'Tables_in_doc_admission_db':x})));
  let m = sql.match(/^(DESCRIBE|DESC)\s+([a-z_]+)$/i);
  if(m){ const t=DATA.tables[m[2]]; if(!t) return error(`Unknown table: ${m[2]}`); return adamsRowsToTable(t.columns.map(c=>({Field:c,Type: c.includes('_id')?'INT / key field':'sample',Key:t.pk.includes(c)?'PRI':(t.fk.join(' ').includes(c)?'FK':'')}))); }
  m = sql.match(/^SELECT\s+COUNT\s*\(\s*\*\s*\)(?:\s+AS\s+([a-z_]+))?\s+FROM\s+([a-z_]+)$/i);
  if(m){ const rows=DATA.sampleRows[m[2]]; if(!rows) return error(`Unknown table: ${m[2]}`); return adamsRowsToTable([{[m[1]||'COUNT(*)']:rows.length}]); }
  m = sql.match(/^SELECT\s+\*\s+FROM\s+([a-z_]+)(?:\s+WHERE\s+last_name\s+LIKE\s+'%([^%]+)%')?$/i);
  if(m){ let rows=DATA.sampleRows[m[1]]; if(!rows) return error(`Unknown table: ${m[1]}`); if(m[2]) rows=rows.filter(r=>String(r.last_name||'').toLowerCase().includes(m[2].toLowerCase())); return adamsRowsToTable(rows); }
  if(upper.includes('FROM STUDENTS S') && upper.includes('STUDENT_CATEGORIES')){
    const rows=DATA.sampleRows.students.map(s=>{const c=DATA.sampleRows.student_categories.find(x=>x.category_id===s.category_id)||{};return {student_id:s.student_id, student_name:s.student_name, email:s.email, category_name:c.category_name||''};});
    return adamsRowsToTable(rows);
  }
  if(upper.includes('FROM CATEGORY_REQUIREMENTS') && upper.includes('REQUIREMENT_TYPES')){
    const rows=DATA.sampleRows.category_requirements.map(cr=>{const c=DATA.sampleRows.student_categories.find(x=>x.category_id===cr.category_id)||{};const r=DATA.sampleRows.requirement_types.find(x=>x.requirement_id===cr.requirement_id)||{};return {category_name:c.category_name, requirement_name:r.requirement_name, description:r.description};});
    return adamsRowsToTable(rows);
  }
  if(upper.includes('COALESCE') && upper.includes('MISSING')){
    let rows=[]; DATA.sampleRows.students.forEach(s=>{ DATA.sampleRows.category_requirements.filter(cr=>cr.category_id===s.category_id).forEach(cr=>{ const rt=DATA.sampleRows.requirement_types.find(r=>r.requirement_id===cr.requirement_id)||{}; const sr=DATA.sampleRows.student_requirements.find(x=>String(x.student_id)===String(s.student_id)&&x.requirement_id===cr.requirement_id); const status=sr?.status||'MISSING'; if(!sr || ['PENDING','INSUFFICIENT','REJECTED'].includes(status)) rows.push({student_id:s.student_id,student_name:s.student_name,requirement_name:rt.requirement_name,status_result:status}); }); }); return adamsRowsToTable(rows); }
  return error('This offline simulator supports common ADAMS reviewer queries only. Try the example buttons.');
}
function error(msg){return `<div class="warning"><b>SQL simulator note:</b> ${adamsEsc(msg)}</div>`}
function initQuiz(){
 const root=document.getElementById('quizBox');
 if(!root) return;
 const startingMode = root.dataset.reviewerMode || 'mixed';
 const normalizeText = v => String(v || '').replace(/\s+/g,' ').trim();
 const normItems = [
  {category:'Normalization', q:'What is the main purpose of normalization?', answer:'To organize data into related tables, reduce redundancy, avoid inconsistencies, and improve data integrity.', explain:'In ADAMS, normalization separates students, categories, requirements, users, logs, documents, and archives.'},
  {category:'Normalization', q:'What does UNF mean?', answer:'UNF means Unnormalized Form, where repeating groups or multiple values may still appear in one row.', explain:'Example: Requirement1, Status1, Requirement2, and Status2 in one student row.'},
  {category:'Normalization', q:'How did ADAMS apply 1NF?', answer:'ADAMS removed repeating groups by storing each requirement as a separate row instead of many requirement columns in one row.', explain:'1NF means atomic values and no repeating groups.'},
  {category:'Normalization', q:'How did ADAMS apply 2NF?', answer:'ADAMS separated data by purpose into tables such as students, student_categories, requirement_types, category_requirements, and student_requirements.', explain:'2NF removes partial dependency and separates core data by purpose.'},
  {category:'Normalization', q:'How did ADAMS apply 3NF?', answer:'ADAMS separated supporting data such as users, activity_log, print_logs, password_reset_tokens, documents, and archived_students.', explain:'3NF removes indirect/supporting dependencies from the main student table.'},
  {category:'Normalization', q:'What is an update anomaly?', answer:'An update anomaly happens when repeated data is changed in some places but not all, causing inconsistency.', explain:'Normalization helps prevent this by storing one fact in the right table.'},
  {category:'Normalization', q:'What is an insertion anomaly?', answer:'An insertion anomaly happens when data cannot be added unless unrelated data also exists.', explain:'For example, a requirement type should be addable even before a student submits it.'},
  {category:'Normalization', q:'What is a deletion anomaly?', answer:'A deletion anomaly happens when deleting one record accidentally removes important information that should remain.', explain:'Normalized tables reduce accidental data loss.'},
  {category:'Normalization', q:'Why is category_requirements needed?', answer:'It is needed because student categories and requirement types have a many-to-many relationship that requires a bridge table.', explain:'One category can require many documents, and one requirement can apply to many categories.'},
  {category:'Normalization', q:'What is the risk of one big table in ADAMS?', answer:'One big table causes repeated data, inconsistent values, difficult updates, poor reporting, and data anomalies.', explain:'ADAMS avoids this by using related normalized tables.'}
 ];
 const sqlItems = (DATA.sqlChallenges || []).map(c=>({category:'SQL Codes', q:c.q, answer:c.answer, explain:c.hint || 'Review the SQL command format.', isCode:true}));
 const extraSql = [
  {category:'SQL Codes', q:'Which SQL command lists the tables in the selected database?', answer:'SHOW TABLES;', explain:'SHOW TABLES displays all tables after selecting the database.', isCode:true},
  {category:'SQL Codes', q:'Which SQL command checks the columns, keys, and structure of the students table?', answer:'DESCRIBE students;', explain:'DESCRIBE or DESC shows table structure.', isCode:true},
  {category:'SQL Codes', q:'Which SQL command retrieves all records from students?', answer:'SELECT * FROM students;', explain:'SELECT retrieves records from a table.', isCode:true},
  {category:'SQL Codes', q:'Which SQL command counts all student records?', answer:'SELECT COUNT(*) AS total_students FROM students;', explain:'COUNT(*) counts the number of rows.', isCode:true},
  {category:'SQL Codes', q:'Which SQL command connects students to student_categories?', answer:'SELECT s.student_id, s.student_name, c.category_name FROM students s LEFT JOIN student_categories c ON c.category_id = s.category_id;', explain:'JOIN combines related tables using foreign keys or matching fields.', isCode:true},
  {category:'SQL Codes', q:'Which SQL keyword filters records?', answer:'WHERE', explain:'WHERE limits the returned rows based on a condition.'},
  {category:'SQL Codes', q:'Which SQL keyword groups rows for counting or summaries?', answer:'GROUP BY', explain:'GROUP BY is commonly used with COUNT, SUM, AVG, and other aggregate functions.'},
  {category:'SQL Codes', q:'Which SQL keyword filters grouped results?', answer:'HAVING', explain:'HAVING filters after GROUP BY.'}
 ];
 const qaItems = (DATA.qa || []).map(x=>({category:'Panel Q&A', q:x.q, answer:x.answer, explain:x.defense || x.memory || x.answer}));
 const allItems = [...qaItems, ...sqlItems, ...extraSql, ...normItems];
 const byMode = mode => {
  if(mode==='qa') return qaItems;
  if(mode==='sql') return [...sqlItems, ...extraSql];
  if(mode==='normalization') return normItems;
  return allItems;
 };
 function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
 let review = { mode:startingMode, index:0, score:0, attempts:0, answered:false, order:[] };
 function resetOrder(){ review.order = shuffle(byMode(review.mode).map((_,i)=>i)); review.index=0; review.answered=false; }
 function currentList(){ return byMode(review.mode); }
 function currentItem(){ const list=currentList(); if(!review.order.length || review.order.length!==list.length) resetOrder(); return list[review.order[review.index]]; }
 function makeOptions(item){
  const list=currentList();
  const same = list.filter(x=>x.answer!==item.answer).map(x=>x.answer);
  const fallback = allItems.filter(x=>x.answer!==item.answer).map(x=>x.answer);
  const pool = same.length>=3 ? same : fallback;
  return shuffle([item.answer, ...shuffle(pool).slice(0,3)]);
 }
 function labelFor(mode){ return mode==='qa'?'Panel Q&A only':mode==='sql'?'SQL codes only':mode==='normalization'?'Normalization only':'Mixed reviewer'; }
 function draw(){
  const list=currentList();
  if(!list.length){ root.innerHTML='<div class="warning">No reviewer questions available.</div>'; return; }
  const item=currentItem();
  const options=makeOptions(item);
  const pct=list.length ? ((review.index+1)/list.length)*100 : 0;
  root.innerHTML=`<div class="reviewer-shell">
    <div class="reviewer-toolbar">
      <select id="reviewMode" aria-label="Reviewer category">
        <option value="mixed" ${review.mode==='mixed'?'selected':''}>Mixed reviewer</option>
        <option value="qa" ${review.mode==='qa'?'selected':''}>Panel Q&A only</option>
        <option value="sql" ${review.mode==='sql'?'selected':''}>SQL codes only</option>
        <option value="normalization" ${review.mode==='normalization'?'selected':''}>Normalization only</option>
      </select>
      <button id="reviewShuffle" type="button">Shuffle</button>
      <button id="reviewReset" type="button" class="secondary">Reset Score</button>
    </div>
    <div class="reviewer-stats"><span>Mode: ${adamsEsc(labelFor(review.mode))}</span><span>Question ${review.index+1} of ${list.length}</span><span>Score: ${review.score} / ${review.attempts}</span></div>
    <div class="reviewer-progress"><div class="reviewer-fill" style="width:${Math.min(100,pct)}%"></div></div>
    <div class="reviewer-question"><span class="tag">${adamsEsc(item.category)}</span><h2>${adamsEsc(item.q)}</h2></div>
    <div class="reviewer-options">${options.map((opt,i)=>`<button class="reviewer-option" data-choice="${i}">${String.fromCharCode(65+i)}. ${item.isCode?`<code>${adamsEsc(opt)}</code>`:adamsEsc(opt)}</button>`).join('')}</div>
    <div id="reviewFeedback" class="reviewer-feedback"></div>
    <div class="reviewer-actions"><button id="reviewPrev" type="button" class="secondary">Previous</button><button id="reviewNext" type="button">Next</button></div>
  </div>`;
  root.querySelector('#reviewMode').onchange=e=>{ review.mode=e.target.value; review.score=0; review.attempts=0; resetOrder(); draw(); };
  root.querySelector('#reviewShuffle').onclick=()=>{ resetOrder(); draw(); };
  root.querySelector('#reviewReset').onclick=()=>{ review.score=0; review.attempts=0; review.answered=false; draw(); };
  root.querySelector('#reviewPrev').onclick=()=>{ review.index=(review.index-1+currentList().length)%currentList().length; review.answered=false; draw(); };
  root.querySelector('#reviewNext').onclick=()=>{ review.index=(review.index+1)%currentList().length; review.answered=false; draw(); };
  root.querySelectorAll('.reviewer-option').forEach((btn,i)=>btn.onclick=()=>check(btn, options[i], item));
 }
 function check(btn, chosen, item){
  if(review.answered) return;
  review.answered=true; review.attempts++;
  const ok=normalizeText(chosen)===normalizeText(item.answer);
  if(ok) review.score++;
  root.querySelectorAll('.reviewer-option').forEach(b=>{
   const text=b.textContent.replace(/^[A-D]\.\s*/,'').trim();
   if(normalizeText(text)===normalizeText(item.answer)) b.classList.add('correct');
   else if(b===btn) b.classList.add('wrong');
   b.disabled=true;
  });
  const fb=root.querySelector('#reviewFeedback');
  fb.className='reviewer-feedback '+(ok?'good':'bad');
  fb.innerHTML=`<b>${ok?'Correct!':'Incorrect.'}</b><br><b>Answer:</b> ${item.isCode?`<pre><code>${adamsEsc(item.answer)}</code></pre>`:adamsEsc(item.answer)}<br><b>Why:</b> ${adamsEsc(item.explain)}`;
  const stats=root.querySelector('.reviewer-stats');
  if(stats) stats.innerHTML=`<span>Mode: ${adamsEsc(labelFor(review.mode))}</span><span>Question ${review.index+1} of ${currentList().length}</span><span>Score: ${review.score} / ${review.attempts}</span>`;
 }
 resetOrder(); draw();
}
function initCardinality(){
 const box=document.querySelector('[data-cardinality]');
 box.innerHTML=`<h3>Cardinality Trainer</h3><p><b>Question:</b> One student category can classify many students. What is the cardinality?</p><button class="choice" data-correct="1:M">1:1</button><button class="choice" data-correct="1:M">1:M</button><button class="choice" data-correct="1:M">M:N</button><p class="explain">Correct answer: 1:M. One category can have many students.</p>`;
 box.querySelectorAll('.choice').forEach(btn=>btn.onclick=()=>{box.querySelectorAll('.choice').forEach(b=>{b.disabled=true; b.classList.toggle('correct',b.textContent==='1:M'); if(b===btn&&b.textContent!=='1:M') b.classList.add('wrong');}); box.querySelector('.explain').style.display='block';});
}
function initNormalization(){
 const box=document.querySelector('[data-normalization]');
 box.innerHTML=`<h3>Normalization Simulator</h3><p>Click the buttons to see how a messy ADAMS record becomes normalized.</p><div id="normOut"></div><div class="btn-row"><button data-stage="unf">UNF</button><button data-stage="1nf">Convert to 1NF</button><button data-stage="2nf">Convert to 2NF</button><button data-stage="3nf">Convert to 3NF</button></div>`;
 const out=box.querySelector('#normOut'); const stages={
  unf: adamsRowsToTable([{Student:'Reyes, Ana',Category:'Freshman',Requirement1:'Birth Certificate',Status1:'SUBMITTED',Requirement2:'Valid ID',Status2:'PENDING'}]),
  '1nf': adamsRowsToTable([{Student:'Reyes, Ana',Category:'Freshman',Requirement:'Birth Certificate',Status:'SUBMITTED'},{Student:'Reyes, Ana',Category:'Freshman',Requirement:'Valid ID',Status:'PENDING'}]),
  '2nf':'<ul><li>students</li><li>student_categories</li><li>requirement_types</li><li>category_requirements</li><li>student_requirements</li></ul>',
  '3nf':'<ul><li>users</li><li>activity_log</li><li>print_logs</li><li>password_reset_tokens</li><li>documents</li><li>archived_students</li></ul>'
 };
 out.innerHTML=stages.unf; box.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>out.innerHTML=stages[b.dataset.stage]);
}
function initFlashcards(){
 const card=document.getElementById('flashcard');
 function draw(){ const item=DATA.flashcards[state.cardIndex]; card.textContent=state.cardBack?item.back:item.front; card.classList.toggle('back',state.cardBack); }
 card.onclick=()=>{state.cardBack=!state.cardBack;draw();}; document.getElementById('flipCard').onclick=()=>card.click();
 document.getElementById('nextCard').onclick=()=>{state.cardIndex=(state.cardIndex+1)%DATA.flashcards.length;state.cardBack=false;draw();};
 document.getElementById('prevCard').onclick=()=>{state.cardIndex=(state.cardIndex-1+DATA.flashcards.length)%DATA.flashcards.length;state.cardBack=false;draw();}; draw();
}
function initSqlChallenges(){
 const root=document.getElementById('sqlChallenges');
 root.innerHTML=DATA.sqlChallenges.map((c,i)=>`<div class="activity-card"><h3>${i+1}. ${adamsEsc(c.q)}</h3><textarea rows="3" style="width:100%;padding:12px;border:1px solid var(--line);border-radius:8px" placeholder="Type SQL here..."></textarea><div class="btn-row"><button data-check="${i}">Check</button><button class="secondary" data-reveal="${i}">Reveal</button></div><div class="answer"></div></div>`).join('');
 root.querySelectorAll('[data-check]').forEach(btn=>btn.onclick=()=>{const c=DATA.sqlChallenges[btn.dataset.check]; const card=btn.closest('.activity-card'); const val=card.querySelector('textarea').value; const ok=new RegExp(c.regex,'i').test(val); const ans=card.querySelector('.answer'); ans.style.display='block'; ans.innerHTML=ok?`✅ Correct<br><small>${adamsEsc(c.hint)}</small>`:`❌ Not yet. Hint: ${adamsEsc(c.hint)}`;});
 root.querySelectorAll('[data-reveal]').forEach(btn=>btn.onclick=()=>{const c=DATA.sqlChallenges[btn.dataset.reveal]; const card=btn.closest('.activity-card'); const ans=card.querySelector('.answer'); ans.style.display='block'; ans.innerHTML=`Expected answer:<pre><code>${adamsEsc(c.answer)}</code></pre>`;});
}
function initMockDefense(){
 const q=document.getElementById('mockQ'), a=document.getElementById('mockA');
 document.getElementById('startMock').onclick=()=>{ state.mock=DATA.qa[Math.floor(Math.random()*DATA.qa.length)]; q.textContent=`Q${state.mock.num}. ${state.mock.q}`; a.style.display='none'; a.innerHTML=''; };
 document.getElementById('showMock').onclick=()=>{ if(!state.mock) return; a.innerHTML=`<p><b>Answer:</b> ${adamsEsc(state.mock.answer)}</p>${state.mock.defense?`<p><b>Defense line:</b> ${adamsEsc(state.mock.defense)}</p>`:''}${state.mock.memory?`<p><b>Must remember:</b> ${adamsEsc(state.mock.memory)}</p>`:''}`; a.style.display='block'; };
}
function initSearchPage(){ const input=document.getElementById('searchInput'); const out=document.getElementById('searchResults'); input.addEventListener('input',()=>renderSearch(input.value,out)); renderSearch('',out); }
function searchIndex(){
 const sectionItems=ADAMS_SECTIONS.map(s=>({type:s.kind,title:s.title,route:'#'+s.id,text:sectionText(s)}));
 const qaItems=DATA.qa.map(x=>({type:'Q&A',title:`Q${x.num}. ${x.q}`,route:'#search',text:`${x.q} ${x.answer} ${x.defense} ${x.memory}`}));
 const tableItems=Object.entries(DATA.tables).map(([name,t])=>({type:'TABLE',title:name,route:'#table-guide',text:`${name} ${t.purpose} ${t.columns.join(' ')} ${t.pk.join(' ')} ${t.fk.join(' ')}`}));
 const fullItems=Object.entries(DATA.fullText).map(([name,text])=>({type:'SOURCE',title:`Original ${name} reviewer text`,route:'#pdf-source',text}));
 return [...sectionItems,...qaItems,...tableItems,...fullItems];
}
function renderSearch(q,out,limit=25){
 q=q.trim().toLowerCase(); if(!q){ out.innerHTML='<div class="note">Type any keyword from the panel question. Example: cardinality, foreign key, DESCRIBE, 3NF, bridge table.</div>'; return; }
 const terms=q.split(/\s+/).filter(Boolean); const items=searchIndex().map(item=>{const hay=(item.title+' '+item.text).toLowerCase(); const score=terms.reduce((n,t)=>n+(hay.includes(t)?1:0),0); return {...item,score,hay};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,limit);
 if(!items.length){ out.innerHTML='<p>No result found. Try a shorter keyword.</p>'; return; }
 out.innerHTML=items.map(item=>{ const text=item.text.replace(/\s+/g,' '); const pos=text.toLowerCase().indexOf(terms[0]); const snip=text.slice(Math.max(0,pos-100), Math.max(0,pos-100)+360); return `<div class="search-hit"><h3><a href="${item.route}">${adamsEsc(item.title)}</a><span class="tag">${adamsEsc(item.type)}</span></h3><p>${highlight(snip,q)}</p></div>`;}).join('');
}
function highlight(text,q){ if(!q) return adamsEsc(text); const terms=q.split(/\s+/).filter(Boolean).map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')); return adamsEsc(text).replace(new RegExp(`(${terms.join('|')})`,'ig'),'<mark>$1</mark>'); }
// global search and quick panel
const topSearch=document.getElementById('topSearch'), topResults=document.getElementById('topSearchResults');
topSearch.addEventListener('input',()=>{ if(!topSearch.value.trim()){topResults.classList.remove('open'); return;} topResults.classList.add('open'); renderTopResults(topSearch.value); });
function renderTopResults(q){ const temp=document.createElement('div'); renderSearch(q,temp,8); topResults.innerHTML = temp.querySelectorAll('.search-hit').length ? Array.from(temp.querySelectorAll('.search-hit')).map(hit=>{const a=hit.querySelector('a'); const p=hit.querySelector('p'); return `<a class="top-result" href="${a.getAttribute('href')}"><b>${a.textContent}</b><small>${p.textContent.slice(0,170)}...</small></a>`}).join('') : '<div class="top-result">No result found.</div>'; }
document.addEventListener('click',e=>{ if(!e.target.closest('.top-search-wrap')) topResults.classList.remove('open'); });
document.getElementById('quickBtn').onclick=()=>document.getElementById('quickPanel').classList.add('open');
document.getElementById('closeQuick').onclick=()=>document.getElementById('quickPanel').classList.remove('open');
document.getElementById('quickSearch').addEventListener('input',e=>renderSearch(e.target.value, document.getElementById('quickResults'),8));
document.getElementById('menuBtn').onclick=()=>sidebar.classList.toggle('open');
document.getElementById('themeBtn').onclick=()=>document.body.classList.toggle('dark');
window.addEventListener('hashchange',render);
window.addEventListener('scroll',()=>{document.getElementById('toTop').style.display=scrollY>500?'block':'none';});
document.getElementById('toTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});
document.addEventListener('keydown',e=>{ if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){e.preventDefault(); topSearch.focus();} });
buildNav(); render();
