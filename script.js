
const pages=[...document.querySelectorAll('.page')];
const navBtns=[...document.querySelectorAll('.sidebar button')];
function goTo(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  navBtns.forEach(b=>b.classList.toggle('active',b.dataset.target===id));
  location.hash=id;
  window.scrollTo(0,0);
}
if(location.hash){ const id=location.hash.substring(1); if(document.getElementById(id)) goTo(id); }
else navBtns[0]?.classList.add('active');

function copyCode(btn){
  const code=btn.closest('.codebox').querySelector('code').innerText;
  navigator.clipboard.writeText(code);
  btn.innerText='Copied!';
  setTimeout(()=>btn.innerText='Copy',1000);
}
function loadTry(sql){ goTo('sql-playground'); document.getElementById('sqlInput').value=sql; }
function copyPlayground(){ navigator.clipboard.writeText(document.getElementById('sqlInput').value); }
function clearPlayground(){ document.getElementById('sqlInput').value=''; document.getElementById('sqlOutput').innerHTML=''; }
function runDemoSQL(){
  const q=document.getElementById('sqlInput').value.trim().toLowerCase();
  let msg='';
  if(q.includes('show tables')) msg='<b>Demo Result:</b><br>users, students, student_categories, requirement_types, category_requirements, student_requirements, documents, activity_log, print_logs, password_reset_tokens, archived_students';
  else if(q.includes('describe students')) msg='<b>Demo Result:</b><br>student_id, user_id, student_name, last_name, first_name, middle_name, birth_date, email, category_id, remarks, phone';
  else if(q.includes('count(*)')) msg='<b>Demo Result:</b><br>This query counts matching records. In the real database, MySQL will return the actual total.';
  else if(q.includes('join')) msg='<b>Demo Result:</b><br>This query combines related ADAMS tables using keys. Explain the table source, connection key, and expected output.';
  else if(q.includes('create database')) msg='<b>Demo Result:</b><br>This creates a database if you have admin privileges. ADAMS database name: doc_admission_db.';
  else if(q.includes('select')) msg='<b>Demo Result:</b><br>This retrieves records from the selected ADAMS table. Use WHERE to filter and ORDER BY to sort.';
  else if(q.includes('update') || q.includes('delete')) msg='<b>Safety Reminder:</b><br>Always run SELECT with the same WHERE condition before UPDATE or DELETE.';
  else msg='<b>Practice Note:</b><br>Copy this SQL into MySQL Workbench connected to doc_admission_db to run it on the real ADAMS database.';
  document.getElementById('sqlOutput').innerHTML=msg;
}

document.getElementById('globalSearch').addEventListener('input', function(){
  const term=this.value.trim().toLowerCase();
  document.querySelectorAll('mark').forEach(m=>m.replaceWith(document.createTextNode(m.textContent)));
  if(!term) return;
  let first=null;
  pages.forEach(p=>{
    const found=p.innerText.toLowerCase().includes(term);
    if(found && !first) first=p.id;
  });
  if(first) goTo(first);
});

function toggleDark(){ document.body.classList.toggle('dark'); }

const quiz=[["What is the main focus of ADAMS?", ["Inventory management", "Admission documents and applicant/student records", "Payroll records"], 1], ["Which table maps category to requirement types?", ["category_requirements", "activity_log", "password_reset_tokens"], 0], ["What does 1NF mainly fix?", ["Repeating groups and non-atomic values", "User permissions", "Printing history"], 0], ["What does 2NF mainly separate?", ["Core data by purpose", "Passwords only", "System colors"], 0], ["What does 3NF mainly separate?", ["Indirect/supporting data", "Student name format", "Browser layout"], 0], ["Final login users are:", ["Superadmin and Staff", "Students only", "Parents and Applicants"], 0], ["What command checks table structure?", ["SHOW TABLES;", "DESCRIBE table_name;", "COUNT(*)"], 1], ["What is cardinality?", ["How many records are connected", "A password rule", "A CSS style"], 0], ["What is an ERD?", ["Database map", "SQL password", "Database backup only"], 0], ["Why use foreign key?", ["To connect related tables and maintain consistency", "To delete all data", "To print reports only"], 0]];
function renderQuiz(){
  const box=document.getElementById('quizBox'); if(!box) return;
  box.innerHTML=quiz.map((q,i)=>`<div class="quizItem"><b>${i+1}. ${q[0]}</b>${q[1].map((a,j)=>`<label><input type="radio" name="q${i}" value="${j}"> ${a}</label>`).join('')}</div>`).join('');
}
function checkQuiz(){
  let score=0;
  quiz.forEach((q,i)=>{ const ans=document.querySelector(`input[name=q${i}]:checked`); if(ans && Number(ans.value)===q[2]) score++; });
  document.getElementById('quizResult').innerHTML=`Score: ${score} / ${quiz.length} ${score===quiz.length?'🎉 Perfect!':'Keep practicing!'}`;
}
function resetQuiz(){ renderQuiz(); document.getElementById('quizResult').innerHTML=''; }
renderQuiz();


/* ===== ADAMS IMPROVED WORKING MODULES: database explorer, SQL test lab, activities, normalization simulator ===== */
const adamsSchema = {
  users:{pk:'user_id', purpose:'Stores authorized Superadmin and Staff accounts.', fields:['user_id','username','password','email','full_name','phone','is_active','created_at','last_login','role'], fks:[]},
  student_categories:{pk:'category_id', purpose:'Stores reusable student classifications.', fields:['category_id','category_name','sort_order'], fks:[]},
  students:{pk:'student_id', purpose:'Stores applicant/student profile information.', fields:['student_id','user_id','student_name','last_name','first_name','middle_name','birth_date','email','category_id','remarks','phone'], fks:['category_id → student_categories.category_id','user_id → users.user_id']},
  requirement_types:{pk:'requirement_id', purpose:'Stores master list of admission document requirements.', fields:['requirement_id','requirement_name','description'], fks:[]},
  category_requirements:{pk:'category_id + requirement_id', purpose:'Bridge table for category-based requirement checklists.', fields:['category_id','requirement_id'], fks:['category_id → student_categories.category_id','requirement_id → requirement_types.requirement_id']},
  student_requirements:{pk:'student_requirement_id', purpose:'Tracks requirement status and uploaded files per student.', fields:['student_requirement_id','student_id','requirement_id','file_name','file_path','mime_type','file_size','uploaded_by','status','upload_date','uploaded_at'], fks:['student_id → students.student_id','requirement_id → requirement_types.requirement_id','uploaded_by → users.user_id']},
  documents:{pk:'document_id', purpose:'Stores document records attached to student profiles.', fields:['document_id','student_id','document_type','file_path','tracking_number','status','date_submitted','remarks','student_pk'], fks:['student_pk → students.student_id']},
  activity_log:{pk:'log_id', purpose:'Records major user actions for accountability.', fields:['log_id','user_id','username','action','module','description','log_time'], fks:['user_id → users.user_id']},
  print_logs:{pk:'log_id', purpose:'Records printed reports and reference numbers.', fields:['log_id','ref_no','student_id','document_type','printed_by','printed_by_name','printed_at','campus_code'], fks:['student_id → students.student_id','printed_by → users.user_id']},
  password_reset_tokens:{pk:'id', purpose:'Stores password recovery tokens and expiry.', fields:['id','user_id','token','expires_at','used','created_at'], fks:['user_id → users.user_id']},
  archived_students:{pk:'archive_id', purpose:'Stores historical snapshots of archived student records.', fields:['archive_id','student_id','student_name','last_name','first_name','middle_name','email','phone','birth_date','category_id','remarks','archived_at','archived_by'], fks:['student_id → students.student_id','archived_by → users.user_id']}
};
const adamsDB = {
  users:[
    {user_id:1, username:'superadmin', full_name:'System Superadmin', role:'superadmin', is_active:1},
    {user_id:5, username:'staff1', full_name:'Registrar Staff', role:'staff', is_active:1}
  ],
  student_categories:[
    {category_id:1, category_name:'Freshman', sort_order:1},
    {category_id:2, category_name:'Transferee', sort_order:2},
    {category_id:3, category_name:'Returning', sort_order:3}
  ],
  students:[
    {student_id:1, student_name:'Juana Santita', last_name:'Santita', first_name:'Juana', email:'sample@email.edu', category_id:1, phone:'09171234567'},
    {student_id:2, student_name:'Mark Santos', last_name:'Santos', first_name:'Mark', email:'mark@email.edu', category_id:2, phone:'09170000000'},
    {student_id:3, student_name:'Ana Reyes', last_name:'Reyes', first_name:'Ana', email:'ana@email.edu', category_id:1, phone:'09171111111'}
  ],
  requirement_types:[
    {requirement_id:1, requirement_name:'Birth Certificate', description:'Proof of birth'},
    {requirement_id:2, requirement_name:'Valid ID', description:'Identity document'},
    {requirement_id:3, requirement_name:'Transcript of Records', description:'Academic record'},
    {requirement_id:4, requirement_name:'Good Moral', description:'Character reference'}
  ],
  category_requirements:[
    {category_id:1, requirement_id:1},{category_id:1, requirement_id:2},
    {category_id:2, requirement_id:2},{category_id:2, requirement_id:3},{category_id:2, requirement_id:4},
    {category_id:3, requirement_id:1},{category_id:3, requirement_id:3}
  ],
  student_requirements:[
    {student_requirement_id:1, student_id:'1', requirement_id:1, file_name:'birth.pdf', status:'SUBMITTED', uploaded_by:5, uploaded_at:'2026-06-20'},
    {student_requirement_id:2, student_id:'1', requirement_id:2, file_name:null, status:'PENDING', uploaded_by:5, uploaded_at:null},
    {student_requirement_id:3, student_id:'2', requirement_id:3, file_name:null, status:'PENDING', uploaded_by:5, uploaded_at:null},
    {student_requirement_id:4, student_id:'2', requirement_id:4, file_name:'goodmoral.pdf', status:'SUBMITTED', uploaded_by:5, uploaded_at:'2026-06-20'}
  ],
  documents:[
    {document_id:1, student_pk:1, document_type:'STUDENT_REPORT', status:'PRINTED', tracking_number:'MN0-001', date_submitted:'2026-06-20'},
    {document_id:2, student_pk:2, document_type:'ADMISSION_FILE', status:'PENDING', tracking_number:'MN0-002', date_submitted:'2026-06-21'}
  ],
  activity_log:[{log_id:1, user_id:5, username:'staff1', action:'UPLOAD', module:'Uploads', description:'Uploaded requirement file', log_time:'2026-06-20 10:00:00'}],
  print_logs:[{log_id:1, ref_no:'MN0-001', student_id:1, document_type:'STUDENT_REPORT', printed_by:5, printed_by_name:'Registrar Staff', printed_at:'2026-06-20 11:00:00', campus_code:'MN0'}],
  password_reset_tokens:[], archived_students:[]
};
function escapeHtml(v){return String(v===null||v===undefined?'':v).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function tableHtml(rows){
  if(!rows || !rows.length) return '<div class="help">No rows returned.</div>';
  const cols=[...new Set(rows.flatMap(r=>Object.keys(r)))];
  return '<div class="sqlResultTable"><table><thead><tr>'+cols.map(c=>`<th>${escapeHtml(c)}</th>`).join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+cols.map(c=>`<td>${escapeHtml(r[c])}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>';
}
function renderDatabaseExplorer(){
  const box=document.getElementById('dbExplorer'); if(!box) return;
  box.innerHTML=Object.entries(adamsSchema).map(([name,s])=>`<div class="dbTableCard"><h3>${name}</h3><p>${s.purpose}</p><p><span class="badge">PK</span> <code>${s.pk}</code></p><p><b>Fields:</b><br>${s.fields.map(f=>`<code>${f}</code>`).join('')}</p>${s.fks.length?`<p><b>Foreign Keys:</b><br>${s.fks.map(f=>`<span class="badge">FK</span> ${f}`).join('<br>')}</p>`:''}</div>`).join('');
}
function loadSqlLab(sql){ goTo('sql-test-lab'); document.getElementById('sqlLabInput').value=sql; runAdamsSQLLab(); }
function copySqlLab(){ navigator.clipboard.writeText(document.getElementById('sqlLabInput').value); }
function runAdamsSQLLab(){
  const input=document.getElementById('sqlLabInput'); const out=document.getElementById('sqlLabOutput'); if(!input||!out) return;
  const sql=input.value.trim(); const q=sql.toLowerCase().replace(/\s+/g,' ');
  try{
    if(q==='show tables;'||q==='show tables'){
      out.innerHTML='<b>Tables in doc_admission_db:</b>'+tableHtml(Object.keys(adamsSchema).map(t=>({'Tables_in_doc_admission_db':t})));
    } else if(q.startsWith('describe ')){
      const t=q.replace('describe ','').replace(';','').trim();
      const s=adamsSchema[t]; out.innerHTML=s?`<b>Structure of ${t}</b>`+tableHtml(s.fields.map(f=>({Field:f, Key:f===s.pk?'PK':(s.fks.join(' ').includes(f)?'FK':''), Description:f}))) : '<b>Unknown table.</b> Try SHOW TABLES;';
    } else if(q.includes('count(*)') && q.includes('from students')){
      out.innerHTML=tableHtml([{total_students:adamsDB.students.length}]);
    } else if(q.includes('from students s') && q.includes('student_categories')){
      const rows=adamsDB.students.map(s=>({student_id:s.student_id, student_name:s.student_name, category_name:(adamsDB.student_categories.find(c=>c.category_id===s.category_id)||{}).category_name||''}));
      out.innerHTML='<b>JOIN result:</b>'+tableHtml(rows);
    } else if(q.includes('from category_requirements') && q.includes('requirement_types')){
      const rows=adamsDB.category_requirements.map(cr=>({category_name:(adamsDB.student_categories.find(c=>c.category_id===cr.category_id)||{}).category_name, requirement_name:(adamsDB.requirement_types.find(r=>r.requirement_id===cr.requirement_id)||{}).requirement_name}));
      out.innerHTML='<b>Requirements per category:</b>'+tableHtml(rows);
    } else if(q.includes('from student_requirements')){
      out.innerHTML=tableHtml(adamsDB.student_requirements);
    } else if(q.includes('from students')){
      out.innerHTML=tableHtml(adamsDB.students);
    } else if(q.includes('from users')){
      out.innerHTML=tableHtml(adamsDB.users);
    } else {
      out.innerHTML='<b>Practice note:</b> This simulator supports SHOW TABLES, DESCRIBE table_name, SELECT from students/users/student_requirements, COUNT students, and the prepared JOIN examples. For full SQL execution, use MySQL Workbench.';
    }
  }catch(e){ out.innerHTML='<b>Error:</b> '+escapeHtml(e.message); }
}
function runDemoSQL(){
  const q=document.getElementById('sqlInput').value.trim();
  const oldLab=document.getElementById('sqlLabInput'); const oldOut=document.getElementById('sqlLabOutput');
  if(oldLab && oldOut){ oldLab.value=q; runAdamsSQLLab(); document.getElementById('sqlOutput').innerHTML=oldOut.innerHTML; }
}
const sqlChallengesData=[
  {q:'Check the structure of the students table.', expected:'DESCRIBE students;', hint:'Use DESCRIBE table_name;'},
  {q:'Show all records from students.', expected:'SELECT * FROM students;', hint:'Use SELECT * FROM table;'},
  {q:'Count all student records.', expected:'SELECT COUNT(*) AS total_students FROM students;', hint:'Use COUNT(*).'},
  {q:'Show all tables in the selected database.', expected:'SHOW TABLES;', hint:'Use SHOW TABLES;'}
];
function normalizeSql(s){return s.toLowerCase().replace(/`/g,'').replace(/\s+/g,' ').replace(/\s*;\s*$/,'').trim();}
function renderSqlChallenges(){
  const box=document.getElementById('sqlChallenges'); if(!box) return;
  box.innerHTML=sqlChallengesData.map((c,i)=>`<div class="challenge"><b>${i+1}. ${c.q}</b><textarea id="sqlChallenge${i}" style="min-height:70px;margin-top:8px" placeholder="Type SQL here"></textarea><div class="playBtns"><button onclick="checkSqlChallenge(${i})">Check Answer</button><button class="secondary" onclick="document.getElementById('sqlChallenge${i}').value='${c.expected.replace(/'/g,"\\'")}'">Show Expected SQL</button></div><div id="sqlChallengeResult${i}" class="answerBox" style="display:block;background:#f6f7f8"></div></div>`).join('');
}
function checkSqlChallenge(i){
  const c=sqlChallengesData[i]; const v=document.getElementById('sqlChallenge'+i).value;
  const ok=normalizeSql(v)===normalizeSql(c.expected);
  document.getElementById('sqlChallengeResult'+i).innerHTML=ok?`✅ Correct. <code>${escapeHtml(c.expected)}</code>`:`❌ Not yet. Hint: ${c.hint}<br>Expected: <code>${escapeHtml(c.expected)}</code>`;
}
const normStages=[
  {name:'UNF', html:`<h2>UNF - One Wide Logbook Table</h2><p>Student details, category, Requirement 1, Status 1, File 1, Requirement 2, Status 2, and File 2 are mixed in one row.</p><div class="tablewrap"><table><thead><tr><th>Student</th><th>Category</th><th>Requirement 1</th><th>Status 1</th><th>Requirement 2</th><th>Status 2</th></tr></thead><tbody><tr><td>Reyes, Ana</td><td>Freshman</td><td>Birth Certificate</td><td>SUBMITTED</td><td>Valid ID</td><td>PENDING</td></tr></tbody></table></div><div class="warning"><b>Problem:</b> repeating groups and non-atomic fields.</div>`},
  {name:'1NF', html:`<h2>1NF - One Requirement per Row</h2><p>The repeated requirement columns are converted into separate rows.</p><div class="tablewrap"><table><thead><tr><th>Student</th><th>Category</th><th>Requirement</th><th>Status</th></tr></thead><tbody><tr><td>Reyes, Ana</td><td>Freshman</td><td>Birth Certificate</td><td>SUBMITTED</td></tr><tr><td>Reyes, Ana</td><td>Freshman</td><td>Valid ID</td><td>PENDING</td></tr></tbody></table></div><div class="defense"><b>Rule satisfied:</b> atomic values and no repeating requirement columns.</div>`},
  {name:'2NF', html:`<h2>2NF - Core Tables Separated</h2><p>Student data, category data, requirement master list, category checklist, and actual student requirement status are separated.</p><div class="tablewrap"><table><thead><tr><th>Table</th><th>Purpose</th></tr></thead><tbody><tr><td>students</td><td>Student profile stored once</td></tr><tr><td>student_categories</td><td>Reusable categories</td></tr><tr><td>requirement_types</td><td>Reusable requirement names</td></tr><tr><td>category_requirements</td><td>Bridge table for checklist</td></tr><tr><td>student_requirements</td><td>Actual student requirement status</td></tr></tbody></table></div>`},
  {name:'3NF', html:`<h2>3NF - Support Tables Separated</h2><p>Operational data is separated from main student records.</p><div class="tablewrap"><table><thead><tr><th>Table</th><th>Purpose</th></tr></thead><tbody><tr><td>users</td><td>Login accounts</td></tr><tr><td>activity_log</td><td>Action history</td></tr><tr><td>print_logs</td><td>Printing history</td></tr><tr><td>password_reset_tokens</td><td>Security recovery</td></tr><tr><td>documents</td><td>Document records</td></tr><tr><td>archived_students</td><td>Historical snapshots</td></tr></tbody></table></div><div class="defense"><b>Final defense line:</b> Each table stores one main idea and is connected through keys.</div>`}
];
let normStep=0;
function renderNormStep(){ const c=document.getElementById('simContent'); if(!c)return; c.innerHTML=normStages[normStep].html; for(let i=0;i<4;i++){const d=document.getElementById('simDot'+i); if(d)d.classList.toggle('active',i===normStep);} }
function nextNormStep(){ normStep=Math.min(3,normStep+1); renderNormStep(); }
function prevNormStep(){ normStep=Math.max(0,normStep-1); renderNormStep(); }
function resetNormStep(){ normStep=0; renderNormStep(); }
const activityData=[
  ['DBMS and MySQL Foundations','Explain why ADAMS is a database project.','Because ADAMS depends on tables, keys, relationships, and SQL queries to manage admission records.'],
  ['SQL Command Categories','Identify the command category of CREATE TABLE.','DDL because it defines or changes database structure.'],
  ['Database Objects','Give one primary key in ADAMS.','students.student_id or users.user_id.'],
  ['Business Rules and Cardinality','What is the cardinality of student_categories to students?','1:M. One category can classify many students.'],
  ['ERD / EERD','What shape represents an entity?','Rectangle. Examples: students, users, documents.'],
  ['ERD / EERD','What does ISA triangle mean?','Specialization/generalization, such as USER → SUPERADMIN_USER and STAFF_USER.'],
  ['Normalization','What stage removes Requirement1 and Requirement2 repeating columns?','1NF.'],
  ['Normalization','What table fixes many-to-many category and requirements?','category_requirements bridge table.'],
  ['SQL Safe Checking','What command checks table structure?','DESCRIBE table_name; Example: DESCRIBE students;'],
  ['SQL JOIN','Why use JOIN in ADAMS?','To combine related tables, such as students and student_categories.'],
  ['SQL Safety','What should you do before UPDATE or DELETE?','Run SELECT with the same WHERE condition first.'],
  ['Mock Defense','Are students login users?','No. In final scope, only Superadmin and Staff are login users; students/applicants are records.']
];
function renderActivityCenter(){
  const box=document.getElementById('activityCenter'); if(!box)return;
  box.innerHTML=activityData.map((a,i)=>`<div class="activityCard"><p class="activityMeta">${a[0]}</p><h3>Activity ${i+1}</h3><p>${a[1]}</p><button onclick="this.closest('.activityCard').classList.toggle('showAnswer')">Show / Hide Answer</button><div class="answerBox"><b>Answer:</b> ${a[2]}</div></div>`).join('');
}
renderDatabaseExplorer(); renderSqlChallenges(); renderNormStep(); renderActivityCenter();

