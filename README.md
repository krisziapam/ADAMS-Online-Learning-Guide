# ADAMS Online Learning Guide - Complete GitHub Pages Version

This is a final complete static learning portal for the ADAMS database project. It is designed like a interactive reviewer site and can be deployed directly on GitHub Pages.

## Included Features

- Sidebar lesson navigation
- Global keyword search for lessons, SQL, ERD/EERD, Q&A, and full reviewer text
- Full ADAMS 50 Q&A defense reviewer integration
- Full SQL beginner practice reviewer integration
- Full normalization guide integration
- Full final project documentation searchable text
- SQL TryIt playground using offline ADAMS sample data
- SQL assessment/checker
- Interactive ERD table viewer
- Interactive EERD guide
- ERD shapes, symbols, and cardinality lesson
- Database table explorer with PK, FK, columns, purpose, and sample rows
- Normalization simulator
- Cardinality trainer
- Flashcards
- Happy review quiz
- Mock oral defense mode
- Original PDF source viewer
- GitHub Pages deployment instructions

## Folder Structure

```text
adams-learning-guide-final complete/
├── index.html
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── data.js       # Model/data layer
    │   ├── views.js      # View/template layer
    │   └── app.js        # Controller/interaction layer
    └── docs/
        ├── ADAMS_50_QA_BEGINNER_DEFENSE_REVIEWER_FINAL.pdf
        ├── ADAMS_SQL_BEGINNER_PRACTICE_REVIEWER_FINAL.pdf
        ├── ADAMS_Normalization_Hierarchy_Review_Guide.pdf
        └── ADAMS_Final_Project_Documentation_FINAL_SUBMISSION_LOCKED.pdf
```

## How to Run Locally

Open `index.html` directly in your browser.

Recommended local server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How to Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this package.
3. Go to repository **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root` folder.
7. Save and wait for GitHub Pages to generate your website link.

## Notes

- This is a static website. No backend is required.
- The SQL TryIt editor is an offline simulator only. It does not connect to your real MySQL database.
- The original PDF reviewer files are included under `assets/docs`.
- The app is intentionally beginner-friendly for oral defense preparation.
