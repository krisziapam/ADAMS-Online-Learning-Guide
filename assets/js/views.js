/* View layer: creates reusable HTML sections. */
const DATA = window.ADAMS_DATA;

const DOCS = [
  ['50 Q&A Reviewer', 'assets/docs/ADAMS_50_QA_BEGINNER_DEFENSE_REVIEWER_FINAL.pdf'],
  ['SQL Practice Reviewer', 'assets/docs/ADAMS_SQL_BEGINNER_PRACTICE_REVIEWER_FINAL.pdf'],
  ['Normalization Guide', 'assets/docs/ADAMS_Normalization_Hierarchy_Review_Guide.pdf'],
  ['Final Project Documentation', 'assets/docs/ADAMS_Final_Project_Documentation_FINAL_SUBMISSION_LOCKED.pdf']
];

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, match => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[match]));
}

function rowsToTable(rows) {
  if (!rows || !rows.length) return '<p class="muted">No sample rows.</p>';
  const cols = Object.keys(rows[0]);
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${cols.map(col => `<th>${esc(col)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(row => `<tr>${cols.map(col => `<td>${esc(row[col])}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`;
}

function code(text) {
  return `<pre><code>${esc(text)}</code></pre>`;
}

function sourceList() {
  return DOCS.map(([title, url]) => `
    <a class="card" href="${url}" target="_blank" rel="noopener">
      <b>${esc(title)}</b>
      <small>Open original uploaded PDF</small>
    </a>`).join('');
}

function entity(id, x, y, w, h, title, sub) {
  return `<g class="entity clickable" data-table="${id}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>
    <text x="${x + w / 2}" y="${y + 32}" font-weight="700">${title}</text>
    <text x="${x + w / 2}" y="${y + 58}">${sub}</text>
  </g>`;
}

function line(x1, y1, x2, y2, label) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return `<line class="rel" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#arrow)"/>
  <text x="${mx + 6}" y="${my - 6}" font-weight="700">${label}</text>`;
}

function erdSvg() {
  return `
    <div class="diagram">
      <svg viewBox="0 0 1040 620" role="img" aria-label="ADAMS ERD interactive diagram">
        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto"><path d="M0,0 L10,3 L0,6 Z" fill="#334155"></path></marker></defs>
        ${entity('users', 40, 250, 170, 85, 'users', 'PK user_id')}
        ${entity('password_reset_tokens', 40, 85, 210, 85, 'password_reset_tokens', 'FK user_id')}
        ${entity('activity_log', 40, 425, 170, 85, 'activity_log', 'FK user_id')}
        ${entity('student_categories', 330, 65, 210, 85, 'student_categories', 'PK category_id')}
        ${entity('students', 335, 250, 185, 95, 'students', 'PK student_id / FK category_id')}
        ${entity('category_requirements', 620, 65, 250, 85, 'category_requirements', 'PK category_id + requirement_id')}
        ${entity('student_requirements', 620, 250, 250, 95, 'student_requirements', 'FK student_id / requirement_id')}
        ${entity('requirement_types', 760, 425, 210, 85, 'requirement_types', 'PK requirement_id')}
        ${entity('documents', 335, 425, 185, 85, 'documents', 'FK student_pk')}
        ${entity('print_logs', 560, 425, 170, 85, 'print_logs', 'FK student_id / printed_by')}
        ${entity('archived_students', 330, 535, 220, 70, 'archived_students', 'archive snapshot')}
        ${line(125, 250, 125, 170, '1:M')}${line(125, 335, 125, 425, '1:M')}${line(210, 292, 335, 292, '1:M')}
        ${line(435, 150, 435, 250, '1:M')}${line(540, 108, 620, 108, '1:M')}${line(745, 150, 745, 250, '1:M')}
        ${line(520, 300, 620, 300, '1:M')}${line(745, 345, 830, 425, 'M:1')}${line(520, 293, 620, 293, '1:M')}
        ${line(430, 345, 430, 425, '1:M')}${line(520, 468, 560, 468, '1:M')}${line(435, 345, 435, 535, 'archive')}
      </svg>
    </div>
    <div id="diagramInfo" class="info-panel">Click any table in the ERD to view its PK, FK, purpose, and columns.</div>`;
}

function eerdSvg() {
  return `
    <div class="diagram">
      <svg viewBox="0 0 940 430" role="img" aria-label="ADAMS EERD interactive diagram">
        ${entity('users', 80, 70, 170, 80, 'USER', 'role field')}
        <polygon class="diamond" points="165,185 205,225 165,265 125,225"></polygon><text x="165" y="231" text-anchor="middle" font-weight="700">ISA</text>
        ${entity('superadmin_user', 20, 320, 210, 75, 'SUPERADMIN_USER', 'manages system-wide setup')}
        ${entity('staff_user', 285, 320, 170, 75, 'STAFF_USER', 'routine operations')}
        <line class="rel" x1="165" y1="150" x2="165" y2="185"/><line class="rel" x1="145" y1="245" x2="125" y2="320"/><line class="rel" x1="185" y1="245" x2="360" y2="320"/>
        ${entity('students', 600, 70, 190, 80, 'STUDENT', 'classified by category')}
        <polygon class="diamond" points="695,185 735,225 695,265 655,225"></polygon><text x="695" y="231" text-anchor="middle" font-weight="700">classified as</text>
        ${entity('student_categories', 570, 320, 250, 75, 'STUDENT CATEGORY', 'Freshman, Transferee, Returning')}
        <line class="rel" x1="695" y1="150" x2="695" y2="185"/><line class="rel" x1="695" y1="265" x2="695" y2="320"/><text x="715" y="175" font-weight="700">M:1</text>
      </svg>
    </div>`;
}

function qaRange(start, end) {
  const items = DATA.qa.filter(item => item.num >= start && item.num <= end);
  return `<h1>Q&A Reviewer ${start}-${end}</h1>${items.map(item => `
    <div class="activity-card">
      <h3>Q${item.num}. ${esc(item.q)}</h3>
      <p><b>Answer:</b> ${esc(item.answer)}</p>
      ${item.defense ? `<p><b>Defense line:</b> ${esc(item.defense)}</p>` : ''}
      ${item.memory ? `<p class="muted"><b>Must remember:</b> ${esc(item.memory)}</p>` : ''}
    </div>`).join('')}`;
}

function reviewerShell(type, title, lead) {
  return `
    <h1>${esc(title)}</h1>
    <p class="lead">${esc(lead)}</p>
    <div class="reviewer-shell" data-reviewer="${esc(type)}"></div>`;
}

const SECTIONS = [
  {
    id: 'home',
    kind: 'START HERE',
    title: 'ADAMS Online Learning Guide',
    render: () => `
      <h1>ADAMS Online Learning Guide</h1>
      <p class="lead">A GitHub-ready reviewer website for ADAMS with lessons, search, SQL TryIt, ERD/EERD, activities, flashcards, and mock defense.</p>
      <div class="grid">
        <a class="card" href="#search"><b>Search Reviewer</b><small>Search any keyword from panel questions.</small></a>
        <a class="card" href="#sql-playground"><b>SQL TryIt Editor</b><small>Practice commands safely using sample tables.</small></a>
        <a class="card" href="#erd"><b>Interactive ERD/EERD</b><small>Click tables, view PK/FK and cardinality.</small></a>
        <a class="card" href="#activity-center"><b>ADAMS Reviewer Center</b><small>Panel Q&A, SQL codes, normalization, flashcards, and mock defense.</small></a>
      </div>
      <h2>How to use this site</h2>
      <ol>
        <li>Read the lessons in order.</li>
        <li>Use SQL TryIt to test commands like <code>SHOW TABLES;</code> and <code>DESCRIBE students;</code>.</li>
        <li>Use Search Reviewer when you hear a keyword from the panel.</li>
        <li>Open ADAMS Reviewer Center for last-minute practice.</li>
      </ol>
      <div class="note"><b>Important defense line:</b> Final ADAMS login roles are Superadmin and Staff only. Students/applicants are treated as admission records, not final login roles.</div>`
  },
  {
    id: 'quick-start',
    kind: 'BEGINNER',
    title: 'Quick Start',
    render: () => `
      <h1>Quick Start</h1>
      <p>ADAMS means <b>Admission Document and Applicant Management System</b>. It is a database-driven prototype for managing admission documents and applicant/student records.</p>
      <div class="table-wrap"><table>
        <tr><th>Item</th><th>Answer</th></tr>
        <tr><td>Target client</td><td>PUP Open University System Registrar's Office</td></tr>
        <tr><td>Final login users</td><td>Superadmin and Staff only</td></tr>
        <tr><td>Students/applicants</td><td>Admission records, not login users</td></tr>
        <tr><td>Database</td><td>doc_admission_db</td></tr>
        <tr><td>DBMS</td><td>MySQL / MariaDB</td></tr>
      </table></div>
      <div class="activity-card"><h3>Mini Check</h3><p>Are students final login users?</p><button class="show-answer">Show answer</button><p class="answer">No. The final system users are Superadmin and Staff only.</p></div>`
  },
  {
    id: 'dbms',
    kind: 'LESSON',
    title: 'DBMS and MySQL Foundations',
    render: () => `
      <h1>DBMS and MySQL Foundations</h1>
      <div class="table-wrap"><table>
        <tr><th>Concept</th><th>Simple Meaning</th><th>ADAMS Example</th></tr>
        <tr><td>Database</td><td>Organized collection of related data.</td><td>Students, requirements, users, logs, archives.</td></tr>
        <tr><td>DBMS</td><td>Software that manages a database.</td><td>MySQL/MariaDB manages ADAMS.</td></tr>
        <tr><td>RDBMS</td><td>Stores data in related tables.</td><td>students connects to student_categories.</td></tr>
        <tr><td>SQL</td><td>Language of the database.</td><td>SELECT, INSERT, UPDATE, DELETE, JOIN.</td></tr>
      </table></div>
      <div class="note"><b>Defense formula:</b> Definition + ADAMS example.</div>`
  },
  {
    id: 'sql-categories',
    kind: 'LESSON',
    title: 'SQL Command Categories and Database Objects',
    render: () => `
      <h1>SQL Command Categories and Database Objects</h1>
      <div class="grid">
        <div class="card"><b>DDL</b><p>Data Definition Language changes structure.</p>${code('CREATE TABLE students (...);\nALTER TABLE users ADD COLUMN phone VARCHAR(20);')}</div>
        <div class="card"><b>DML</b><p>Data Manipulation Language changes records.</p>${code('INSERT INTO users (...) VALUES (...);\nUPDATE users SET is_active = 0 WHERE username = \'staff1\';')}</div>
        <div class="card"><b>DQL</b><p>Data Query Language retrieves records.</p>${code('SELECT * FROM students;')}</div>
      </div>
      <h2>Objects to remember</h2>
      <ul>
        <li><b>Table:</b> container of related records.</li>
        <li><b>Column:</b> type of information.</li>
        <li><b>Row:</b> one complete record.</li>
        <li><b>Primary key:</b> unique identifier.</li>
        <li><b>Foreign key:</b> connection key.</li>
      </ul>`
  },
  {
    id: 'business-rules',
    kind: 'LESSON',
    title: 'Business Rules, Relationships, and Cardinality',
    render: () => `
      <h1>Business Rules, Relationships, and Cardinality</h1>
      <div class="table-wrap"><table>
        <tr><th>ADAMS Business Rule</th><th>Cardinality</th></tr>
        <tr><td>One student category can classify many students.</td><td>1:M</td></tr>
        <tr><td>One category may require many requirement types.</td><td>1:M through category_requirements</td></tr>
        <tr><td>One requirement type may be required by many categories.</td><td>M:N resolved by bridge table</td></tr>
        <tr><td>One student may have many requirement records.</td><td>1:M</td></tr>
        <tr><td>One user may create many activity logs.</td><td>1:M</td></tr>
      </table></div>
      <div class="activity-card" data-cardinality></div>`
  },
  {
    id: 'erd-symbols',
    kind: 'VISUAL LESSON',
    title: 'ERD Shapes, Symbols, and Cardinality Symbols',
    render: () => `
      <h1>ERD Shapes, Symbols, and Cardinality Symbols</h1>
      <div class="table-wrap"><table>
        <tr><th>Symbol</th><th>Meaning</th><th>ADAMS Example</th></tr>
        <tr><td>Rectangle</td><td>Entity/Table</td><td>students, users, documents</td></tr>
        <tr><td>Oval</td><td>Attribute/Field</td><td>student_id, email, role</td></tr>
        <tr><td>Underlined Oval</td><td>Primary Key</td><td>student_id</td></tr>
        <tr><td>Diamond</td><td>Relationship</td><td>classifies, has, uploads</td></tr>
        <tr><td>1:M</td><td>One-to-many</td><td>student_categories to students</td></tr>
        <tr><td>M:N</td><td>Many-to-many</td><td>student_categories and requirement_types</td></tr>
        <tr><td>Bridge Table</td><td>Connector for M:N</td><td>category_requirements</td></tr>
      </table></div>
      <div class="note"><b>Must remember:</b> ERD = database map. EERD = enhanced map with specialization/generalization.</div>`
  },
  {
    id: 'normalization',
    kind: 'CORE LESSON',
    title: 'Normalization: UNF to 1NF to 2NF to 3NF',
    render: () => `
      <h1>Normalization: UNF → 1NF → 2NF → 3NF</h1>
      <div class="note"><b>Main point:</b> Normalization transforms one wide, repetitive table into clean related tables.</div>
      <div class="table-wrap"><table>
        <tr><th>Stage</th><th>What It Checks</th><th>ADAMS Explanation</th></tr>
        <tr><td>UNF</td><td>Raw/problem state</td><td>One row may contain Requirement1, Status1, File1, Requirement2, Status2, File2.</td></tr>
        <tr><td>1NF</td><td>Atomic values and no repeating groups</td><td>Each requirement becomes a separate row.</td></tr>
        <tr><td>2NF</td><td>Separate core data by purpose</td><td>students, student_categories, requirement_types, category_requirements, student_requirements.</td></tr>
        <tr><td>3NF</td><td>Separate indirect/supporting data</td><td>users, activity_log, print_logs, password_reset_tokens, documents, archived_students.</td></tr>
      </table></div>
      <div class="activity-card" data-normalization></div>`
  },
  {
    id: 'normalization-defense',
    kind: 'DEFENSE',
    title: 'Normalization Defense Questions',
    render: () => `
      <h1>Normalization Defense Questions</h1>
      <div class="table-wrap"><table>
        <tr><th>Question</th><th>Direct Answer</th></tr>
        <tr><td>What changed from UNF to 1NF?</td><td>The repeated columns were removed. Each requirement became a separate row.</td></tr>
        <tr><td>Why was 2NF needed after 1NF?</td><td>Student, category, and requirement names were still repeated, so they were separated.</td></tr>
        <tr><td>Why do you need category_requirements?</td><td>Different categories may require different documents. It maps requirements to categories.</td></tr>
        <tr><td>Why was 3NF needed?</td><td>Logs, print history, reset tokens, documents, and archive records are separate operational concerns.</td></tr>
      </table></div>
      <div class="warning"><b>One-line answer:</b> 1NF fixes row/column format, 2NF fixes repeated core data, and 3NF fixes indirect/supporting data.</div>`
  },
  { id: 'qa-normalization', kind: 'Q&A', title: 'Normalization and Data Anomalies Q&A', render: () => qaRange(31, 40) },
  { id: 'qa-erd-sql', kind: 'Q&A', title: 'ERD, EERD, SQL Checking, SQL vs NoSQL Q&A', render: () => qaRange(41, 50) },
  {
    id: 'table-guide',
    kind: 'REFERENCE',
    title: 'ADAMS System Information and Table Guide',
    render: () => `<h1>ADAMS System Information and Table Guide</h1><p>This guide is based on the ADAMS operational tables and their documented attributes.</p><div id="tableExplorer"></div>`
  },
  {
    id: 'sql-basic',
    kind: 'SQL',
    title: 'SQL Basics and Safe Checking',
    render: () => `<h1>SQL Basics and Safe Checking</h1>${code('USE doc_admission_db;\nSHOW TABLES;\nDESCRIBE students;\nSELECT * FROM students;')}<div class="warning"><b>Safety rule:</b> Before UPDATE or DELETE, run SELECT with the same WHERE condition first.</div>`
  },
  {
    id: 'sql-count',
    kind: 'SQL',
    title: 'SQL COUNT, GROUP BY, and HAVING',
    render: () => `<h1>SQL COUNT, GROUP BY, and HAVING</h1>${code('SELECT COUNT(*) AS total_students\nFROM students;\n\nSELECT role, COUNT(*) AS total_users\nFROM users\nWHERE role IN (\'superadmin\',\'staff\')\nGROUP BY role;\n\nSELECT username, COUNT(*) AS total\nFROM users\nGROUP BY username\nHAVING COUNT(*) > 1;')}`
  },
  {
    id: 'sql-join',
    kind: 'SQL',
    title: 'SQL JOIN Lessons',
    render: () => `<h1>SQL JOIN Lessons</h1><p>JOIN combines related tables using keys.</p>${code('SELECT s.student_id, s.student_name, s.email, c.category_name\nFROM students s\nLEFT JOIN student_categories c\n ON c.category_id = s.category_id\nORDER BY s.student_name;\n\nSELECT c.category_name, r.requirement_name, r.description\nFROM category_requirements cr\nJOIN student_categories c ON c.category_id = cr.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nORDER BY c.category_name, r.requirement_name;')}`
  },
  {
    id: 'sql-idu',
    kind: 'SQL',
    title: 'SQL INSERT, UPDATE, DELETE, CREATE, ALTER',
    render: () => `<h1>SQL INSERT, UPDATE, DELETE, CREATE, ALTER</h1>${code("INSERT INTO users (username, password, email, full_name, phone, role, is_active)\nVALUES ('staff1', 'staff123', 'staff1@example.com', 'Staff One', '', 'staff', 1);\n\nUPDATE users\nSET email = 'newemail@example.com'\nWHERE username = 'staff1';\n\nDELETE FROM users\nWHERE username = 'staff1';\n\nCREATE TABLE sample_users (\n user_id INT AUTO_INCREMENT PRIMARY KEY,\n username VARCHAR(50) NOT NULL\n);\n\nALTER TABLE sample_users ADD COLUMN phone VARCHAR(20);")}`
  },
  {
    id: 'sql-advanced',
    kind: 'SQL',
    title: 'Advanced ADAMS SQL',
    render: () => `<h1>Advanced ADAMS SQL</h1><h2>Missing or Pending Requirements</h2>${code("SELECT s.student_id, s.student_name, c.category_name, r.requirement_name,\n COALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\n ON sr.student_id = CAST(s.student_id AS CHAR)\n AND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL\n OR sr.status IS NULL\n OR sr.status IN ('PENDING','INSUFFICIENT','REJECTED')\nORDER BY s.student_name, r.requirement_name;")}<h2>Completion Summary</h2>${code("SELECT s.student_id, s.student_name, c.category_name,\n COUNT(cr.requirement_id) AS required_count,\n COUNT(sr.student_requirement_id) AS recorded_count,\n SUM(CASE WHEN sr.file_name IS NOT NULL THEN 1 ELSE 0 END) AS uploaded_count,\n SUM(CASE WHEN sr.status IN ('SUBMITTED','VERIFIED','APPROVED') THEN 1 ELSE 0 END) AS completed_count,\n COUNT(cr.requirement_id) - COUNT(sr.student_requirement_id) AS missing_count\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nLEFT JOIN student_requirements sr\n ON sr.student_id = CAST(s.student_id AS CHAR)\n AND sr.requirement_id = cr.requirement_id\nGROUP BY s.student_id, s.student_name, c.category_name\nORDER BY missing_count DESC, s.student_name;")}`
  },
  {
    id: 'sql-playground',
    kind: 'INTERACTIVE',
    title: 'SQL Playground',
    render: () => `<h1>SQL TryIt Editor</h1><p class="lead">Safe offline SQL simulator using ADAMS sample tables. It does not connect to your real MySQL database.</p><div class="lesson-two"><div class="sql-editor"><h2>SQL Editor</h2><textarea id="sqlInput">DESCRIBE students;</textarea><div class="btn-row"><button id="runSql">Run SQL</button><button id="copySql">Copy</button><button id="clearSql" class="secondary">Clear</button></div><h3>Examples</h3><div id="sqlExamples"></div></div><div><h2>Result</h2><div id="sqlOutput" class="result-box"></div></div></div>`
  },
  { id: 'oral-short', kind: 'REVIEW', title: 'Possible Oral/Exam Questions and Short Answers', render: () => qaRange(1, 30) },
  {
    id: 'activity-center',
    kind: 'ACTIVITIES',
    title: 'ADAMS Reviewer Center',
    render: () => `
      <h1>ADAMS Reviewer Center</h1>
      <p class="lead">Practice the panel Q&A, SQL codes, normalization, and mixed defense topics in one place.</p>
      <div class="grid">
        <a class="card" href="#panel-reviewer"><b>Panel Q&A Reviewer</b><small>Multiple choice practice using the possible panel questions.</small></a>
        <a class="card" href="#sql-reviewer"><b>SQL Code Reviewer</b><small>Practice SQL commands, query purpose, and syntax recognition.</small></a>
        <a class="card" href="#normalization-reviewer"><b>Normalization Reviewer</b><small>Review UNF, 1NF, 2NF, 3NF, and data anomalies.</small></a>
        <a class="card" href="#mixed-reviewer"><b>Mixed Review Quiz</b><small>Random practice from Q&A, SQL, and normalization.</small></a>
        <a class="card" href="#flashcards"><b>Flashcards</b><small>Flip cards for fast recall.</small></a>
        <a class="card" href="#mock-defense"><b>Mock Defense</b><small>Random oral defense questions.</small></a>
      </div>`
  },
  {
    id: 'panel-reviewer',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'Panel Q&A Reviewer',
    render: () => reviewerShell('panel', 'Panel Q&A Reviewer', 'Multiple choice practice based on the possible panel defense questions.')
  },
  {
    id: 'sql-reviewer',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'SQL Code Reviewer',
    render: () => reviewerShell('sql', 'SQL Code Reviewer', 'Practice SQL commands, code purpose, query checking, and ADAMS database syntax.')
  },
  {
    id: 'normalization-reviewer',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'Normalization Reviewer',
    render: () => reviewerShell('normalization', 'Normalization Reviewer', 'Practice UNF, 1NF, 2NF, 3NF, redundancy, and data anomalies.')
  },
  {
    id: 'mixed-reviewer',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'Mixed Review Quiz',
    render: () => reviewerShell('mixed', 'Mixed Review Quiz', 'Randomized multiple-choice practice from panel Q&A, SQL codes, and normalization topics.')
  },
  {
    id: 'quiz',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'Quick Review Quiz',
    render: () => reviewerShell('mixed', 'Quick Review Quiz', 'Answer quick mixed reviewer questions. The answer appears immediately after selection.')
  },
  {
    id: 'sql-assessment',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'SQL Short Assessment',
    render: () => `<h1>SQL Short Assessment</h1><p>Type your answer, then click Check.</p><div id="sqlChallenges"></div>`
  },
  {
    id: 'flashcards',
    kind: 'INTERACTIVE',
    title: 'Flashcards',
    render: () => `<h1>Flashcards</h1><p>Click the card to flip. This set includes ADAMS concepts, SQL codes, and normalization terms.</p><div id="flashcard" class="flashcard"></div><div class="reviewer-meta" id="flashMeta"></div><div class="btn-row"><button id="prevCard" class="secondary">Previous</button><button id="flipCard">Flip</button><button id="nextCard">Next</button></div>`
  },
  {
    id: 'mock-defense',
    hiddenNav: true,
    kind: 'ACTIVITIES',
    title: 'Mock Oral Defense',
    render: () => `<h1>Mock Oral Defense</h1><div class="mock-box"><h2 id="mockQ">Press Start to get a random panel question.</h2><button id="startMock">Start / Next Question</button><button id="showMock" class="secondary">Show Answer</button><div id="mockA" class="answer"></div></div>`
  },
  {
    id: 'erd',
    kind: 'ERD / EERD COMPLETE',
    title: 'ERD, EERD, Symbols, Shapes, Cardinalities',
    render: () => `<h1>ERD, EERD, Symbols, Shapes, Cardinalities</h1><p class="lead">Interactive visual guide. Click each table in the ERD.</p><h2>ERD Implementation View</h2>${erdSvg()}<h2>EERD Conceptual View</h2>${eerdSvg()}<div class="note"><b>EERD defense line:</b> USER is specialized into SUPERADMIN_USER and STAFF_USER only. STUDENT is conceptually classified through student_categories.</div>`
  },
  {
    id: 'pdf-source',
    kind: '100% SOURCE',
    title: 'Original PDF Pages Viewer',
    render: () => `<h1>Original PDF Pages Viewer</h1><p>Open the original uploaded PDF reviewers here.</p><div class="pdf-grid">${sourceList()}</div><h2>Full Extracted Text</h2><p class="muted">This section keeps the uploaded reviewer text searchable inside the site.</p><details><summary>50 Q&A Reviewer Text</summary><div class="full-text">${esc(DATA.fullText.qa)}</div></details><details><summary>SQL Reviewer Text</summary><div class="full-text">${esc(DATA.fullText.sql)}</div></details><details><summary>Normalization Guide Text</summary><div class="full-text">${esc(DATA.fullText.normalization)}</div></details><details><summary>Final Documentation Text</summary><div class="full-text">${esc(DATA.fullText.documentation)}</div></details>`
  },
  {
    id: 'zip-source',
    kind: 'ZIP SOURCE',
    title: 'ZIP System and Database Schema',
    render: () => `<h1>ZIP System and Database Schema</h1><p>The uploaded project package contains Java web application files and database files. This learning guide is separate and GitHub Pages-ready.</p><h2>Deployment for this reviewer site</h2>${code('1. Upload all files to a GitHub repository.\n2. Go to Settings > Pages.\n3. Choose Deploy from branch.\n4. Select main branch and /root folder.\n5. Open the GitHub Pages URL.')}`
  },
  {
    id: 'search',
    hiddenNav: true,
    kind: 'SEARCH',
    title: 'Search Everything',
    render: () => `<h1>Search Everything</h1><p class="lead">Search lessons, SQL, ERD/EERD, flashcards, all Q&A, and full uploaded reviewer text.</p><div class="search-page"><input id="searchInput" type="search" placeholder="Example: cardinality, foreign key, 3NF, DESCRIBE, bridge table..."></div><div id="searchResults"></div>`
  }
];

window.ADAMS_VIEWS = { SECTIONS, rowsToTable, esc, code };
