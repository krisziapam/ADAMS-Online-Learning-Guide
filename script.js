const DB = {
  students: [
    { student_id: "2026-0001", student_name: "Reyes, Ana", last_name: "Reyes", first_name: "Ana", email: "ana.reyes@example.com", category_id: "1" },
    { student_id: "2026-0002", student_name: "Santos, Mark", last_name: "Santos", first_name: "Mark", email: "mark.santos@example.com", category_id: "2" },
    { student_id: "2026-0003", student_name: "Dela Cruz, Mia", last_name: "Dela Cruz", first_name: "Mia", email: "mia.dc@example.com", category_id: "1" }
  ],
  student_categories: [
    { category_id: "1", category_name: "Freshman", sort_order: "1" },
    { category_id: "2", category_name: "Transferee", sort_order: "2" },
    { category_id: "3", category_name: "Returnee", sort_order: "3" }
  ],
  requirement_types: [
    { requirement_id: "1", requirement_name: "Birth Certificate", description: "Proof of identity and birth details" },
    { requirement_id: "2", requirement_name: "Valid ID", description: "Government or school ID" },
    { requirement_id: "3", requirement_name: "Transcript", description: "Previous academic record" },
    { requirement_id: "4", requirement_name: "Good Moral", description: "Certificate of good moral character" }
  ],
  category_requirements: [
    { category_id: "1", requirement_id: "1" },
    { category_id: "1", requirement_id: "2" },
    { category_id: "2", requirement_id: "3" },
    { category_id: "2", requirement_id: "4" }
  ],
  student_requirements: [
    { student_requirement_id: "1", student_id: "2026-0001", requirement_id: "1", status: "SUBMITTED", file_name: "birth.pdf" },
    { student_requirement_id: "2", student_id: "2026-0001", requirement_id: "2", status: "PENDING", file_name: "" },
    { student_requirement_id: "3", student_id: "2026-0002", requirement_id: "3", status: "PENDING", file_name: "" },
    { student_requirement_id: "4", student_id: "2026-0002", requirement_id: "4", status: "SUBMITTED", file_name: "goodmoral.pdf" }
  ],
  users: [
    { user_id: "1", username: "admin", full_name: "System Administrator", role: "superadmin", is_active: "1" },
    { user_id: "2", username: "staff1", full_name: "Staff One", role: "staff", is_active: "1" }
  ],
  documents: [
    { document_id: "1", student_pk: "2026-0001", document_type: "Admission Form", status: "SUBMITTED", date_submitted: "2026-06-20" },
    { document_id: "2", student_pk: "2026-0002", document_type: "Transcript", status: "PENDING", date_submitted: "2026-06-20" }
  ],
  activity_log: [
    { log_id: "1", username: "admin", action: "ADD", module: "Students", description: "Added student record", log_time: "2026-06-20 08:00:00" },
    { log_id: "2", username: "staff1", action: "UPLOAD", module: "Requirements", description: "Uploaded document", log_time: "2026-06-20 09:00:00" }
  ],
  print_logs: [
    { log_id: "1", ref_no: "PRN-001", student_id: "2026-0001", document_type: "Admission Checklist", printed_by_name: "Staff One", printed_at: "2026-06-20 10:00:00" }
  ]
};

const quiz = [
  ["What is ADAMS focused on?", ["Admission documents and records", "Payroll", "Inventory"], 0],
  ["Final login users are:", ["Superadmin and Staff", "Students only", "Parents"], 0],
  ["1NF fixes:", ["Repeating groups", "Logs", "Passwords only"], 0],
  ["2NF separates:", ["Core tables by purpose", "Only colors", "Only print button"], 0],
  ["3NF separates:", ["Supporting/indirect data", "Only students", "Only UI"], 0],
  ["Bridge table is:", ["category_requirements", "users", "print_logs"], 0],
  ["ERD means:", ["Entity Relationship Diagram", "External Report Design", "Entry Review Data"], 0],
  ["Crow's foot means:", ["Many", "One", "No relationship"], 0],
  ["DESCRIBE does what?", ["Checks table structure", "Deletes table", "Prints report"], 0],
  ["WHERE is used to:", ["Filter rows", "Group records", "Create database"], 0]
];

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindActivities();
  bindSqlTryIt();
  bindSearch();
  bindDarkMode();
  renderQuiz();
  bindQuiz();
});

function bindNavigation() {
  document.querySelectorAll(".nav-btn, .go-btn").forEach(button => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(button => button.classList.remove("active"));

  const selectedPage = document.getElementById(id);
  const selectedButton = document.querySelector(`.nav-btn[data-page="${id}"]`);

  if (selectedPage) selectedPage.classList.add("active");
  if (selectedButton) selectedButton.classList.add("active");

  window.scrollTo(0, 0);
}

function bindDarkMode() {
  document.getElementById("darkBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[;`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function bindActivities() {
  document.querySelectorAll(".check-btn").forEach(button => {
    button.addEventListener("click", () => checkActivity(button));
  });

  document.querySelectorAll(".reset-btn").forEach(button => {
    button.addEventListener("click", () => resetActivity(button));
  });
}

function checkActivity(button) {
  const box = button.closest("[data-activity]");
  let total = 0;
  let score = 0;

  box.querySelectorAll(".q").forEach(q => {
    total++;
    let isCorrect = false;

    if (q.dataset.answer !== undefined) {
      const checked = q.querySelector("input[type='radio']:checked");
      isCorrect = checked && checked.value === q.dataset.answer;
    }

    if (q.dataset.fill !== undefined) {
      const input = q.querySelector("input:not([type='radio'])");
      isCorrect = input && normalizeText(input.value) === normalizeText(q.dataset.fill);
    }

    let feedback = q.querySelector(".fb");

    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "fb";
      q.appendChild(feedback);
    }

    if (isCorrect) {
      score++;
      feedback.className = "fb good";
      feedback.innerHTML = "✅ Correct";
    } else {
      feedback.className = "fb bad";
      feedback.innerHTML = "❌ Not yet. Review and try again.";
    }
  });

  box.querySelector(".score").innerHTML =
    `Score: ${score} / ${total} ${score === total ? "🎉 Great job!" : "Keep practicing!"}`;
}

function resetActivity(button) {
  const box = button.closest("[data-activity]");

  box.querySelectorAll("input[type='radio']").forEach(input => input.checked = false);
  box.querySelectorAll("input[type='text']").forEach(input => input.value = "");
  box.querySelectorAll(".fb").forEach(feedback => {
    feedback.className = "fb";
    feedback.innerHTML = "";
  });

  const score = box.querySelector(".score");
  if (score) score.innerHTML = "";
}

function makeTable(rows) {
  if (!rows || rows.length === 0) {
    return "<p>No rows found.</p>";
  }

  const columns = Object.keys(rows[0]);

  let html = "<table><thead><tr>";
  columns.forEach(column => {
    html += `<th>${column}</th>`;
  });
  html += "</tr></thead><tbody>";

  rows.forEach(row => {
    html += "<tr>";
    columns.forEach(column => {
      html += `<td>${row[column] ?? ""}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  return html;
}

function bindSqlTryIt() {
  const runBtn = document.getElementById("runSqlBtn");
  const copyBtn = document.getElementById("copySqlBtn");
  const clearBtn = document.getElementById("clearSqlBtn");

  if (runBtn) runBtn.addEventListener("click", runSQL);
  if (copyBtn) copyBtn.addEventListener("click", copySQL);
  if (clearBtn) clearBtn.addEventListener("click", clearSQL);

  document.querySelectorAll(".example-sql").forEach(button => {
    button.addEventListener("click", () => {
      document.getElementById("sqlEditor").value = button.dataset.sql;
    });
  });
}

function copySQL() {
  const sqlEditor = document.getElementById("sqlEditor");
  navigator.clipboard.writeText(sqlEditor.value);
}

function clearSQL() {
  document.getElementById("sqlEditor").value = "";
  document.getElementById("sqlResult").innerHTML = "Click Run SQL.";
}

function runSQL() {
  const raw = document.getElementById("sqlEditor").value;
  const q = normalizeText(raw);
  let output = "";

  if (q === "show tables") {
    output = makeTable(Object.keys(DB).map(name => ({
      Tables_in_doc_admission_db: name
    })));
  }

  else if (q.startsWith("describe ")) {
    const tableName = q.replace("describe ", "").trim();

    if (DB[tableName] && DB[tableName].length > 0) {
      output = makeTable(Object.keys(DB[tableName][0]).map(field => ({
        Field: field,
        Type: "sample",
        Key: field.includes("id") ? "KEY" : ""
      })));
    } else {
      output = "<p>Table not found in sample ADAMS database.</p>";
    }
  }

  else if (q.includes("count(*)") && q.includes("students")) {
    output = makeTable([{ total_students: DB.students.length }]);
  }

  else if (q.includes("from users")) {
    output = makeTable(DB.users);
  }

  else if (q.includes("from students") && q.includes("student_categories")) {
    const joined = DB.students.map(student => {
      const category = DB.student_categories.find(c => c.category_id === student.category_id) || {};
      return {
        student_id: student.student_id,
        student_name: student.student_name,
        email: student.email,
        category_name: category.category_name || ""
      };
    });

    output = makeTable(joined);
  }

  else if (q.includes("from category_requirements")) {
    const joined = DB.category_requirements.map(cr => {
      const category = DB.student_categories.find(c => c.category_id === cr.category_id) || {};
      const requirement = DB.requirement_types.find(r => r.requirement_id === cr.requirement_id) || {};

      return {
        category_name: category.category_name || "",
        requirement_name: requirement.requirement_name || "",
        description: requirement.description || ""
      };
    });

    output = makeTable(joined);
  }

  else if (q.includes("from students") && q.includes("student_requirements")) {
    const joined = DB.student_requirements.map(sr => {
      const student = DB.students.find(s => s.student_id === sr.student_id) || {};
      const requirement = DB.requirement_types.find(r => r.requirement_id === sr.requirement_id) || {};

      return {
        student_id: student.student_id || "",
        student_name: student.student_name || "",
        requirement_name: requirement.requirement_name || "",
        status: sr.status,
        file_name: sr.file_name
      };
    });

    output = makeTable(joined);
  }

  else if (q.includes("from students")) {
    output = makeTable(DB.students);
  }

  else if (q.includes("from student_categories")) {
    output = makeTable(DB.student_categories);
  }

  else if (q.includes("from requirement_types")) {
    output = makeTable(DB.requirement_types);
  }

  else if (q.includes("from documents")) {
    output = makeTable(DB.documents);
  }

  else if (q.includes("from activity_log")) {
    output = makeTable(DB.activity_log);
  }

  else if (q.includes("from print_logs")) {
    output = makeTable(DB.print_logs);
  }

  else if (
    q.startsWith("insert") ||
    q.startsWith("update") ||
    q.startsWith("delete")
  ) {
    output = `
      <div class="note">
        <b>Practice only:</b> This TryIt does not change sample data.
        In real MySQL, always run SELECT first before UPDATE or DELETE.
      </div>
    `;
  }

  else {
    output = `
      <p>This offline TryIt recognizes common ADAMS SQL examples.</p>
      <p>Try: <code>SHOW TABLES;</code>, <code>DESCRIBE students;</code>, <code>SELECT * FROM students;</code>, or the JOIN buttons.</p>
    `;
  }

  document.getElementById("sqlResult").innerHTML = output;
}

function renderQuiz() {
  const box = document.getElementById("quizBox");
  if (!box) return;

  box.innerHTML = quiz.map((q, i) => {
    return `
      <div class="q quiz-item">
        <p><b>${i + 1}. ${q[0]}</b></p>
        ${q[1].map((answer, j) => `
          <label>
            <input type="radio" name="quiz${i}" value="${j}">
            ${answer}
          </label>
        `).join("")}
      </div>
    `;
  }).join("");
}

function bindQuiz() {
  const checkBtn = document.getElementById("checkQuizBtn");
  const resetBtn = document.getElementById("resetQuizBtn");

  if (checkBtn) checkBtn.addEventListener("click", checkQuiz);
  if (resetBtn) resetBtn.addEventListener("click", resetQuiz);
}

function checkQuiz() {
  let score = 0;

  quiz.forEach((q, i) => {
    const selected = document.querySelector(`input[name="quiz${i}"]:checked`);
    if (selected && Number(selected.value) === q[2]) score++;
  });

  document.getElementById("quizScore").innerHTML =
    `Score: ${score} / ${quiz.length} ${score === quiz.length ? "🎉 Perfect!" : "Review then try again."}`;
}

function resetQuiz() {
  renderQuiz();
  document.getElementById("quizScore").innerHTML = "";
}

function bindSearch() {
  document.getElementById("searchBox").addEventListener("input", function () {
    const term = this.value.toLowerCase().trim();
    if (!term) return;

    const found = [...document.querySelectorAll(".page")].find(page =>
      page.innerText.toLowerCase().includes(term)
    );

    if (found) showPage(found.id);
  });
}
