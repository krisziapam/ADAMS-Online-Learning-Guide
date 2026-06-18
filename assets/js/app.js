/* Controller layer: routing, search, SQL simulator, and reviewer activities. */
const { SECTIONS, rowsToTable, esc } = window.ADAMS_VIEWS;
const DATA = window.ADAMS_DATA;

const state = {
  current: 'home',
  cardIndex: 0,
  cardBack: false,
  mock: null,
  reviewers: {}
};

const page = document.getElementById('page');
const nav = document.getElementById('lessonNav');
const sidebar = document.getElementById('sidebar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function id() {
  return location.hash.replace('#', '') || 'home';
}

function strip(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || '';
}

function sectionText(section) {
  try {
    return strip(section.render());
  } catch (error) {
    return '';
  }
}

function buildNav() {
  nav.innerHTML = SECTIONS
    .filter(section => !section.hiddenNav)
    .map(section => `
      <a class="nav-link" href="#${section.id}" data-id="${section.id}">
        <small>${esc(section.kind)}</small>
        <span>${esc(section.title)}</span>
      </a>`)
    .join('');
}

function render() {
  const section = SECTIONS.find(item => item.id === id()) || SECTIONS[0];
  state.current = section.id;
  document.title = `${section.title} | ADAMS Course`;
  page.innerHTML = section.render();

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.id === section.id);
  });

  wirePage();

  const index = SECTIONS.findIndex(item => item.id === section.id);
  prevBtn.disabled = index <= 0;
  nextBtn.disabled = index >= SECTIONS.length - 1;
  prevBtn.onclick = () => { location.hash = SECTIONS[Math.max(0, index - 1)].id; };
  nextBtn.onclick = () => { location.hash = SECTIONS[Math.min(SECTIONS.length - 1, index + 1)].id; };

  window.scrollTo(0, 0);
  sidebar.classList.remove('open');
}

function wirePage() {
  document.querySelectorAll('.show-answer').forEach(button => {
    button.onclick = () => {
      const answer = button.parentElement.querySelector('.answer');
      if (answer) answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    };
  });

  if (document.getElementById('sqlInput')) initSqlPlayground();
  if (document.getElementById('tableExplorer')) initTableExplorer();
  if (document.getElementById('flashcard')) initFlashcards();
  if (document.getElementById('sqlChallenges')) initSqlChallenges();
  if (document.getElementById('startMock')) initMockDefense();
  if (document.querySelector('[data-cardinality]')) initCardinality();
  if (document.querySelector('[data-normalization]')) initNormalization();
  if (document.querySelector('[data-reviewer]')) initReviewer(document.querySelector('[data-reviewer]'));
  if (document.getElementById('searchInput')) initSearchPage();

  document.querySelectorAll('[data-table]').forEach(group => {
    group.onclick = () => showTableInfo(group.dataset.table);
  });
}

function initTableExplorer() {
  const root = document.getElementById('tableExplorer');
  root.innerHTML = `
    <div class="grid">
      ${Object.entries(DATA.tables).map(([name, table]) => `
        <div class="card">
          <b>${esc(name)}</b>
          <p>${esc(table.purpose)}</p>
          <p><b>PK:</b> ${esc(table.pk.join(', '))}</p>
          <p><b>FK:</b> ${table.fk.length ? esc(table.fk.join('; ')) : 'None'}</p>
          <button data-open-table="${name}">View sample rows</button>
        </div>`).join('')}
    </div>
    <div id="tableRows"></div>`;

  root.querySelectorAll('[data-open-table]').forEach(button => {
    button.onclick = () => {
      const name = button.dataset.openTable;
      document.getElementById('tableRows').innerHTML = `<h2>${esc(name)} sample rows</h2>${rowsToTable(DATA.sampleRows[name] || [])}`;
    };
  });
}

function showTableInfo(name) {
  const table = DATA.tables[name];
  const box = document.getElementById('diagramInfo');
  if (!box || !table) return;

  box.innerHTML = `
    <h3>${esc(name)}</h3>
    <p>${esc(table.purpose)}</p>
    <p><b>Primary Key:</b> ${esc(table.pk.join(', '))}</p>
    <p><b>Foreign Keys:</b> ${table.fk.length ? esc(table.fk.join('; ')) : 'None'}</p>
    <p><b>Columns:</b> ${esc(table.columns.join(', '))}</p>`;
}

const sqlExamples = [
  ['SHOW TABLES', 'SHOW TABLES;'],
  ['DESCRIBE students', 'DESCRIBE students;'],
  ['SELECT students', 'SELECT * FROM students;'],
  ['COUNT students', 'SELECT COUNT(*) AS total_students FROM students;'],
  ['JOIN category', 'SELECT s.student_id, s.student_name, c.category_name\nFROM students s\nLEFT JOIN student_categories c ON c.category_id = s.category_id\nORDER BY s.student_name;'],
  ['Requirements per category', 'SELECT c.category_name, r.requirement_name\nFROM category_requirements cr\nJOIN student_categories c ON c.category_id = cr.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nORDER BY c.category_name, r.requirement_name;'],
  ['Missing/Pending', "SELECT s.student_id, s.student_name, r.requirement_name, COALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR) AND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL OR sr.status IS NULL OR sr.status IN ('PENDING','INSUFFICIENT','REJECTED')\nORDER BY s.student_name, r.requirement_name;"]
];

function initSqlPlayground() {
  const input = document.getElementById('sqlInput');
  const output = document.getElementById('sqlOutput');

  document.getElementById('sqlExamples').innerHTML = sqlExamples
    .map(([label, sql]) => `<button class="example-btn" data-sql="${esc(sql)}">${esc(label)}</button>`)
    .join('');

  document.querySelectorAll('[data-sql]').forEach(button => {
    button.onclick = () => {
      input.value = button.dataset.sql;
      runSql();
    };
  });

  document.getElementById('runSql').onclick = runSql;
  document.getElementById('copySql').onclick = () => navigator.clipboard?.writeText(input.value);
  document.getElementById('clearSql').onclick = () => {
    input.value = '';
    output.innerHTML = '';
  };

  function runSql() {
    output.innerHTML = simulateSql(input.value);
  }

  runSql();
}

function simulateSql(sqlRaw) {
  const sql = sqlRaw.trim().replace(/;$/, '');
  const upper = sql.toUpperCase().replace(/\s+/g, ' ');

  if (!sql) return '<p class="muted">Type a SQL command first.</p>';
  if (/^USE\s+/i.test(sql)) return '<div class="note">Database selected: doc_admission_db</div>';
  if (/^SHOW\s+TABLES$/i.test(sql)) {
    return rowsToTable(Object.keys(DATA.tables).map(name => ({ Tables_in_doc_admission_db: name })));
  }

  let match = sql.match(/^(DESCRIBE|DESC)\s+([a-z_]+)$/i);
  if (match) {
    const table = DATA.tables[match[2]];
    if (!table) return sqlError(`Unknown table: ${match[2]}`);
    return rowsToTable(table.columns.map(column => ({
      Field: column,
      Type: column.includes('_id') ? 'INT / key field' : 'sample',
      Key: table.pk.includes(column) ? 'PRI' : (table.fk.join(' ').includes(column) ? 'FK' : '')
    })));
  }

  match = sql.match(/^SELECT\s+COUNT\s*\(\s*\*\s*\)(?:\s+AS\s+([a-z_]+))?\s+FROM\s+([a-z_]+)$/i);
  if (match) {
    const rows = DATA.sampleRows[match[2]];
    if (!rows) return sqlError(`Unknown table: ${match[2]}`);
    return rowsToTable([{ [match[1] || 'COUNT(*)']: rows.length }]);
  }

  match = sql.match(/^SELECT\s+\*\s+FROM\s+([a-z_]+)(?:\s+WHERE\s+last_name\s+LIKE\s+'%([^%]+)%')?$/i);
  if (match) {
    let rows = DATA.sampleRows[match[1]];
    if (!rows) return sqlError(`Unknown table: ${match[1]}`);
    if (match[2]) rows = rows.filter(row => String(row.last_name || '').toLowerCase().includes(match[2].toLowerCase()));
    return rowsToTable(rows);
  }

  if (upper.includes('FROM STUDENTS S') && upper.includes('STUDENT_CATEGORIES')) {
    const rows = DATA.sampleRows.students.map(student => {
      const category = DATA.sampleRows.student_categories.find(item => item.category_id === student.category_id) || {};
      return {
        student_id: student.student_id,
        student_name: student.student_name,
        email: student.email,
        category_name: category.category_name || ''
      };
    });
    return rowsToTable(rows);
  }

  if (upper.includes('FROM CATEGORY_REQUIREMENTS') && upper.includes('REQUIREMENT_TYPES')) {
    const rows = DATA.sampleRows.category_requirements.map(categoryRequirement => {
      const category = DATA.sampleRows.student_categories.find(item => item.category_id === categoryRequirement.category_id) || {};
      const requirement = DATA.sampleRows.requirement_types.find(item => item.requirement_id === categoryRequirement.requirement_id) || {};
      return {
        category_name: category.category_name,
        requirement_name: requirement.requirement_name,
        description: requirement.description
      };
    });
    return rowsToTable(rows);
  }

  if (upper.includes('COALESCE') && upper.includes('MISSING')) {
    const rows = [];
    DATA.sampleRows.students.forEach(student => {
      DATA.sampleRows.category_requirements
        .filter(categoryRequirement => categoryRequirement.category_id === student.category_id)
        .forEach(categoryRequirement => {
          const requirement = DATA.sampleRows.requirement_types.find(item => item.requirement_id === categoryRequirement.requirement_id) || {};
          const studentRequirement = DATA.sampleRows.student_requirements.find(item => String(item.student_id) === String(student.student_id) && item.requirement_id === categoryRequirement.requirement_id);
          const status = studentRequirement?.status || 'MISSING';
          if (!studentRequirement || ['PENDING', 'INSUFFICIENT', 'REJECTED'].includes(status)) {
            rows.push({
              student_id: student.student_id,
              student_name: student.student_name,
              requirement_name: requirement.requirement_name,
              status_result: status
            });
          }
        });
    });
    return rowsToTable(rows);
  }

  return sqlError('This offline simulator supports common ADAMS reviewer queries only. Try the example buttons.');
}

function sqlError(message) {
  return `<div class="warning"><b>SQL simulator note:</b> ${esc(message)}</div>`;
}

function cleanText(value) {
  return String(value || '')
    .replace(/Prepared for ADAMS review and oral defense practice only/gi, '')
    .replace(/ADAMS DATABASE PROJECT/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeText(value) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function shuffleArray(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function uniqueByAnswer(items) {
  const seen = new Set();
  return items.filter(item => {
    const key = normalizeText(item.answer);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildPanelItems() {
  return DATA.qa.map(item => ({
    id: `panel-${item.num}`,
    source: 'Panel Q&A',
    topic: topicFromQuestionNumber(item.num),
    question: `Q${item.num}. ${cleanText(item.q)}`,
    answer: cleanText(item.answer),
    explanation: [item.defense, item.memory].filter(Boolean).map(cleanText).join(' '),
    answerType: 'text'
  }));
}

function topicFromQuestionNumber(num) {
  if (num <= 10) return 'DBMS and MySQL Foundations';
  if (num <= 20) return 'SQL Commands and Database Objects';
  if (num <= 30) return 'Business Rules and Relationships';
  if (num <= 40) return 'Normalization and Data Anomalies';
  return 'ERD, EERD, SQL Checking, and NoSQL';
}

function buildSqlItems() {
  const base = DATA.sqlChallenges.map((item, index) => ({
    id: `sql-code-${index + 1}`,
    source: 'SQL Code',
    topic: 'SQL Code Practice',
    question: item.q,
    answer: item.answer,
    explanation: item.hint,
    answerType: 'code'
  }));

  const extra = [
    {
      id: 'sql-purpose-show-tables',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'Which SQL command is used to view all tables in the selected ADAMS database?',
      answer: 'SHOW TABLES;',
      explanation: 'SHOW TABLES lists the database tables after selecting the database.',
      answerType: 'code'
    },
    {
      id: 'sql-purpose-describe',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'Which SQL command checks the columns, data types, and keys of the students table?',
      answer: 'DESCRIBE students;',
      explanation: 'DESCRIBE shows table structure.',
      answerType: 'code'
    },
    {
      id: 'sql-purpose-select',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'Which SQL command retrieves all columns and records from the students table?',
      answer: 'SELECT * FROM students;',
      explanation: 'SELECT * retrieves all columns from a table.',
      answerType: 'code'
    },
    {
      id: 'sql-purpose-join',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'What does a JOIN do in the ADAMS database?',
      answer: 'It combines related tables using matching key fields.',
      explanation: 'For example, students can be joined with student_categories using category_id.',
      answerType: 'text'
    },
    {
      id: 'sql-purpose-group-by',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'What is GROUP BY used for in SQL reports?',
      answer: 'It groups rows with the same value so aggregate functions like COUNT can summarize them.',
      explanation: 'Example: count users by role using GROUP BY role.',
      answerType: 'text'
    },
    {
      id: 'sql-purpose-having',
      source: 'SQL Code',
      topic: 'SQL Command Purpose',
      question: 'What is HAVING used for in SQL?',
      answer: 'It filters grouped results after GROUP BY.',
      explanation: 'Example: HAVING COUNT(*) > 1 finds duplicate grouped values.',
      answerType: 'text'
    },
    {
      id: 'sql-safety-update-delete',
      source: 'SQL Code',
      topic: 'SQL Safety',
      question: 'Before running UPDATE or DELETE, what safe checking step should you do first?',
      answer: 'Run SELECT with the same WHERE condition first.',
      explanation: 'This helps confirm which rows will be affected before changing or deleting records.',
      answerType: 'text'
    },
    {
      id: 'sql-missing-pending',
      source: 'SQL Code',
      topic: 'Advanced ADAMS SQL',
      question: 'What is the purpose of the missing or pending requirements query?',
      answer: 'It identifies student requirements that are missing, pending, insufficient, or rejected.',
      explanation: 'The query uses category requirements, student requirements, and status conditions to monitor incomplete submissions.',
      answerType: 'text'
    },
    {
      id: 'sql-completion-summary',
      source: 'SQL Code',
      topic: 'Advanced ADAMS SQL',
      question: 'What is the purpose of the completion summary query?',
      answer: 'It summarizes required, recorded, uploaded, completed, and missing requirements per student.',
      explanation: 'This supports monitoring and reporting of student admission requirements.',
      answerType: 'text'
    }
  ];

  return [...base, ...extra];
}

function buildNormalizationItems() {
  const fromQa = DATA.qa
    .filter(item => item.num >= 31 && item.num <= 40)
    .map(item => ({
      id: `norm-qa-${item.num}`,
      source: 'Normalization',
      topic: 'Normalization and Data Anomalies',
      question: `Q${item.num}. ${cleanText(item.q)}`,
      answer: cleanText(item.answer),
      explanation: [item.defense, item.memory].filter(Boolean).map(cleanText).join(' '),
      answerType: 'text'
    }));

  const extra = [
    {
      id: 'norm-unf',
      source: 'Normalization',
      topic: 'UNF to 1NF',
      question: 'Which stage still contains repeating groups such as Requirement1, Status1, Requirement2, and Status2?',
      answer: 'UNF or Unnormalized Form',
      explanation: 'UNF is the raw messy table before removing repeating groups.',
      answerType: 'text'
    },
    {
      id: 'norm-1nf',
      source: 'Normalization',
      topic: 'UNF to 1NF',
      question: 'What is the main improvement when ADAMS applies 1NF?',
      answer: 'Repeating groups are removed and each requirement becomes a separate row.',
      explanation: '1NF requires atomic values and no repeated columns such as Requirement1 and Requirement2.',
      answerType: 'text'
    },
    {
      id: 'norm-2nf',
      source: 'Normalization',
      topic: '2NF',
      question: 'What is the main improvement when ADAMS applies 2NF?',
      answer: 'Student, category, requirement type, and requirement status data are separated by purpose.',
      explanation: '2NF reduces repeated core data by separating related tables.',
      answerType: 'text'
    },
    {
      id: 'norm-3nf',
      source: 'Normalization',
      topic: '3NF',
      question: 'What is the main improvement when ADAMS applies 3NF?',
      answer: 'Supporting data such as users, logs, reset tokens, documents, and archives are separated into their own tables.',
      explanation: '3NF removes indirect dependencies and avoids storing unrelated support data repeatedly.',
      answerType: 'text'
    },
    {
      id: 'norm-bridge',
      source: 'Normalization',
      topic: 'Bridge Table',
      question: 'Why is category_requirements important in the normalized ADAMS design?',
      answer: 'It works as a bridge table between student_categories and requirement_types.',
      explanation: 'It resolves the many-to-many relationship between categories and requirements.',
      answerType: 'text'
    },
    {
      id: 'norm-anomalies',
      source: 'Normalization',
      topic: 'Data Anomalies',
      question: 'What problem does normalization mainly help prevent?',
      answer: 'Redundancy, inconsistency, update anomaly, insertion anomaly, and deletion anomaly.',
      explanation: 'Normalization makes the table design cleaner and safer for data maintenance.',
      answerType: 'text'
    }
  ];

  return uniqueByAnswer([...fromQa, ...extra]);
}

function buildReviewerItems(type) {
  const panel = buildPanelItems();
  const sql = buildSqlItems();
  const normalization = buildNormalizationItems();

  if (type === 'panel') return panel;
  if (type === 'sql') return sql;
  if (type === 'normalization') return normalization;
  return [...panel, ...sql, ...normalization];
}

function getReviewerState(type, items) {
  if (!state.reviewers[type]) {
    state.reviewers[type] = {
      index: 0,
      order: items.map((_, index) => index),
      score: 0,
      attempts: 0,
      answered: false,
      currentOptions: []
    };
  }

  const reviewerState = state.reviewers[type];
  if (reviewerState.order.length !== items.length) {
    reviewerState.order = items.map((_, index) => index);
    reviewerState.index = 0;
    reviewerState.answered = false;
    reviewerState.currentOptions = [];
  }
  return reviewerState;
}

function initReviewer(root) {
  const type = root.dataset.reviewer || 'mixed';
  const items = buildReviewerItems(type);
  const reviewerState = getReviewerState(type, items);

  root.innerHTML = `
    <div class="reviewer-toolbar">
      <input type="search" id="reviewSearch" placeholder="Search question, answer, topic..." />
      <select id="reviewTopic"><option value="all">All topics</option></select>
      <button id="reviewShuffle" class="secondary">Shuffle</button>
      <button id="reviewReset" class="secondary">Reset Score</button>
    </div>
    <div class="reviewer-stats">
      <span id="reviewCount"></span>
      <span id="reviewScore"></span>
    </div>
    <div class="progress-bar"><div class="progress-fill" id="reviewProgress"></div></div>
    <div id="reviewCard"></div>`;

  const searchInput = root.querySelector('#reviewSearch');
  const topicSelect = root.querySelector('#reviewTopic');
  const shuffleButton = root.querySelector('#reviewShuffle');
  const resetButton = root.querySelector('#reviewReset');

  const topics = [...new Set(items.map(item => item.topic))].sort();
  topicSelect.innerHTML += topics.map(topic => `<option value="${esc(topic)}">${esc(topic)}</option>`).join('');

  function filteredIndexes() {
    const term = normalizeText(searchInput.value);
    const topic = topicSelect.value;
    return reviewerState.order.filter(index => {
      const item = items[index];
      const haystack = normalizeText(`${item.question} ${item.answer} ${item.explanation} ${item.topic} ${item.source}`);
      const topicMatch = topic === 'all' || item.topic === topic;
      const searchMatch = !term || term.split(' ').every(word => haystack.includes(word));
      return topicMatch && searchMatch;
    });
  }

  function makeOptions(item) {
    if (reviewerState.currentOptions.length) return reviewerState.currentOptions;

    const sameTopic = items.filter(candidate => candidate.id !== item.id && candidate.topic === item.topic);
    const sameSource = items.filter(candidate => candidate.id !== item.id && candidate.source === item.source);
    const allOther = items.filter(candidate => candidate.id !== item.id);
    const pool = uniqueByAnswer([...sameTopic, ...sameSource, ...allOther]).map(candidate => candidate.answer);
    const distractors = shuffleArray(pool).filter(answer => normalizeText(answer) !== normalizeText(item.answer)).slice(0, 3);

    reviewerState.currentOptions = shuffleArray([item.answer, ...distractors]).slice(0, 4);
    return reviewerState.currentOptions;
  }

  function resetQuestionOnly() {
    reviewerState.answered = false;
    reviewerState.currentOptions = [];
  }

  function renderCard() {
    const indexes = filteredIndexes();
    const card = root.querySelector('#reviewCard');
    const progress = root.querySelector('#reviewProgress');
    const count = root.querySelector('#reviewCount');
    const score = root.querySelector('#reviewScore');

    if (!indexes.length) {
      card.innerHTML = '<div class="warning">No reviewer question found. Try another search keyword or topic.</div>';
      count.textContent = '0 question shown';
      score.textContent = `Score: ${reviewerState.score} / ${reviewerState.attempts}`;
      progress.style.width = '0%';
      return;
    }

    if (reviewerState.index >= indexes.length) reviewerState.index = 0;
    const item = items[indexes[reviewerState.index]];
    const options = makeOptions(item);

    count.textContent = `Question ${reviewerState.index + 1} of ${indexes.length}`;
    score.textContent = `Score: ${reviewerState.score} / ${reviewerState.attempts}`;
    progress.style.width = `${Math.round(((reviewerState.index + 1) / indexes.length) * 100)}%`;

    card.innerHTML = `
      <div class="reviewer-meta">
        <span class="pill">${esc(item.source)}</span>
        <span class="pill">${esc(item.topic)}</span>
      </div>
      <div class="reviewer-question">${esc(item.question)}</div>
      <div id="reviewOptions">
        ${options.map((option, index) => `
          <button class="option" data-option-index="${index}">
            <b>${String.fromCharCode(65 + index)}.</b> ${formatOption(option, item.answerType)}
          </button>`).join('')}
      </div>
      <div id="reviewFeedback" class="feedback"></div>
      <div class="btn-row">
        <button id="reviewPrev" class="secondary">Previous</button>
        <button id="reviewNext">Next</button>
      </div>`;

    card.querySelectorAll('[data-option-index]').forEach(button => {
      button.onclick = () => checkAnswer(item, Number(button.dataset.optionIndex));
    });
    card.querySelector('#reviewPrev').onclick = () => {
      reviewerState.index = (reviewerState.index - 1 + indexes.length) % indexes.length;
      resetQuestionOnly();
      renderCard();
    };
    card.querySelector('#reviewNext').onclick = () => {
      reviewerState.index = (reviewerState.index + 1) % indexes.length;
      resetQuestionOnly();
      renderCard();
    };
  }

  function formatOption(answer, answerType) {
    if (answerType === 'code') return `<code>${esc(answer)}</code>`;
    return esc(answer);
  }

  function checkAnswer(item, selectedIndex) {
    if (reviewerState.answered) return;

    const options = reviewerState.currentOptions;
    const selected = options[selectedIndex];
    const correct = normalizeText(selected) === normalizeText(item.answer);
    const buttons = root.querySelectorAll('[data-option-index]');

    reviewerState.answered = true;
    reviewerState.attempts += 1;
    if (correct) reviewerState.score += 1;

    buttons.forEach((button, index) => {
      const option = options[index];
      const isCorrectOption = normalizeText(option) === normalizeText(item.answer);
      if (isCorrectOption) button.classList.add('correct');
      if (index === selectedIndex && !isCorrectOption) button.classList.add('wrong');
      button.disabled = true;
    });

    const feedback = root.querySelector('#reviewFeedback');
    feedback.className = `feedback show ${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = `
      <b>${correct ? 'Correct!' : 'Incorrect.'}</b><br>
      <b>Answer:</b> ${formatOption(item.answer, item.answerType)}
      ${item.explanation ? `<br><b>Guide:</b> ${esc(item.explanation)}` : ''}`;

    root.querySelector('#reviewScore').textContent = `Score: ${reviewerState.score} / ${reviewerState.attempts}`;
  }

  searchInput.addEventListener('input', () => {
    reviewerState.index = 0;
    resetQuestionOnly();
    renderCard();
  });

  topicSelect.addEventListener('change', () => {
    reviewerState.index = 0;
    resetQuestionOnly();
    renderCard();
  });

  shuffleButton.onclick = () => {
    reviewerState.order = shuffleArray(items.map((_, index) => index));
    reviewerState.index = 0;
    resetQuestionOnly();
    renderCard();
  };

  resetButton.onclick = () => {
    reviewerState.score = 0;
    reviewerState.attempts = 0;
    reviewerState.index = 0;
    reviewerState.order = items.map((_, index) => index);
    resetQuestionOnly();
    renderCard();
  };

  renderCard();
}

function initCardinality() {
  const box = document.querySelector('[data-cardinality]');
  box.innerHTML = `
    <h3>Cardinality Trainer</h3>
    <p><b>Question:</b> One student category can classify many students. What is the cardinality?</p>
    <button class="choice" data-correct="1:M">1:1</button>
    <button class="choice" data-correct="1:M">1:M</button>
    <button class="choice" data-correct="1:M">M:N</button>
    <p class="explain">Correct answer: 1:M. One category can have many students.</p>`;

  box.querySelectorAll('.choice').forEach(button => {
    button.onclick = () => {
      box.querySelectorAll('.choice').forEach(choice => {
        choice.disabled = true;
        choice.classList.toggle('correct', choice.textContent === '1:M');
        if (choice === button && choice.textContent !== '1:M') choice.classList.add('wrong');
      });
      box.querySelector('.explain').style.display = 'block';
    };
  });
}

function initNormalization() {
  const box = document.querySelector('[data-normalization]');
  box.innerHTML = `
    <h3>Normalization Simulator</h3>
    <p>Click each button to see how a messy ADAMS record becomes normalized.</p>
    <div id="normOut"></div>
    <div class="btn-row">
      <button data-stage="unf">UNF</button>
      <button data-stage="1nf">Convert to 1NF</button>
      <button data-stage="2nf">Convert to 2NF</button>
      <button data-stage="3nf">Convert to 3NF</button>
    </div>`;

  const output = box.querySelector('#normOut');
  const stages = {
    unf: rowsToTable([{ Student: 'Reyes, Ana', Category: 'Freshman', Requirement1: 'Birth Certificate', Status1: 'SUBMITTED', Requirement2: 'Valid ID', Status2: 'PENDING' }]),
    '1nf': rowsToTable([
      { Student: 'Reyes, Ana', Category: 'Freshman', Requirement: 'Birth Certificate', Status: 'SUBMITTED' },
      { Student: 'Reyes, Ana', Category: 'Freshman', Requirement: 'Valid ID', Status: 'PENDING' }
    ]),
    '2nf': '<ul><li>students</li><li>student_categories</li><li>requirement_types</li><li>category_requirements</li><li>student_requirements</li></ul>',
    '3nf': '<ul><li>users</li><li>activity_log</li><li>print_logs</li><li>password_reset_tokens</li><li>documents</li><li>archived_students</li></ul>'
  };

  output.innerHTML = stages.unf;
  box.querySelectorAll('[data-stage]').forEach(button => {
    button.onclick = () => { output.innerHTML = stages[button.dataset.stage]; };
  });
}

function buildFlashcards() {
  const originalCards = DATA.flashcards.map((item, index) => ({
    id: `flash-${index + 1}`,
    front: item.front,
    back: item.back,
    topic: 'Core Flashcards'
  }));

  const panelCards = DATA.qa.map(item => ({
    id: `flash-panel-${item.num}`,
    front: `Q${item.num}. ${cleanText(item.q)}`,
    back: [item.answer, item.defense, item.memory].filter(Boolean).map(cleanText).join('\n\n'),
    topic: topicFromQuestionNumber(item.num)
  }));

  const sqlCards = buildSqlItems().map(item => ({
    id: `flash-${item.id}`,
    front: item.question,
    back: `${item.answer}${item.explanation ? `\n\n${item.explanation}` : ''}`,
    topic: item.topic
  }));

  const normCards = buildNormalizationItems().map(item => ({
    id: `flash-${item.id}`,
    front: item.question,
    back: `${item.answer}${item.explanation ? `\n\n${item.explanation}` : ''}`,
    topic: item.topic
  }));

  return [...originalCards, ...panelCards, ...sqlCards, ...normCards];
}

function initFlashcards() {
  const cards = buildFlashcards();
  const card = document.getElementById('flashcard');
  const meta = document.getElementById('flashMeta');

  function draw() {
    const item = cards[state.cardIndex % cards.length];
    card.textContent = state.cardBack ? item.back : item.front;
    card.classList.toggle('back', state.cardBack);
    if (meta) meta.innerHTML = `<span class="pill">Card ${state.cardIndex + 1} of ${cards.length}</span><span class="pill">${esc(item.topic)}</span>`;
  }

  card.onclick = () => {
    state.cardBack = !state.cardBack;
    draw();
  };

  document.getElementById('flipCard').onclick = () => card.click();
  document.getElementById('nextCard').onclick = () => {
    state.cardIndex = (state.cardIndex + 1) % cards.length;
    state.cardBack = false;
    draw();
  };
  document.getElementById('prevCard').onclick = () => {
    state.cardIndex = (state.cardIndex - 1 + cards.length) % cards.length;
    state.cardBack = false;
    draw();
  };

  draw();
}

function initSqlChallenges() {
  const root = document.getElementById('sqlChallenges');
  root.innerHTML = DATA.sqlChallenges.map((challenge, index) => `
    <div class="activity-card sql-answer-box">
      <h3>${index + 1}. ${esc(challenge.q)}</h3>
      <textarea rows="3" placeholder="Type SQL here..."></textarea>
      <div class="btn-row">
        <button data-check="${index}">Check</button>
        <button class="secondary" data-reveal="${index}">Reveal</button>
      </div>
      <div class="answer"></div>
    </div>`).join('');

  root.querySelectorAll('[data-check]').forEach(button => {
    button.onclick = () => {
      const challenge = DATA.sqlChallenges[button.dataset.check];
      const card = button.closest('.activity-card');
      const value = card.querySelector('textarea').value;
      const ok = new RegExp(challenge.regex, 'i').test(value);
      const answer = card.querySelector('.answer');
      answer.style.display = 'block';
      answer.innerHTML = ok ? `✅ Correct<br><small>${esc(challenge.hint)}</small>` : `❌ Not yet. Hint: ${esc(challenge.hint)}`;
    };
  });

  root.querySelectorAll('[data-reveal]').forEach(button => {
    button.onclick = () => {
      const challenge = DATA.sqlChallenges[button.dataset.reveal];
      const card = button.closest('.activity-card');
      const answer = card.querySelector('.answer');
      answer.style.display = 'block';
      answer.innerHTML = `Expected answer:<pre><code>${esc(challenge.answer)}</code></pre>`;
    };
  });
}

function initMockDefense() {
  const question = document.getElementById('mockQ');
  const answer = document.getElementById('mockA');

  document.getElementById('startMock').onclick = () => {
    state.mock = DATA.qa[Math.floor(Math.random() * DATA.qa.length)];
    question.textContent = `Q${state.mock.num}. ${cleanText(state.mock.q)}`;
    answer.style.display = 'none';
    answer.innerHTML = '';
  };

  document.getElementById('showMock').onclick = () => {
    if (!state.mock) return;
    answer.innerHTML = `
      <p><b>Answer:</b> ${esc(cleanText(state.mock.answer))}</p>
      ${state.mock.defense ? `<p><b>Defense line:</b> ${esc(cleanText(state.mock.defense))}</p>` : ''}
      ${state.mock.memory ? `<p><b>Must remember:</b> ${esc(cleanText(state.mock.memory))}</p>` : ''}`;
    answer.style.display = 'block';
  };
}

function initSearchPage() {
  const input = document.getElementById('searchInput');
  const output = document.getElementById('searchResults');
  input.addEventListener('input', () => renderSearch(input.value, output));
  renderSearch('', output);
}

function searchIndex() {
  const sectionItems = SECTIONS.map(section => ({
    type: section.kind,
    title: section.title,
    route: `#${section.id}`,
    text: sectionText(section)
  }));

  const qaItems = DATA.qa.map(item => ({
    type: 'Q&A',
    title: `Q${item.num}. ${cleanText(item.q)}`,
    route: '#panel-reviewer',
    text: `${cleanText(item.q)} ${cleanText(item.answer)} ${cleanText(item.defense)} ${cleanText(item.memory)}`
  }));

  const tableItems = Object.entries(DATA.tables).map(([name, table]) => ({
    type: 'TABLE',
    title: name,
    route: '#table-guide',
    text: `${name} ${table.purpose} ${table.columns.join(' ')} ${table.pk.join(' ')} ${table.fk.join(' ')}`
  }));

  const reviewerItems = buildReviewerItems('mixed').map(item => ({
    type: item.source,
    title: item.question,
    route: item.source === 'SQL Code' ? '#sql-reviewer' : item.source === 'Normalization' ? '#normalization-reviewer' : '#panel-reviewer',
    text: `${item.question} ${item.answer} ${item.explanation} ${item.topic}`
  }));

  const fullItems = Object.entries(DATA.fullText).map(([name, text]) => ({
    type: 'SOURCE',
    title: `Original ${name} reviewer text`,
    route: '#pdf-source',
    text
  }));

  return [...sectionItems, ...qaItems, ...tableItems, ...reviewerItems, ...fullItems];
}

function renderSearch(query, output, limit = 25) {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    output.innerHTML = '<div class="note">Type any keyword from the reviewer. Example: cardinality, foreign key, DESCRIBE, 3NF, bridge table.</div>';
    return;
  }

  const terms = cleanQuery.split(/\s+/).filter(Boolean);
  const items = searchIndex()
    .map(item => {
      const haystack = `${item.title} ${item.text}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
      return { ...item, score, haystack };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (!items.length) {
    output.innerHTML = '<p>No result found. Try a shorter keyword.</p>';
    return;
  }

  output.innerHTML = items.map(item => {
    const text = String(item.text).replace(/\s+/g, ' ');
    const position = text.toLowerCase().indexOf(terms[0]);
    const snippetStart = Math.max(0, position - 100);
    const snippet = text.slice(snippetStart, snippetStart + 360);
    return `
      <div class="search-hit">
        <h3><a href="${item.route}">${esc(item.title)}</a><span class="tag">${esc(item.type)}</span></h3>
        <p>${highlight(snippet, cleanQuery)}</p>
      </div>`;
  }).join('');
}

function highlight(text, query) {
  if (!query) return esc(text);
  const terms = query
    .split(/\s+/)
    .filter(Boolean)
    .map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return esc(text).replace(new RegExp(`(${terms.join('|')})`, 'ig'), '<mark>$1</mark>');
}

const topSearch = document.getElementById('topSearch');
const topResults = document.getElementById('topSearchResults');

topSearch.addEventListener('input', () => {
  if (!topSearch.value.trim()) {
    topResults.classList.remove('open');
    return;
  }
  topResults.classList.add('open');
  renderTopResults(topSearch.value);
});

function renderTopResults(query) {
  const temp = document.createElement('div');
  renderSearch(query, temp, 8);
  const hits = temp.querySelectorAll('.search-hit');

  topResults.innerHTML = hits.length
    ? Array.from(hits).map(hit => {
      const link = hit.querySelector('a');
      const paragraph = hit.querySelector('p');
      return `<a class="top-result" href="${link.getAttribute('href')}"><b>${link.textContent}</b><small>${paragraph.textContent.slice(0, 170)}...</small></a>`;
    }).join('')
    : '<div class="top-result">No result found.</div>';
}

document.addEventListener('click', event => {
  if (!event.target.closest('.top-search-wrap')) topResults.classList.remove('open');
});

document.getElementById('quickBtn').onclick = () => document.getElementById('quickPanel').classList.add('open');
document.getElementById('closeQuick').onclick = () => document.getElementById('quickPanel').classList.remove('open');
document.getElementById('quickSearch').addEventListener('input', event => renderSearch(event.target.value, document.getElementById('quickResults'), 8));
document.getElementById('menuBtn').onclick = () => sidebar.classList.toggle('open');
document.getElementById('themeBtn').onclick = () => document.body.classList.toggle('dark');
window.addEventListener('hashchange', render);
window.addEventListener('scroll', () => { document.getElementById('toTop').style.display = scrollY > 500 ? 'block' : 'none'; });
document.getElementById('toTop').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    topSearch.focus();
  }
});

buildNav();
render();
