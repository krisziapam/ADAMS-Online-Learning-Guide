# ADAMS Online Learning Guide - SQL Practice Center Final

Clean GitHub Pages version with merged SQL Playground/Test Lab into one SQL Practice Center. Includes real ADAMS SQL dump data, scenario guide, required 10 SQL queries, normalization simulator, ERD/EERD guides, quizzes, flashcards, and PDF references.

Upload all files/folders in this directory to the repository root.


Update: The Activities tab in index.html now embeds adams_reviewer_app.html. The rest of the guide structure is preserved.

Update: The standalone Happy Review Quiz and Flashcards menu items were removed because the Activities reviewer app already includes those modes.

## ADAMS Demo Login Access

These accounts are for local testing, demo, and learning purposes only.

| Username | Password | Role | Access Coverage |
|---|---|---|---|
| `superadmin` | `superadmin123` | Superadmin | Full system access |
| `superadmin_demo` | `superadmin123` | Superadmin | Full system access |
| `admin` | `admin123` | Admin | Admin-level access except superadmin-only controls |
| `staff1` | `staff123` | Staff | Staff-level access |
| `test` | `test123` | Staff | Staff-level access |
| `staff_demo` | `staff123` | Staff | Staff-level access |
| `student1` | `student123` | Student | Student-level access only |
| `student_demo` | `student123` | Student | Student-level access only |

Expected role coverage: Superadmin has full system access; Admin excludes superadmin-only controls; Staff handles routine student/document work; Student should only access own profile, records/status, documents/status, and settings.



## Updated ERD/EERD and Login Role Scope

This reviewer now reflects the current ADAMS demo database setup. The final demo roles are:

| Username | Password | Role |
|---|---|---|
| `superadmin` | `superadmin123` | Superadmin |
| `superadmin_demo` | `superadmin123` | Superadmin |
| `admin` | `admin123` | Admin |
| `staff1` | `staff123` | Staff |
| `test` | `test123` | Staff |
| `staff_demo` | `staff123` | Staff |
| `student1` | `student123` | Student |
| `student_demo` | `student123` | Student |

The ERD/EERD section was corrected to show `users.role` as `superadmin/admin/staff/student`, to include the Student login role, and to align the relationships with the imported `doc_admission_db` schema.
