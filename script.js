const DB = {
  students: [
    { student_id: "2026-0001", student_name: "Reyes, Ana", email: "ana.reyes@example.com", category_id: "1" },
    { student_id: "2026-0002", student_name: "Santos, Mark", email: "mark.santos@example.com", category_id: "2" }
  ],
  student_categories: [
    { category_id: "1", category_name: "Freshman" },
    { category_id: "2", category_name: "Transferee" }
  ],
  users: [
    { user_id: "1", username: "admin", role: "superadmin" },
    { user_id: "2", username: "staff1", role: "staff" }
  ]
};

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function toggleDark() {
  document.body.classList.toggle("dark");
}

function normalizeText(text) {
  return (text || "").toLowerCase().replace(/[;`]/g, "").replace(/\s+/g, " ").trim();
}

function checkActivity(button) {
  const box = button.closest("[data-activity]");
  let total = 0, score = 0;

  box.querySelectorAll(".q").forEach(q => {
    total++;
    let ok = false;

    if (q.dataset.answer !== undefined) {
      const checked = q.querySelector("input[type='radio']:checked");
      ok = checked && checked.value === q.dataset.answer;
    }

    if (q.dataset.fill !== undefined) {
      const input = q.querySelector("input:not([type='radio'])");
      ok = normalizeText(input.value) === normalizeText(q.dataset.fill);
    }

    let fb = q.querySelector(".fb");
    if (!fb) {
      fb = document.createElement("div");
      fb.className = "fb";
      q.appendChild(fb);
    }

    fb.className = ok ? "fb good" : "fb bad";
    fb.innerHTML = ok ? "✅ Correct" : "❌ Not yet. Review and try again.";
    if (ok) score++;
  });

  box.querySelector(".score").innerHTML =
    `Score: ${score} / ${total} ${score === total ? "🎉 Great job!" : "Keep practicing!"}`;
}

function makeTable(rows) {
  if (!rows || rows.length === 0) return "<p>No rows found.</p>";
  const cols = Object.keys(rows[0]);
  return "<table><tr>" + cols.map(c => `<th>${c}</th>`).join("") + "</tr>" +
    rows.map(r => "<tr>" + cols.map(c => `<td>${r[c] ?? ""}</td>`).join("") + "</tr>").join("") +
    "</table>";
}

function loadSQL(sql) {
  document.getElementById("sqlEditor").value = sql;
}

function copySQL() {
  navigator.clipboard.writeText(document.getElementById("sqlEditor").value);
}

function clearSQL() {
  document.getElementById("sqlEditor").value = "";
  document.getElementById("sqlResult").innerHTML = "Click Run SQL.";
}

function runSQL() {
  const q = normalizeText(document.getElementById("sqlEditor").value);
  let output = "";

  if (q === "show tables") {
    output = makeTable(Object.keys(DB).map(name => ({ Tables_in_doc_admission_db: name })));
  } else if (q === "describe students") {
    output = makeTable(Object.keys(DB.students[0]).map(field => ({ Field: field, Type: "sample", Key: field.includes("id") ? "KEY" : "" })));
  } else if (q.includes("count(*)") && q.includes("students")) {
    output = makeTable([{ total_students: DB.students.length }]);
  } else if (q.includes("from users")) {
    output = makeTable(DB.users);
  } else if (q.includes("from students") && q.includes("student_categories")) {
    output = makeTable(DB.students.map(s => {
      const c = DB.student_categories.find(x => x.category_id === s.category_id) || {};
      return { student_id: s.student_id, student_name: s.student_name, category_name: c.category_name || "" };
    }));
  } else if (q.includes("from students")) {
    output = makeTable(DB.students);
  } else if (q.includes("from student_categories")) {
    output = makeTable(DB.student_categories);
  } else if (q.startsWith("insert") || q.startsWith("update") || q.startsWith("delete")) {
    output = "<div class='note'><b>Practice only:</b> This TryIt does not change sample data. In real MySQL, run SELECT first before UPDATE/DELETE.</div>";
  } else {
    output = "<p>This TryIt recognizes common ADAMS SQL examples. Try SHOW TABLES, DESCRIBE students, SELECT * FROM students, or JOIN category.</p>";
  }

  document.getElementById("sqlResult").innerHTML = output;
}

const quiz = [
  ["What is ADAMS focused on?", ["Admission documents and records", "Payroll", "Inventory"], 0],
  ["Final login users are:", ["Superadmin and Staff", "Students only", "Parents"], 0],
  ["1NF fixes:", ["Repeating groups", "Logs", "Passwords only"], 0],
  ["ERD means:", ["Entity Relationship Diagram", "External Report Design", "Entry Review Data"], 0],
  ["WHERE is used to:", ["Filter rows", "Group records", "Create database"], 0]
];

function renderQuiz() {
  const box = document.getElementById("quizBox");
  if (!box) return;

  box.innerHTML = quiz.map((q, i) => `
    <div class="q">
      <p><b>${i + 1}. ${q[0]}</b></p>
      ${q[1].map((a, j) => `
        <label><input type="radio" name="quiz${i}" value="${j}"> ${a}</label>
      `).join("")}
    </div>
  `).join("");
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

document.getElementById("searchBox").addEventListener("input", function () {
  const term = this.value.toLowerCase().trim();
  if (!term) return;

  const found = [...document.querySelectorAll(".page")]
    .find(page => page.innerText.toLowerCase().includes(term));

  if (found) showPage(found.id);
});

renderQuiz();
