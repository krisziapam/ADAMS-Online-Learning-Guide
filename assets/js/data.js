window.ADAMS_DATA = {
  "tables": {
    "users": {
      "pk": [
        "user_id"
      ],
      "columns": [
        "user_id",
        "username",
        "password",
        "email",
        "full_name",
        "phone",
        "is_active",
        "created_at",
        "last_login",
        "role"
      ],
      "purpose": "Stores authorized Superadmin and Staff accounts and access roles.",
      "fk": []
    },
    "student_categories": {
      "pk": [
        "category_id"
      ],
      "columns": [
        "category_id",
        "category_name",
        "sort_order"
      ],
      "purpose": "Stores reusable student classifications.",
      "fk": []
    },
    "students": {
      "pk": [
        "student_id"
      ],
      "columns": [
        "student_id",
        "user_id",
        "student_name",
        "last_name",
        "first_name",
        "middle_name",
        "birth_date",
        "email",
        "category_id",
        "remarks",
        "phone"
      ],
      "purpose": "Stores applicant/student profile information.",
      "fk": [
        "category_id -> student_categories.category_id",
        "user_id -> users.user_id"
      ]
    },
    "requirement_types": {
      "pk": [
        "requirement_id"
      ],
      "columns": [
        "requirement_id",
        "requirement_name",
        "description"
      ],
      "purpose": "Stores the master list of admission document requirements.",
      "fk": []
    },
    "category_requirements": {
      "pk": [
        "category_id",
        "requirement_id"
      ],
      "columns": [
        "category_id",
        "requirement_id"
      ],
      "purpose": "Bridge table that defines which requirements apply to each student category.",
      "fk": [
        "category_id -> student_categories.category_id",
        "requirement_id -> requirement_types.requirement_id"
      ]
    },
    "student_requirements": {
      "pk": [
        "student_requirement_id"
      ],
      "columns": [
        "student_requirement_id",
        "student_id",
        "requirement_id",
        "file_name",
        "file_path",
        "file_content",
        "mime_type",
        "file_size",
        "uploaded_by",
        "status",
        "upload_date",
        "uploaded_at"
      ],
      "purpose": "Tracks student-specific requirement status and uploaded files.",
      "fk": [
        "requirement_id -> requirement_types.requirement_id",
        "student_id -> students.student_id (logical/cast)"
      ]
    },
    "documents": {
      "pk": [
        "document_id"
      ],
      "columns": [
        "document_id",
        "student_id",
        "document_type",
        "file_path",
        "tracking_number",
        "status",
        "date_submitted",
        "remarks",
        "student_pk"
      ],
      "purpose": "Stores additional document records attached to student profiles.",
      "fk": [
        "student_pk -> students.student_id"
      ]
    },
    "activity_log": {
      "pk": [
        "log_id"
      ],
      "columns": [
        "log_id",
        "user_id",
        "username",
        "action",
        "module",
        "description",
        "log_time"
      ],
      "purpose": "Records major user actions for accountability.",
      "fk": [
        "user_id -> users.user_id"
      ]
    },
    "print_logs": {
      "pk": [
        "log_id"
      ],
      "columns": [
        "log_id",
        "ref_no",
        "student_id",
        "document_type",
        "printed_by",
        "printed_by_name",
        "printed_at",
        "campus_code"
      ],
      "purpose": "Records printed student reports or system reports.",
      "fk": [
        "student_id -> students.student_id",
        "printed_by -> users.user_id"
      ]
    },
    "password_reset_tokens": {
      "pk": [
        "id"
      ],
      "columns": [
        "id",
        "user_id",
        "token",
        "expires_at",
        "used",
        "created_at"
      ],
      "purpose": "Stores password recovery tokens and token status.",
      "fk": [
        "user_id -> users.user_id"
      ]
    },
    "archived_students": {
      "pk": [
        "archive_id"
      ],
      "columns": [
        "archive_id",
        "student_id",
        "student_name",
        "last_name",
        "first_name",
        "middle_name",
        "email",
        "phone",
        "birth_date",
        "category_id",
        "remarks",
        "archived_at",
        "archived_by"
      ],
      "purpose": "Stores snapshots of archived student records.",
      "fk": [
        "category_id -> student_categories.category_id (logical)",
        "archived_by -> users.user_id (logical)"
      ]
    }
  },
  "sampleRows": {
    "users": [
      {
        "user_id": 1,
        "username": "superadmin",
        "full_name": "System Superadmin",
        "role": "superadmin",
        "is_active": 1,
        "email": "admin@pup.edu.ph"
      },
      {
        "user_id": 5,
        "username": "staff1",
        "full_name": "Registrar Staff",
        "role": "staff",
        "is_active": 1,
        "email": "staff@pup.edu.ph"
      }
    ],
    "student_categories": [
      {
        "category_id": 1,
        "category_name": "Freshman",
        "sort_order": 1
      },
      {
        "category_id": 2,
        "category_name": "Transferee",
        "sort_order": 2
      },
      {
        "category_id": 3,
        "category_name": "Returning",
        "sort_order": 3
      }
    ],
    "students": [
      {
        "student_id": 1,
        "student_name": "Juana Santita",
        "last_name": "Santita",
        "first_name": "Juana",
        "email": "sample@email.edu",
        "phone": "09171234567",
        "category_id": 1
      },
      {
        "student_id": 2,
        "student_name": "Mark Santos",
        "last_name": "Santos",
        "first_name": "Mark",
        "email": "mark@email.edu",
        "phone": "09175550000",
        "category_id": 2
      }
    ],
    "requirement_types": [
      {
        "requirement_id": 1,
        "requirement_name": "Birth Certificate",
        "description": "Proof of birth"
      },
      {
        "requirement_id": 2,
        "requirement_name": "Valid ID",
        "description": "Identity document"
      },
      {
        "requirement_id": 3,
        "requirement_name": "Transcript of Records",
        "description": "Academic record"
      },
      {
        "requirement_id": 4,
        "requirement_name": "Good Moral",
        "description": "Character reference"
      }
    ],
    "category_requirements": [
      {
        "category_id": 1,
        "requirement_id": 1
      },
      {
        "category_id": 1,
        "requirement_id": 2
      },
      {
        "category_id": 2,
        "requirement_id": 3
      },
      {
        "category_id": 2,
        "requirement_id": 4
      }
    ],
    "student_requirements": [
      {
        "student_requirement_id": 1,
        "student_id": "1",
        "requirement_id": 1,
        "file_name": "birth.pdf",
        "status": "SUBMITTED",
        "uploaded_at": "2026-06-20"
      },
      {
        "student_requirement_id": 2,
        "student_id": "1",
        "requirement_id": 2,
        "file_name": null,
        "status": "PENDING",
        "uploaded_at": null
      },
      {
        "student_requirement_id": 3,
        "student_id": "2",
        "requirement_id": 4,
        "file_name": "goodmoral.pdf",
        "status": "SUBMITTED",
        "uploaded_at": "2026-06-20"
      }
    ],
    "documents": [
      {
        "document_id": 1,
        "student_pk": 1,
        "document_type": "Admission Form",
        "file_path": "/uploads/form.pdf",
        "status": "SUBMITTED",
        "date_submitted": "2026-06-20"
      }
    ],
    "activity_log": [
      {
        "log_id": 1,
        "user_id": 5,
        "username": "staff1",
        "action": "UPLOAD",
        "module": "Uploads",
        "description": "Uploaded Birth Certificate",
        "log_time": "2026-06-20 10:00:00"
      }
    ],
    "print_logs": [
      {
        "log_id": 1,
        "ref_no": "MN0-001",
        "student_id": 1,
        "document_type": "STUDENT_REPORT",
        "printed_by": 5,
        "printed_by_name": "Registrar Staff",
        "printed_at": "2026-06-20 11:00:00",
        "campus_code": "MN0"
      }
    ],
    "password_reset_tokens": [],
    "archived_students": []
  },
  "qa": [
    {
      "num": 1,
      "q": "What is the main focus of your project?",
      "answer": "The main focus of ADAMS is to manage admission documents and applicant/student records using a relational database.",
      "defense": "ADAMS helps the office record, search, monitor, print, and archive admission records through a database-driven system.",
      "memory": "ADAMS = admission records + document requirements + database tracking."
    },
    {
      "num": 2,
      "q": "Why is ADAMS considered a database project?",
      "answer": "It is considered a database project because the main features depend on tables, keys, relationships, and SQL queries.",
      "defense": "The system is not just a form; it depends on tables such as students, student_requirements, requirement_types, users, logs, and archived_students.",
      "memory": "Always connect your answer to tables and relationships."
    },
    {
      "num": 3,
      "q": "What is a database?",
      "answer": "A database is an organized collection of related data that can be stored, searched, updated, and managed.",
      "defense": "In ADAMS, the database stores applicant records, requirement status, user accounts, logs, and archived student records.",
      "memory": "Database = organized data."
    },
    {
      "num": 4,
      "q": "What is a DBMS?",
      "answer": "A DBMS is software used to create, manage, secure, and retrieve records from a database. Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "defense": "MySQL/MariaDB is the DBMS used to manage the ADAMS database.",
      "memory": "DBMS = software that manages the database."
    },
    {
      "num": 5,
      "q": "Why did you use MySQL?",
      "answer": "MySQL is suitable because it supports relational tables, primary keys, foreign keys, joins, constraints, and SQL reporting.",
      "defense": "Because ADAMS uses related data, MySQL is appropriate for managing structured admission records.",
      "memory": "MySQL fits relational data."
    },
    {
      "num": 6,
      "q": "What type of DBMS is MySQL?",
      "answer": "MySQL is an RDBMS, or Relational Database Management System.",
      "defense": "It stores data in related tables, which matches the design of ADAMS.",
      "memory": "MySQL = RDBMS."
    },
    {
      "num": 7,
      "q": "What is a relational database?",
      "answer": "A relational database stores data in tables and connects those tables using keys.",
      "defense": "For example, students are connected to student_categories, and requirements are connected through student_requirements.",
      "memory": "Relational = tables connected by keys."
    },
    {
      "num": 8,
      "q": "Why is a relational database suitable for ADAMS?",
      "answer": "ADAMS has many related records: students, categories, requirements, uploaded files, users, logs, and archives.",
      "defense": "A relational design prevents scattered data and allows accurate tracking of requirements per student.",
      "memory": "ADAMS data is connected, so relational database is appropriate."
    },
    {
      "num": 9,
      "q": "What is SQL?",
      "answer": "SQL means Structured Query Language. It is used to retrieve, insert, update, delete, and manage database data.",
      "defense": "We use SQL to pull student records, check requirements, count records, and generate monitoring reports.",
      "memory": "SQL is the language of the database."
    },
    {
      "num": 10,
      "q": "What are the main SQL command categories?",
      "answer": "The main categories are DDL, DML, DQL, DCL, and TCL.",
      "defense": "For our project defense, the most common commands are CREATE, SELECT, INSERT, UPDATE, DELETE, and JOIN.",
      "memory": "DDL = structure, DML = data changes, DQL = SELECT."
    },
    {
      "num": 11,
      "q": "What is DDL?",
      "answer": "DDL means Data Definition Language. It defines or changes database structures.",
      "defense": "Examples are CREATE TABLE, ALTER TABLE, and DROP TABLE.",
      "memory": "DDL changes structure."
    },
    {
      "num": 12,
      "q": "What is DML?",
      "answer": "DML means Data Manipulation Language. It changes the records inside tables.",
      "defense": "Examples are INSERT, UPDATE, and DELETE.",
      "memory": "DML changes data."
    },
    {
      "num": 13,
      "q": "What is DQL?",
      "answer": "DQL means Data Query Language. It retrieves records from the database.",
      "defense": "The main DQL command is SELECT.",
      "memory": "DQL retrieves data."
    },
    {
      "num": 14,
      "q": "What is a table?",
      "answer": "A table stores related data in rows and columns.",
      "defense": "For example, the students table stores applicant/student information.",
      "memory": "Table = container of related records."
    },
    {
      "num": 15,
      "q": "What is a field or column?",
      "answer": "A field or column is one data attribute in a table.",
      "defense": "For example, first_name, last_name, email, and category_id are fields in the students table.",
      "memory": "Column = type of information."
    },
    {
      "num": 16,
      "q": "What is a record or row?",
      "answer": "A record or row is one complete entry in a table.",
      "defense": "One applicant in the students table is one record.",
      "memory": "Row = one complete item/person/transaction."
    },
    {
      "num": 17,
      "q": "What is a primary key?",
      "answer": "A primary key uniquely identifies each record in a table.",
      "defense": "In ADAMS, students.student_id uniquely identifies each student record.",
      "memory": "Primary key = unique ID."
    },
    {
      "num": 18,
      "q": "What is a foreign key? Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "answer": "A foreign key links one table to another table.",
      "defense": "In ADAMS, students.category_id links a student to student_categories.category_id.",
      "memory": "Foreign key = connection key."
    },
    {
      "num": 19,
      "q": "What is a unique key?",
      "answer": "A unique key prevents duplicate values in a field or combination of fields.",
      "defense": "For example, users.username must be unique so two users cannot use the same username.",
      "memory": "Unique key = no duplicate value."
    },
    {
      "num": 20,
      "q": "What is referential integrity?",
      "answer": "Referential integrity keeps table relationships valid and consistent.",
      "defense": "For example, a student category assigned to a student should exist in the student_categories table.",
      "memory": "Referential integrity protects relationships."
    },
    {
      "num": 21,
      "q": "What are business rules in database design?",
      "answer": "Business rules describe how records should relate based on the actual process of the organization.",
      "defense": "In ADAMS, one business rule is that a student belongs to one category when classified.",
      "memory": "Business rules become relationships."
    },
    {
      "num": 22,
      "q": "Give one business rule in ADAMS.",
      "answer": "Each student/applicant belongs to one student category when classified.",
      "defense": "This is shown by the relationship between student_categories and students.",
      "memory": "Safe example: one category can have many students."
    },
    {
      "num": 23,
      "q": "Why do different student categories need different requirements?",
      "answer": "Different admission categories may have different document checklists.",
      "defense": "For example, a transferee may need records that are different from a freshman applicant.",
      "memory": "Different category = different checklist."
    },
    {
      "num": 24,
      "q": "What table handles category-based requirements?",
      "answer": "The category_requirements table handles the requirements assigned to each category.",
      "defense": "It connects student_categories and requirement_types.",
      "memory": "category_requirements = checklist setup table."
    },
    {
      "num": 25,
      "q": "Why do you need category_requirements? Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "answer": "It avoids repeating requirement lists and supports a many-to-many relationship between categories and requirement types.",
      "defense": "One category can have many requirements, and one requirement can be required by many categories.",
      "memory": "Bridge table prevents repetition."
    },
    {
      "num": 26,
      "q": "What is a bridge table?",
      "answer": "A bridge table connects two tables that have a many-to-many relationship.",
      "defense": "In ADAMS, category_requirements is the bridge table between student_categories and requirement_types.",
      "memory": "Bridge table = connector table."
    },
    {
      "num": 27,
      "q": "What is cardinality?",
      "answer": "Cardinality describes how many records in one table can relate to records in another table.",
      "defense": "Examples are one-to-many and many-to-many relationships in the ERD.",
      "memory": "Cardinality = how many records are connected."
    },
    {
      "num": 28,
      "q": "Give one example of a one-to-many relationship in ADAMS.",
      "answer": "One student category can classify many students.",
      "defense": "student_categories to students is a one-to-many relationship.",
      "memory": "1 category, many students."
    },
    {
      "num": 29,
      "q": "Give one example of a many-to-many relationship in ADAMS.",
      "answer": "Student categories and requirement types are many-to-many.",
      "defense": "This is implemented using category_requirements.",
      "memory": "Many categories, many requirements."
    },
    {
      "num": 30,
      "q": "What table stores the actual student requirement status?",
      "answer": "The student_requirements table stores the actual requirement status of each student.",
      "defense": "It stores fields such as student_id, requirement_id, file_name, uploaded_by, status, upload_date, and uploaded_at.",
      "memory": "student_requirements = actual monitoring table."
    },
    {
      "num": 31,
      "q": "What is normalization?",
      "answer": "Normalization is the process of organizing data into separate related tables to reduce redundancy and improve consistency. Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "defense": "ADAMS separates students, categories, requirement types, student requirements, users, logs, and archives.",
      "memory": "Normalization = clean table design."
    },
    {
      "num": 32,
      "q": "Why did you normalize your database?",
      "answer": "We normalized the database to avoid duplicate data, repeating groups, and update errors.",
      "defense": "Instead of placing all requirements in one student row, ADAMS stores requirements in separate related tables.",
      "memory": "Normalization avoids redundancy."
    },
    {
      "num": 33,
      "q": "What is UNF?",
      "answer": "UNF means Unnormalized Form. It contains repeating groups or non-atomic values.",
      "defense": "An example is one row containing Requirement1, Status1, Requirement2, and Status2.",
      "memory": "UNF = messy/manual logbook style."
    },
    {
      "num": 34,
      "q": "How did ADAMS apply 1NF?",
      "answer": "ADAMS applied 1NF by removing repeating groups and making values atomic.",
      "defense": "Each requirement is stored as a separate record instead of many requirement columns in one row.",
      "memory": "1NF = one value per field."
    },
    {
      "num": 35,
      "q": "How did ADAMS apply 2NF?",
      "answer": "ADAMS applied 2NF by separating data based on its purpose.",
      "defense": "Student data, category data, requirement type data, and requirement status data are placed in separate tables.",
      "memory": "2NF = separate tables by purpose."
    },
    {
      "num": 36,
      "q": "How did ADAMS apply 3NF?",
      "answer": "ADAMS applied 3NF by separating supporting data such as users, activity logs, print logs, password reset tokens, documents, and archived records.",
      "defense": "This avoids storing user, print, and archive details repeatedly inside the students table.",
      "memory": "3NF = remove indirect dependencies."
    },
    {
      "num": 37,
      "q": "What problem happens if you use only one big table?",
      "answer": "One big table causes duplicated data, hard updates, missing records, and accidental deletion of important information.",
      "defense": "For ADAMS, this would make requirement tracking confusing and inconsistent.",
      "memory": "One big table = redundancy and anomalies."
    },
    {
      "num": 38,
      "q": "What is an update anomaly? Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "answer": "An update anomaly happens when the same data appears in multiple places and not all copies are updated.",
      "defense": "Example: changing a requirement name in many repeated rows.",
      "memory": "Update anomaly = inconsistent edits."
    },
    {
      "num": 39,
      "q": "What is an insertion anomaly?",
      "answer": "An insertion anomaly happens when you cannot add one type of data without another unrelated data.",
      "defense": "Example: unable to add a new requirement type unless a student record already exists.",
      "memory": "Insertion anomaly = cannot insert independently."
    },
    {
      "num": 40,
      "q": "What is a deletion anomaly?",
      "answer": "A deletion anomaly happens when deleting a record also removes important related information by accident.",
      "defense": "Example: deleting a student accidentally losing the only record of a requirement if the database is not normalized.",
      "memory": "Deletion anomaly = accidental data loss."
    },
    {
      "num": 41,
      "q": "What is an ERD?",
      "answer": "An ERD, or Entity Relationship Diagram, shows the database entities/tables, attributes, keys, and relationships.",
      "defense": "Our ERD shows tables such as students, users, requirement_types, student_requirements, documents, logs, and archives.",
      "memory": "ERD = database map."
    },
    {
      "num": 42,
      "q": "What is an EERD?",
      "answer": "An EERD, or Enhanced Entity Relationship Diagram, extends ERD by showing enhanced concepts like specialization and generalization.",
      "defense": "In ADAMS, it shows USER specialization and student classification.",
      "memory": "EERD = enhanced ERD."
    },
    {
      "num": 43,
      "q": "What is the difference between ERD and EERD?",
      "answer": "ERD shows basic entities and relationships, while EERD shows enhanced modeling concepts such as subtypes.",
      "defense": "Our EERD explains that system users are specialized into Superadmin and Staff.",
      "memory": "ERD = basic; EERD = enhanced."
    },
    {
      "num": 44,
      "q": "What is specialization in EERD?",
      "answer": "Specialization means dividing a general entity into more specific subtypes. Prepared for ADAMS review and oral defense practice only ADAMS DATABASE PROJECT",
      "defense": "In ADAMS, USER is specialized into SUPERADMIN_USER and STAFF_USER only.",
      "memory": "Specialization = general to specific."
    },
    {
      "num": 45,
      "q": "Who are the system users in ADAMS?",
      "answer": "The final system users are Superadmin and Staff only.",
      "defense": "Superadmin manages system-wide accounts, settings, categories, requirements, logs, and reports. Staff handles routine searching, updating, uploading, monitoring, printing, and archiving subject to granted access.",
      "memory": "Applicants/students are records, not final login roles."
    },
    {
      "num": 46,
      "q": "What is the purpose of the data dictionary?",
      "answer": "The data dictionary explains every table field, data type, key/constraint, and meaning.",
      "defense": "It helps verify that the ERD and SQL schema are consistent.",
      "memory": "Data dictionary = table field guide."
    },
    {
      "num": 47,
      "q": "What SQL command will you use to view all tables?",
      "answer": "Use SHOW TABLES;",
      "defense": "This lets us confirm all ADAMS tables are available in the selected database.",
      "memory": "SHOW TABLES = list tables."
    },
    {
      "num": 48,
      "q": "What SQL command will you use to check table structure?",
      "answer": "Use DESCRIBE table_name;",
      "defense": "Example: DESCRIBE students; or DESCRIBE student_requirements;",
      "memory": "DESCRIBE = check columns."
    },
    {
      "num": 49,
      "q": "What SQL command will you use to retrieve student records?",
      "answer": "Use SELECT. Example: SELECT * FROM students;",
      "defense": "For cleaner output, we can select specific columns such as student_id, student_name, email, and category_id.",
      "memory": "SELECT = retrieve data."
    },
    {
      "num": 50,
      "q": "Why did you choose SQL/MySQL instead of NoSQL?",
      "answer": "We chose SQL/MySQL because ADAMS uses structured and related data that needs keys, joins, constraints, and accurate reporting.",
      "defense": "NoSQL is useful for flexible/unstructured data, but ADAMS is better represented as relational tables.",
      "memory": "Relational data = SQL/MySQL."
    }
  ],
  "fullText": {
    "qa": "ADAMS DATABASE PROJECT\n\nADAMS DATABASE PROJECT\n50 Panel Q&A Reviewer - Taglish Explanation + Visual Memory Guide\n\nPurpose: This reviewer is for practice only. It is intentionally beginner-friendly and includes explanation lines so you can defend\nADAMS as an Information Management / DBMS project.\n\nColor / Keyword Guide\n\nMeaning\n\nBlue keywords\nGreen keywords\nOrange/Memory cue\nRed line\nDefense Answer Formula\n\nDBMS concept or technical term.\nHow the concept appears in ADAMS.\nSimple picture or mental cue to remember the answer.\nThe one sentence you should memorize.\nDefinition + ADAMS example. Example: A primary key uniquely\nidentifies each record. In ADAMS, students.student_id uniquely\nidentifies each student.\nSuperadmin and Staff only. Student/applicant is treated as an\nadmission record, not a final login role.\n\nFinal user roles\n\nA. DBMS and MySQL Foundations\nQ1. What is the main focus of your project?\nAnswer: The main focus of ADAMS is to manage admission documents and applicant/student records using a\nrelational database.\nDefense line: ADAMS helps the office record, search, monitor, print, and archive admission records through a\ndatabase-driven system.\nMust remember: ADAMS = admission records + document requirements + database tracking.\n\nQ2. Why is ADAMS considered a database project?\nAnswer: It is considered a database project because the main features depend on tables, keys, relationships, and\nSQL queries.\nDefense line: The system is not just a form; it depends on tables such as students, student_requirements,\nrequirement_types, users, logs, and archived_students.\nMust remember: Always connect your answer to tables and relationships.\n\nQ3. What is a database?\nAnswer: A database is an organized collection of related data that can be stored, searched, updated, and managed.\nDefense line: In ADAMS, the database stores applicant records, requirement status, user accounts, logs, and\narchived student records.\nMust remember: Database = organized data.\n\nQ4. What is a DBMS?\nAnswer: A DBMS is software used to create, manage, secure, and retrieve records from a database.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nDefense line: MySQL/MariaDB is the DBMS used to manage the ADAMS database.\nMust remember: DBMS = software that manages the database.\n\nQ5. Why did you use MySQL?\nAnswer: MySQL is suitable because it supports relational tables, primary keys, foreign keys, joins, constraints, and\nSQL reporting.\nDefense line: Because ADAMS uses related data, MySQL is appropriate for managing structured admission\nrecords.\nMust remember: MySQL fits relational data.\n\nQ6. What type of DBMS is MySQL?\nAnswer: MySQL is an RDBMS, or Relational Database Management System.\nDefense line: It stores data in related tables, which matches the design of ADAMS.\nMust remember: MySQL = RDBMS.\n\nQ7. What is a relational database?\nAnswer: A relational database stores data in tables and connects those tables using keys.\nDefense line: For example, students are connected to student_categories, and requirements are connected\nthrough student_requirements.\nMust remember: Relational = tables connected by keys.\n\nQ8. Why is a relational database suitable for ADAMS?\nAnswer: ADAMS has many related records: students, categories, requirements, uploaded files, users, logs, and\narchives.\nDefense line: A relational design prevents scattered data and allows accurate tracking of requirements per\nstudent.\nMust remember: ADAMS data is connected, so relational database is appropriate.\n\nQ9. What is SQL?\nAnswer: SQL means Structured Query Language. It is used to retrieve, insert, update, delete, and manage database\ndata.\nDefense line: We use SQL to pull student records, check requirements, count records, and generate monitoring\nreports.\nMust remember: SQL is the language of the database.\n\nQ10. What are the main SQL command categories?\nAnswer: The main categories are DDL, DML, DQL, DCL, and TCL.\nDefense line: For our project defense, the most common commands are CREATE, SELECT, INSERT, UPDATE,\nDELETE, and JOIN.\nMust remember: DDL = structure, DML = data changes, DQL = SELECT.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nB. SQL Command Categories and Database Objects\nQ11. What is DDL?\nAnswer: DDL means Data Definition Language. It defines or changes database structures.\nDefense line: Examples are CREATE TABLE, ALTER TABLE, and DROP TABLE.\nMust remember: DDL changes structure.\n\nQ12. What is DML?\nAnswer: DML means Data Manipulation Language. It changes the records inside tables.\nDefense line: Examples are INSERT, UPDATE, and DELETE.\nMust remember: DML changes data.\n\nQ13. What is DQL?\nAnswer: DQL means Data Query Language. It retrieves records from the database.\nDefense line: The main DQL command is SELECT.\nMust remember: DQL retrieves data.\n\nQ14. What is a table?\nAnswer: A table stores related data in rows and columns.\nDefense line: For example, the students table stores applicant/student information.\nMust remember: Table = container of related records.\n\nQ15. What is a field or column?\nAnswer: A field or column is one data attribute in a table.\nDefense line: For example, first_name, last_name, email, and category_id are fields in the students table.\nMust remember: Column = type of information.\n\nQ16. What is a record or row?\nAnswer: A record or row is one complete entry in a table.\nDefense line: One applicant in the students table is one record.\nMust remember: Row = one complete item/person/transaction.\n\nQ17. What is a primary key?\nAnswer: A primary key uniquely identifies each record in a table.\nDefense line: In ADAMS, students.student_id uniquely identifies each student record.\nMust remember: Primary key = unique ID.\n\nQ18. What is a foreign key?\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nAnswer: A foreign key links one table to another table.\nDefense line: In ADAMS, students.category_id links a student to student_categories.category_id.\nMust remember: Foreign key = connection key.\n\nQ19. What is a unique key?\nAnswer: A unique key prevents duplicate values in a field or combination of fields.\nDefense line: For example, users.username must be unique so two users cannot use the same username.\nMust remember: Unique key = no duplicate value.\n\nQ20. What is referential integrity?\nAnswer: Referential integrity keeps table relationships valid and consistent.\nDefense line: For example, a student category assigned to a student should exist in the student_categories table.\nMust remember: Referential integrity protects relationships.\n\nC. Business Rules, Relationships, and Cardinality\nQ21. What are business rules in database design?\nAnswer: Business rules describe how records should relate based on the actual process of the organization.\nDefense line: In ADAMS, one business rule is that a student belongs to one category when classified.\nMust remember: Business rules become relationships.\n\nQ22. Give one business rule in ADAMS.\nAnswer: Each student/applicant belongs to one student category when classified.\nDefense line: This is shown by the relationship between student_categories and students.\nMust remember: Safe example: one category can have many students.\n\nQ23. Why do different student categories need different requirements?\nAnswer: Different admission categories may have different document checklists.\nDefense line: For example, a transferee may need records that are different from a freshman applicant.\nMust remember: Different category = different checklist.\n\nQ24. What table handles category-based requirements?\nAnswer: The category_requirements table handles the requirements assigned to each category.\nDefense line: It connects student_categories and requirement_types.\nMust remember: category_requirements = checklist setup table.\n\nQ25. Why do you need category_requirements?\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nAnswer: It avoids repeating requirement lists and supports a many-to-many relationship between categories and\nrequirement types.\nDefense line: One category can have many requirements, and one requirement can be required by many\ncategories.\nMust remember: Bridge table prevents repetition.\n\nQ26. What is a bridge table?\nAnswer: A bridge table connects two tables that have a many-to-many relationship.\nDefense line: In ADAMS, category_requirements is the bridge table between student_categories and\nrequirement_types.\nMust remember: Bridge table = connector table.\n\nQ27. What is cardinality?\nAnswer: Cardinality describes how many records in one table can relate to records in another table.\nDefense line: Examples are one-to-many and many-to-many relationships in the ERD.\nMust remember: Cardinality = how many records are connected.\n\nQ28. Give one example of a one-to-many relationship in ADAMS.\nAnswer: One student category can classify many students.\nDefense line: student_categories to students is a one-to-many relationship.\nMust remember: 1 category, many students.\n\nQ29. Give one example of a many-to-many relationship in ADAMS.\nAnswer: Student categories and requirement types are many-to-many.\nDefense line: This is implemented using category_requirements.\nMust remember: Many categories, many requirements.\n\nQ30. What table stores the actual student requirement status?\nAnswer: The student_requirements table stores the actual requirement status of each student.\nDefense line: It stores fields such as student_id, requirement_id, file_name, uploaded_by, status, upload_date,\nand uploaded_at.\nMust remember: student_requirements = actual monitoring table.\n\nD. Normalization and Data Anomalies\nQ31. What is normalization?\nAnswer: Normalization is the process of organizing data into separate related tables to reduce redundancy and\nimprove consistency.\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nDefense line: ADAMS separates students, categories, requirement types, student requirements, users, logs, and\narchives.\nMust remember: Normalization = clean table design.\n\nQ32. Why did you normalize your database?\nAnswer: We normalized the database to avoid duplicate data, repeating groups, and update errors.\nDefense line: Instead of placing all requirements in one student row, ADAMS stores requirements in separate\nrelated tables.\nMust remember: Normalization avoids redundancy.\n\nQ33. What is UNF?\nAnswer: UNF means Unnormalized Form. It contains repeating groups or non-atomic values.\nDefense line: An example is one row containing Requirement1, Status1, Requirement2, and Status2.\nMust remember: UNF = messy/manual logbook style.\n\nQ34. How did ADAMS apply 1NF?\nAnswer: ADAMS applied 1NF by removing repeating groups and making values atomic.\nDefense line: Each requirement is stored as a separate record instead of many requirement columns in one row.\nMust remember: 1NF = one value per field.\n\nQ35. How did ADAMS apply 2NF?\nAnswer: ADAMS applied 2NF by separating data based on its purpose.\nDefense line: Student data, category data, requirement type data, and requirement status data are placed in\nseparate tables.\nMust remember: 2NF = separate tables by purpose.\n\nQ36. How did ADAMS apply 3NF?\nAnswer: ADAMS applied 3NF by separating supporting data such as users, activity logs, print logs, password reset\ntokens, documents, and archived records.\nDefense line: This avoids storing user, print, and archive details repeatedly inside the students table.\nMust remember: 3NF = remove indirect dependencies.\n\nQ37. What problem happens if you use only one big table?\nAnswer: One big table causes duplicated data, hard updates, missing records, and accidental deletion of important\ninformation.\nDefense line: For ADAMS, this would make requirement tracking confusing and inconsistent.\nMust remember: One big table = redundancy and anomalies.\n\nQ38. What is an update anomaly?\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nAnswer: An update anomaly happens when the same data appears in multiple places and not all copies are\nupdated.\nDefense line: Example: changing a requirement name in many repeated rows.\nMust remember: Update anomaly = inconsistent edits.\n\nQ39. What is an insertion anomaly?\nAnswer: An insertion anomaly happens when you cannot add one type of data without another unrelated data.\nDefense line: Example: unable to add a new requirement type unless a student record already exists.\nMust remember: Insertion anomaly = cannot insert independently.\n\nQ40. What is a deletion anomaly?\nAnswer: A deletion anomaly happens when deleting a record also removes important related information by\naccident.\nDefense line: Example: deleting a student accidentally losing the only record of a requirement if the database is\nnot normalized.\nMust remember: Deletion anomaly = accidental data loss.\n\nE. ERD, EERD, SQL Checking, and SQL vs NoSQL\nQ41. What is an ERD?\nAnswer: An ERD, or Entity Relationship Diagram, shows the database entities/tables, attributes, keys, and\nrelationships.\nDefense line: Our ERD shows tables such as students, users, requirement_types, student_requirements,\ndocuments, logs, and archives.\nMust remember: ERD = database map.\n\nQ42. What is an EERD?\nAnswer: An EERD, or Enhanced Entity Relationship Diagram, extends ERD by showing enhanced concepts like\nspecialization and generalization.\nDefense line: In ADAMS, it shows USER specialization and student classification.\nMust remember: EERD = enhanced ERD.\n\nQ43. What is the difference between ERD and EERD?\nAnswer: ERD shows basic entities and relationships, while EERD shows enhanced modeling concepts such as\nsubtypes.\nDefense line: Our EERD explains that system users are specialized into Superadmin and Staff.\nMust remember: ERD = basic; EERD = enhanced.\n\nQ44. What is specialization in EERD?\nAnswer: Specialization means dividing a general entity into more specific subtypes.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nDefense line: In ADAMS, USER is specialized into SUPERADMIN_USER and STAFF_USER only.\nMust remember: Specialization = general to specific.\n\nQ45. Who are the system users in ADAMS?\nAnswer: The final system users are Superadmin and Staff only.\nDefense line: Superadmin manages system-wide accounts, settings, categories, requirements, logs, and reports.\nStaff handles routine searching, updating, uploading, monitoring, printing, and archiving subject to granted access.\nMust remember: Applicants/students are records, not final login roles.\n\nQ46. What is the purpose of the data dictionary?\nAnswer: The data dictionary explains every table field, data type, key/constraint, and meaning.\nDefense line: It helps verify that the ERD and SQL schema are consistent.\nMust remember: Data dictionary = table field guide.\n\nQ47. What SQL command will you use to view all tables?\nAnswer: Use SHOW TABLES;\nDefense line: This lets us confirm all ADAMS tables are available in the selected database.\nMust remember: SHOW TABLES = list tables.\n\nQ48. What SQL command will you use to check table structure?\nAnswer: Use DESCRIBE table_name;\nDefense line: Example: DESCRIBE students; or DESCRIBE student_requirements;\nMust remember: DESCRIBE = check columns.\n\nQ49. What SQL command will you use to retrieve student records?\nAnswer: Use SELECT. Example: SELECT * FROM students;\nDefense line: For cleaner output, we can select specific columns such as student_id, student_name, email, and\ncategory_id.\nMust remember: SELECT = retrieve data.\n\nQ50. Why did you choose SQL/MySQL instead of NoSQL?\nAnswer: We chose SQL/MySQL because ADAMS uses structured and related data that needs keys, joins,\nconstraints, and accurate reporting.\nDefense line: NoSQL is useful for flexible/unstructured data, but ADAMS is better represented as relational\ntables.\nMust remember: Relational data = SQL/MySQL.\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nBonus: Quick SQL Checking Commands\nHow to use: These are quick commands for practice or demo. They are generic starter commands on purpose, but they use\nthe correct ADAMS table and column names.\n\nSelect database and show tables\nUSE doc_admission_db;\nSHOW TABLES;\n\nCheck table structure\nDESCRIBE users;\nDESCRIBE students;\nDESCRIBE student_requirements;\nDESCRIBE documents;\n\nRetrieve all students\nSELECT *\nFROM students;\n\nView students with categories\nSELECT s.student_id, s.student_name, c.category_name\nFROM students s\nLEFT JOIN student_categories c\nON c.category_id = s.category_id\nORDER BY s.student_name;\n\nView requirements per category\nSELECT c.category_name, r.requirement_name\nFROM category_requirements cr\nJOIN student_categories c\nON c.category_id = cr.category_id\nJOIN requirement_types r\nON r.requirement_id = cr.requirement_id\nORDER BY c.category_name, r.requirement_name;\n\nCheck missing or pending requirements\nSELECT s.student_id, s.student_name, c.category_name,\nr.requirement_name,\nCOALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c\nON c.category_id = s.category_id\nJOIN category_requirements cr\nON cr.category_id = s.category_id\nJOIN requirement_types r\nON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL\nOR sr.status IS NULL\nOR sr.status IN ('PENDING','INSUFFICIENT','REJECTED')\nORDER BY s.student_name, r.requirement_name;\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS DATABASE PROJECT\n\nCount records per major table\nSELECT 'students' AS table_name, COUNT(*) AS total FROM students\nUNION ALL\nSELECT 'student_categories', COUNT(*) FROM student_categories\nUNION ALL\nSELECT 'requirement_types', COUNT(*) FROM requirement_types\nUNION ALL\nSELECT 'student_requirements', COUNT(*) FROM student_requirements\nUNION ALL\nSELECT 'users', COUNT(*) FROM users\nUNION ALL\nSELECT 'activity_log', COUNT(*) FROM activity_log\nUNION ALL\nSELECT 'print_logs', COUNT(*) FROM print_logs\nUNION ALL\nSELECT 'archived_students', COUNT(*) FROM archived_students;\n\nEmergency Answer Kapag Hindi Mo Alam ang Sagot\nSafe answer: Since our subject is Information Management / DBMS, our focus is the proper application of database design:\nentities, attributes, keys, relationships, normalization, SQL queries, and data integrity in ADAMS.\n\nPrepared for ADAMS review and oral defense practice only\n\n\f",
    "sql": "ADAMS SQL Reviewer\n\nADAMS SQL Reviewer\nBeginner MySQL Practice Guide for Possible Panel Questions\n\nImportant clarification: Generic starter SQL examples are intentionally kept because they help you answer simple panel\nrequests such as SELECT, WHERE, COUNT, JOIN, UPDATE, and DESCRIBE. The updates only correct table/column names\nand final user-role wording.\n\nWorking Local Setup\n\nValue\n\nSystem URL\nMySQL Workbench Host\nMySQL Workbench Port\nDatabase\nCommon local username/password\nFinal user roles for defense\nSchema reminder\n\nhttp://localhost:8090/doc_ad_sys\n127.0.0.1\n3307\ndoc_admission_db\nroot / Root12345!\nSuperadmin and Staff only\nActual DB dump may still show old legacy role values, but final\nscope is Superadmin and Staff.\n\nLocked ADAMS Tables and Key Attributes\nTable\n\nCorrect attributes to remember\n\nusers\n\nuser_id, username, password, email, full_name, phone, is_active,\ncreated_at, last_login, role\nstudent_id, user_id, student_name, last_name, first_name,\nmiddle_name, birth_date, email, category_id, remarks, phone\ncategory_id, category_name, sort_order\nrequirement_id, requirement_name, description\ncategory_id, requirement_id\nstudent_requirement_id, student_id VARCHAR(20),\nrequirement_id, file_name, file_path, file_content, mime_type,\nfile_size, uploaded_by, status, upload_date, uploaded_at\ndocument_id, student_id VARCHAR(20), document_type,\nfile_path, tracking_number, status, date_submitted, remarks,\nstudent_pk\nlog_id, user_id, username, action, module, description, log_time\nlog_id, ref_no, student_id, document_type, printed_by,\nprinted_by_name, printed_at, campus_code\nid, user_id, token, expires_at, used, created_at\narchive_id, student_id, student_name, last_name, first_name,\nmiddle_name, email, phone, birth_date, category_id, remarks,\narchived_at, archived_by\n\nstudents\nstudent_categories\nrequirement_types\ncategory_requirements\nstudent_requirements\ndocuments\nactivity_log\nprint_logs\npassword_reset_tokens\narchived_students\n\nSQL Keyword Cheat Sheet\nKeyword\n\nMeaning\n\nExample Use\n\nSELECT\nFROM\nWHERE\nLIKE\nORDER BY\nLIMIT\nCOUNT\nGROUP BY\nHAVING\nJOIN\nLEFT JOIN\n\nDisplays/retrieves data\nIdentifies the table source\nFilters rows\nSearches text pattern\nSorts results\nLimits number of rows\nCounts rows\nGroups records for summary\nFilters grouped results\nCombines related tables\nShows all left-table rows even without\n\nSELECT * FROM students;\nFROM users\nWHERE role = 'staff'\nLIKE '%Santos%'\nORDER BY last_name ASC\nLIMIT 10\nCOUNT(*)\nGROUP BY category_id\nHAVING COUNT(*) > 1\nstudents JOIN student_categories\nstudents LEFT JOIN documents\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nKeyword\n\nMeaning\n\nExample Use\n\nINSERT\nUPDATE\nDELETE\nCREATE\nALTER\n\nmatches\nAdds new record\nEdits existing record\nRemoves records\nCreates database/table\nModifies table structure\n\nINSERT INTO users ...\nUPDATE users SET ...\nDELETE FROM users WHERE ...\nCREATE TABLE ...\nALTER TABLE users ADD COLUMN ...\n\n1. Quick Start and Safe Checking\nConnect to local MySQL in Docker\ndocker exec -it adams-mysql mysql -uroot -p'Root12345!' doc_admission_db\n\nHelpful note: Use this only if your local Docker setup uses the same container name and password.\n\nUse the ADAMS database\nUSE doc_admission_db;\n\nHelpful note: This selects the database before running SQL queries.\n\nShow all tables\nSHOW TABLES;\n\nHelpful note: Use this first to confirm the database was imported.\n\nCheck table structure\nDESCRIBE students;\nDESCRIBE student_requirements;\nDESCRIBE documents;\n\nHelpful note: Use DESCRIBE if the panel asks about columns or if a query gives an unknown column error.\n\n2. Basic SELECT Queries - Generic Starter Practice\nDisplay all users\nSELECT *\nFROM users;\n\nHelpful note: SELECT * is okay for checking the table quickly. For reports, select only needed columns.\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nDisplay all students\nSELECT *\nFROM students;\n\nHelpful note: This shows all applicant/student records.\n\nDisplay selected user columns only\nSELECT user_id, username, full_name, role, is_active\nFROM users;\n\nHelpful note: This is cleaner than SELECT *.\n\nDisplay only Superadmin and Staff users\nSELECT user_id, username, full_name, role\nFROM users\nWHERE role IN ('superadmin','staff')\nORDER BY role, username;\n\nHelpful note: Use this because final ADAMS user roles are Superadmin and Staff only.\n\nSearch student by last name\nSELECT *\nFROM students\nWHERE last_name LIKE '%Santos%';\n\nHelpful note: LIKE is useful for search bars. Percent sign means any characters before or after.\n\nSort students alphabetically\nSELECT student_id, last_name, first_name, email\nFROM students\nORDER BY last_name ASC, first_name ASC;\n\nHelpful note: ASC means A to Z. DESC means Z to A.\n\nShow latest 10 activity logs\nSELECT *\nFROM activity_log\nORDER BY log_time DESC\nLIMIT 10;\n\nHelpful note: Correct ADAMS column is log_time, not created_at.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\n3. Counting and Summary Queries\nCount total students\nSELECT COUNT(*) AS total_students\nFROM students;\n\nHelpful note: Useful for dashboard totals.\n\nCount total users by final role\nSELECT role, COUNT(*) AS total_users\nFROM users\nWHERE role IN ('superadmin','staff')\nGROUP BY role;\n\nHelpful note: Shows total Superadmin and Staff users.\n\nCount students per category\nSELECT c.category_name, COUNT(s.student_id) AS total_students\nFROM student_categories c\nLEFT JOIN students s\nON s.category_id = c.category_id\nGROUP BY c.category_id, c.category_name\nORDER BY c.sort_order, c.category_name;\n\nHelpful note: Uses LEFT JOIN so categories with zero students can still appear.\n\nCount submitted document records per student\nSELECT s.student_id, s.student_name, COUNT(d.document_id) AS total_documents\nFROM students s\nLEFT JOIN documents d\nON d.student_pk = s.student_id\nGROUP BY s.student_id, s.student_name\nORDER BY s.student_name;\n\nHelpful note: Correct link is documents.student_pk to students.student_id.\n\nFind duplicate usernames\nSELECT username, COUNT(*) AS total\nFROM users\nGROUP BY username\nHAVING COUNT(*) > 1;\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nHelpful note: HAVING filters grouped results.\n\n4. JOIN Queries - Pulling Related ADAMS Data\nShow students with their category\nSELECT s.student_id, s.student_name, s.email, c.category_name\nFROM students s\nLEFT JOIN student_categories c\nON c.category_id = s.category_id\nORDER BY s.student_name;\n\nHelpful note: This is a common defense/demo query.\n\nShow requirements required per category\nSELECT c.category_name, r.requirement_name, r.description\nFROM category_requirements cr\nJOIN student_categories c\nON c.category_id = cr.category_id\nJOIN requirement_types r\nON r.requirement_id = cr.requirement_id\nORDER BY c.category_name, r.requirement_name;\n\nHelpful note: Uses the bridge table category_requirements.\n\nShow student requirements with requirement names\nSELECT s.student_id, s.student_name, rt.requirement_name, sr.status, sr.file_name, sr.uploaded_at\nFROM students s\nJOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nJOIN requirement_types rt\nON rt.requirement_id = sr.requirement_id\nORDER BY s.student_name, rt.requirement_name;\n\nHelpful note: Correct field is requirement_id, not requirement_type_id.\n\nShow students with submitted documents\nSELECT s.student_id, s.student_name, d.document_id, d.document_type, d.file_path, d.status,\nd.date_submitted\nFROM students s\nLEFT JOIN documents d\nON d.student_pk = s.student_id\nORDER BY s.student_name, d.date_submitted DESC;\n\nHelpful note: Correct document date field is date_submitted.\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nShow students with no document record\nSELECT s.student_id, s.student_name\nFROM students s\nLEFT JOIN documents d\nON d.student_pk = s.student_id\nWHERE d.document_id IS NULL;\n\nHelpful note: This is a missing-record query.\n\nShow print logs with student and user\nSELECT pl.ref_no, s.student_name, pl.document_type, u.full_name AS printed_by, pl.printed_at\nFROM print_logs pl\nLEFT JOIN students s\nON s.student_id = pl.student_id\nLEFT JOIN users u\nON u.user_id = pl.printed_by\nORDER BY pl.printed_at DESC;\n\nHelpful note: Correct print log date field is printed_at.\n\n5. INSERT, UPDATE, DELETE - Practice with Safety\nInsert a new Staff user\nINSERT INTO users\n(username, password, email, full_name, phone, role, is_active)\nVALUES\n('staff1', 'staff123', 'staff1@example.com', 'Staff One', '', 'staff', 1);\n\nHelpful note: Use staff or superadmin only for final role explanation.\n\nUpdate user email\nUPDATE users\nSET email = 'newemail@example.com'\nWHERE username = 'staff1';\n\nHelpful note: Always use WHERE in UPDATE.\n\nDeactivate a user instead of deleting\nUPDATE users\nSET is_active = 0\nWHERE username = 'staff1';\n\nHelpful note: Deactivation is safer than deleting historical user records.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nDelete a specific user\nDELETE FROM users\nWHERE username = 'staff1';\n\nHelpful note: Before DELETE, run SELECT with the same WHERE condition.\n\nSafety check before UPDATE or DELETE\nSELECT *\nFROM users\nWHERE username = 'staff1';\n\nHelpful note: If SELECT returns the correct row, then run UPDATE or DELETE.\n\n6. Table Structure Practice\nCreate a simple sample table\nCREATE TABLE sample_users (\nuser_id INT AUTO_INCREMENT PRIMARY KEY,\nusername VARCHAR(50) NOT NULL,\npassword VARCHAR(255) NOT NULL,\nemail VARCHAR(100),\nrole VARCHAR(20),\ncreated_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);\n\nHelpful note: This is generic practice for DDL, not part of final ADAMS schema.\n\nAdd a new sample column\nALTER TABLE sample_users\nADD COLUMN phone VARCHAR(20);\n\nHelpful note: ALTER TABLE changes structure.\n\nModify a sample column size\nALTER TABLE sample_users\nMODIFY COLUMN email VARCHAR(150);\n\nHelpful note: MODIFY COLUMN changes data type or size.\n\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nDrop/remove a sample column\nALTER TABLE sample_users\nDROP COLUMN phone;\n\nHelpful note: DROP COLUMN permanently removes the column and its data.\n\nForeign key example using actual ADAMS relationship\nALTER TABLE documents\nADD CONSTRAINT fk_documents_student_pk_example\nFOREIGN KEY (student_pk)\nREFERENCES students(student_id);\n\nHelpful note: Use student_pk for documents table FK example, not documents.student_id.\n\n7. Advanced ADAMS Query Patterns\nMissing or pending requirements\nSELECT s.student_id, s.student_name, c.category_name, r.requirement_name,\nCOALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c\nON c.category_id = s.category_id\nJOIN category_requirements cr\nON cr.category_id = s.category_id\nJOIN requirement_types r\nON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL\nOR sr.status IS NULL\nOR sr.status IN ('PENDING','INSUFFICIENT','REJECTED')\nORDER BY s.student_name, r.requirement_name;\n\nHelpful note: This compares required documents against actual submissions.\n\nRequirement completion summary per student\nSELECT s.student_id, s.student_name, c.category_name,\nCOUNT(cr.requirement_id) AS required_count,\nCOUNT(sr.student_requirement_id) AS recorded_count,\nSUM(CASE WHEN sr.file_name IS NOT NULL THEN 1 ELSE 0 END) AS uploaded_count,\nSUM(CASE WHEN sr.status IN ('SUBMITTED','VERIFIED','APPROVED') THEN 1 ELSE 0 END) AS\ncompleted_count,\nCOUNT(cr.requirement_id) - COUNT(sr.student_requirement_id) AS missing_count\nFROM students s\nJOIN student_categories c\nON c.category_id = s.category_id\nJOIN category_requirements cr\nON cr.category_id = c.category_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\nAND sr.requirement_id = cr.requirement_id\nGROUP BY s.student_id, s.student_name, c.category_name\nORDER BY missing_count DESC, s.student_name;\n\nHelpful note: This is good for dashboard/report explanation.\n\nLatest submitted document per student\nSELECT d.*\nFROM documents d\nINNER JOIN (\nSELECT student_pk, MAX(date_submitted) AS latest_submission\nFROM documents\nGROUP BY student_pk\n) latest\nON d.student_pk = latest.student_pk\nAND d.date_submitted = latest.latest_submission;\n\nHelpful note: Uses date_submitted from documents.\n\nPending requirement aging report\nWITH requirement_status AS (\nSELECT s.student_id, s.student_name, r.requirement_name, sr.status, sr.uploaded_at,\nROW_NUMBER() OVER (\nPARTITION BY s.student_id, r.requirement_id\nORDER BY COALESCE(sr.uploaded_at, '1900-01-01') DESC\n) AS rn\nFROM students s\nJOIN category_requirements cr\nON cr.category_id = s.category_id\nJOIN requirement_types r\nON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = r.requirement_id\n)\nSELECT student_id, student_name, requirement_name,\nCOALESCE(status, 'MISSING') AS status_result,\nuploaded_at,\nCASE WHEN uploaded_at IS NULL THEN NULL\nELSE DATEDIFF(CURDATE(), DATE(uploaded_at))\nEND AS days_since_upload\nFROM requirement_status\nWHERE rn = 1\nAND (status IS NULL OR status = 'PENDING')\nORDER BY student_name, requirement_name;\n\nHelpful note: Uses CTE and ROW_NUMBER for latest status checking.\n\nPossible Oral/Exam Questions and Short Answers\nQuestion\n\nSimple Answer\n\nWhat is SELECT used for?\nWhat is WHERE used for?\n\nTo retrieve/display records from one or more tables.\nTo filter rows based on a condition.\nPrepared for ADAMS review and oral defense practice only\n\n\fADAMS SQL Reviewer\n\nQuestion\n\nSimple Answer\n\nWhat is LIKE used for?\nWhat is ORDER BY used for?\nWhat is GROUP BY used for?\n\nTo search text using a pattern such as %keyword%.\nTo sort query results ascending or descending.\nTo group records and calculate summaries like COUNT, SUM, or\nAVG.\nWHERE filters rows before grouping; HAVING filters grouped\nresults.\nINNER JOIN returns only matching records; LEFT JOIN returns\nall records from the left table even without matches.\nTo uniquely identify each row in a table.\nTo connect related tables and maintain data consistency.\nIt can show unnecessary columns and can be less efficient on\nlarge tables.\nWithout WHERE, all records may be changed or deleted.\nRun DESCRIBE table_name; then correct the column name.\n\nDifference between WHERE and HAVING?\nDifference between INNER JOIN and LEFT JOIN?\nWhy use primary key?\nWhy use foreign key?\nWhy avoid SELECT * in reports?\nWhy should UPDATE/DELETE have WHERE?\nWhat should you do if there is an unknown column error?\n\nCommon Errors and Quick Fixes\nError / Problem\n\nMeaning\n\nFix\n\nUnknown column\n\nColumn name does not exist in that table.\n\nTable does not exist\n\nWrong database or incomplete import.\n\nAccess denied\nCannot connect to MySQL\nEmpty dashboard\nInvalid login\n\nWrong username/password.\nContainer/server may not be running.\nNo records yet or imported data incomplete.\nWrong user record or app connects to wrong\ndatabase.\n\nRun DESCRIBE table_name; and adjust the\nquery.\nRun SHOW TABLES; and check USE\ndoc_admission_db;\nUse your local MySQL credentials.\nStart the MySQL container/server.\nCheck students and related tables.\nCheck users table and database connection\nfile.\n\nPractice Checklist\n• Practice SELECT, WHERE, LIKE, ORDER BY, and LIMIT first.\n• Practice COUNT, GROUP BY, and HAVING next.\n• Practice JOIN queries after you understand primary keys and foreign keys.\n• Always run DESCRIBE before writing JOIN queries if you are not sure of column names.\n• Before UPDATE or DELETE, test with SELECT first.\n• Explain each query in your own words: what table, what condition, and what output.\n\nPrepared for ADAMS review and oral defense practice only\n\n\f",
    "normalization": "POLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\nADAMS Normalization Before-and-After Backup Guide\nUNF to 1NF to 2NF to 3NF | What changed, why it changed, and how to explain it during defense\nMain point: For normalization, a professor usually expects the database/table transformation, not the system UI. The UI screenshots can support the presentation, but the real\nevidence is the movement from one wide, repetitive table to several related database tables.\n\n1. What the Professor May Be Looking For\nA normalization discussion should clearly answer three questions:\n Before: What was wrong with the original table or logbook-style record?\n After: What tables were created or separated at each normalization stage?\n Reason: Why did the change improve the database design and the ADAMS system?\nFor ADAMS, the concern is not only appearance. The concern is that student information, category data, requirements, statuses, file uploads, users, logs, print history,\npassword reset records, and archive history should not be mixed into one table. A cleaner relational design is needed so the system can search, monitor, verify, print, and\narchive records accurately.\n\n2. Quick Visual Flow: What Was Updated\nStage\n\nDatabase View\n\nUNF\n\nOne wide monitoring table\n\n1NF\n\nOne requirement per row\n\n2NF\n\nCore tables separated\n\n3NF\n\nOperational/support tables separated\n\nAno ang Nabago / What Changed\nStudent details + category + multiple\nRequirement/Status/File columns in one row\nRequirement1/Requirement2 columns become\nmultiple rows\nstudents, student_categories,\nrequirement_types, category_requirements,\nstudent_requirements\nusers, documents, activity_log, print_logs,\npassword_reset_tokens, archived_students\n\nConcern Fixed\nRepeating groups, redundant data, difficult\ntracking\nAtomic values; no repeating requirement\ncolumns\nLess duplication; correct checklist per category\nAudit trail, security, reporting, archiving,\nmaintainability\n\n3. UNF - Original Unnormalized View\nIn UNF, the record looks like a manual spreadsheet or logbook. It stores multiple requirements inside one student row. This is the “before” view.\nStudent Name\nReyes, Ana\nSantos, Mark\n\nCategory\nFreshman\nTransferee\n\nRequirement 1\nBirth Certificate\nTranscript\n\nStatus 1\nSUBMITTED\nPENDING\n\nFile 1\nbirth.pdf\nN/A\n\nRequirement 2\nValid ID\nGood Moral\n\nStatus 2\nPENDING\nSUBMITTED\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\nFile 2\nN/A\ngoodmoral.pdf\n\nRemarks\nFor verification\nIncomplete\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\nStage\n\nConcern Before Update\nRequirements are stored as repeated columns:\nRequirement 1, Status 1, File 1, Requirement\n2, Status 2, File 2. If a category has more\nrequirements, more columns must be added.\n\nUNF\n\nAno ang Nabago / What Changed\nIdentified that the record is too wide and mixes\nstudent profile, category, requirement list,\nrequirement status, and upload file data in one\nrow.\n\nWhy It Needed to Change / Result\nThis needed to change because the design\ncreates duplicate data, hard-to-maintain\ncolumns, and difficulty checking missing\nrequirements.\n\nDefense line: “The UNF problem is that the database acts like a spreadsheet. It is not flexible because requirements repeat as columns.”\n\n4. 1NF - Repeating Groups Removed\nIn 1NF, each field should contain one value only, and repeating groups must be removed. The change is that each requirement is now placed in a separate row.\nStudent Name\nReyes, Ana\nReyes, Ana\n\nCategory\nFreshman\nFreshman\n\nRequirement\nBirth Certificate\nValid ID\n\nStatus\nSUBMITTED\nPENDING\n\nbirth.pdf\nN/A\n\nadmin\nadmin\n\nSantos, Mark\nSantos, Mark\n\nTransferee\nTransferee\n\nTranscript\nGood Moral\n\nPENDING\nSUBMITTED\n\nN/A\ngoodmoral.pdf\n\nregistrar\nregistrar\n\nStage\n1NF\n\nFile Name\n\nUploaded By\n\nConcern Before Update\n\nAno ang Nabago / What Changed\n\nUNF contains repeating requirement columns\nand non-atomic groups.\n\nConverted Requirement 1/2, Status 1/2, and\nFile 1/2 into separate rows. Each row now\nrepresents one student requirement record.\n\nUpload Date\n2026-06-20\n\n2026-06-20\n\nWhy It Needed to Change / Result\nThis fixes repeating groups and makes the\nrequirement/status/file values atomic.\nHowever, student name and category are still\nrepeated across rows, so further normalization\nis needed.\n\nDefense line: “In 1NF, we did not yet create all final tables. We first corrected the repeated columns by making one requirement per row.”\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n5. 2NF - Core Data Separated by Purpose\nIn 2NF, the repeated rows from 1NF are separated into tables based on their real purpose. Student profile data should be stored once. Category names should be stored\nonce. Requirement names should be stored once. The student requirement status should be stored separately because it changes per student and per requirement.\n2NF Table\n\nPrimary Key\n\nWhat Was Moved Here\nStudent profile fields: name, email, phone,\nbirth_date, category_id\n\nDefines which requirements apply to each\ncategory\nstudent_id, requirement_id, status, file_name,\nfile_path, uploaded_by, upload_date\n\nWhy It Needed to Be Separated\nStudent identity should be stored once and not\nrepeated for every requirement.\nCategory labels like Freshman or Transferee\nshould be reusable.\nRequirement names like Birth Certificate or Valid\nID should be stored once.\nThis bridge table solves the problem of different\nchecklists per category.\nThis records the actual status and upload details\nper student requirement.\n\nAno ang Nabago / What Changed\nSeparated student data, category data,\nrequirement master list, category checklist\nmapping, and actual student requirement\nrecords.\n\nWhy It Needed to Change / Result\nThis reduces redundancy and allows ADAMS\nto apply the correct checklist per student\ncategory without rewriting the same\nrequirements repeatedly.\n\nstudents\n\nstudent_id\n\nstudent_categories\n\ncategory_id\n\ncategory_name, sort_order\n\nrequirement_types\n\nrequirement_id\n\nrequirement_name, description\n\ncategory_requirements\n\ncategory_id + requirement_id\n\nstudent_requirements\n\nstudent_requirement_id\n\nStage\n2NF\n\nConcern Before Update\nAfter 1NF, student and category details are still\nrepeated in many rows. Requirement names\nare also repeated for every student.\n\nDefense line: “In 2NF, we separated what belongs to the student, what belongs to the category, what belongs to the requirement master list, and what belongs to the student’s\nactual submitted requirement.”\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n6. 3NF - Final Operational Database Structure\nIn 3NF, data that does not directly belong inside the student profile or student requirement record is moved into separate support tables. This prevents transitive\ndependency and keeps operational information clean.\nusers\n\n3NF Final Table\n\nuser_id, username, role\n\nStores Superadmin and Staff accounts separately\n\nactivity_log\n\nlog_id, user_id\n\nStores actions such as ADD, UPDATE, DELETE,\nUPLOAD, ARCHIVE\n\nprint_logs\n\nlog_id, ref_no\n\nStores printed reports and reference numbers\n\npassword_reset_tokens\n\nid, user_id, token\n\nStores reset tokens, expiry, and usage status\n\ndocuments\n\ndocument_id, student_pk\n\nStores document records linked to a student\n\narchived_students\n\narchive_id, student_id\n\nStores historical snapshots of removed/inactive\nstudent records\n\nWhy It Needed to Be Separated\nUser account data should not be repeated inside\neach student or upload record.\nAccountability is a separate concern from student\nprofile data.\nPrinting history should be recorded without\nchanging student profile fields.\nSecurity and password recovery should be\nseparated from user profile fields.\nDocument metadata can be multiple per student\nand should not be mixed with the student table.\nArchiving preserves history without deleting the\noriginal meaning of records.\n\nConcern Before Update\nOperational data such as user actions, print\nhistory, reset tokens, documents, and archive\nhistory should not be stored inside the main\nstudent table.\n\nAno ang Nabago / What Changed\nMoved these supporting concerns into their\nown tables: users, activity_log, print_logs,\npassword_reset_tokens, documents, and\narchived_students.\n\nWhy It Needed to Change / Result\nThis improves accountability, security,\nreporting, and maintainability. It also supports\nthe system requirements for logs, printing,\nreset tokens, uploads, and archives.\n\nStage\n3NF\n\nKey Fields\n\nAno ang Nabago / What Changed\n\nDefense line: “In 3NF, the database becomes clean because each table stores one main idea. Student records, accounts, logs, printing, documents, and archives are\nseparated but connected through keys.”\n\n7. Before-and-After Summary for Defense\nView\nBefore normalization\nAfter 1NF\nAfter 2NF\nAfter 3NF\nFinal ADAMS database\n\nWhat Changed\nOne logbook-style record can contain student details, category,\nmany requirements, many statuses, many files, and remarks.\nEach requirement becomes a separate row.\nStudent data, categories, requirement types, category checklist,\nand actual student requirement records are separated.\nUsers, logs, print logs, reset tokens, documents, and archived\nstudents are separated into supporting tables.\nA normalized relational database connected by primary keys,\nforeign keys, unique constraints, bridge tables, and logical\nrelationships.\n\nWhy It Matters\nDifficult to search, duplicate student/category/requirement data,\nhard to add new requirements, unclear missing requirements.\nRepeating columns are removed and values become atomic.\nRedundancy is reduced and category-based checklists become\neasier to manage.\nThe database supports accountability, security, report tracking,\npassword recovery, document management, and archiving.\nSupports accurate retrieval, completeness checking,\naccountability, and reporting.\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n8. If Asked: “Is This Based on the Real Database or Just a Sample Table?”\nRecommended answer: “The UNF and 1NF tables are sample views used to explain the normalization process. They show how the original manual-style record was\ntransformed. The 2NF and 3NF tables are aligned with the actual ADAMS database structure, including students, student_categories, requirement_types,\ncategory_requirements, student_requirements, users, activity_log, print_logs, password_reset_tokens, documents, and archived_students.”\n\nImportant distinction:\n\n\n\n\nSystem UI screenshots show that the application works.\nNormalization tables show how the database was designed.\nFor normalization questions, explain the database/table transformation first. Then connect it to the system features like searching, uploading, monitoring, printing, logging, and\narchiving.\n\n9. One-Minute Talk Track\nSay this if questioned: “Our normalization started from a manual logbook-style admission record. In the unnormalized form, one row could contain student details, category\ndetails, and several requirement columns such as Requirement 1, Status 1, File 1, Requirement 2, Status 2, and File 2. The concern was that this structure was repetitive,\ndifficult to maintain, and not flexible when a category requires more documents. In 1NF, we removed the repeating groups by making each requirement a separate row. In 2NF,\nwe separated the data by purpose: students, student categories, requirement types, category requirements, and student requirements. This reduced duplication and allowed the\nsystem to apply the correct checklist per category. In 3NF, we separated operational data such as users, activity logs, print logs, password reset tokens, documents, and\narchived students. This was needed for accountability, security, reporting, and record preservation. The final design is cleaner because each table stores one main idea and is\nconnected through keys and relationships.”\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n10. Possible Panel Questions and Direct Answers\nQuestion\nQ1: What exactly changed from UNF to 1NF?\nQ2: Why was 2NF needed after 1NF?\nQ3: Why do you need category_requirements?\nQ4: Why was 3NF needed?\nQ5: Is the student a login user?\nQ6: What is the benefit of the normalized design?\n\nBest Answer\nThe repeated columns were removed. Instead of Requirement 1, Requirement 2, Status 1, Status\n2, each requirement became a separate row.\nBecause student details, category details, and requirement names were still repeated in the 1NF\nrows. 2NF separated them into their own tables.\nBecause different student categories may require different documents. The bridge table maps\nrequirement types to each category.\nBecause user actions, print history, password tokens, documents, and archive records are\nseparate operational concerns and should not be stored inside the student table.\nNo. In the final scope, only Superadmin and Staff are login users. Students/applicants are\nadmission records maintained by authorized users.\nIt reduces duplicate data, prevents inconsistency, supports missing requirement reports,\nimproves accountability, and makes the database easier to maintain.\n\n11. Quick Checklist Before Presenting\n\n\n\n\n\n\nShow the UNF table first and point out the repeated requirement columns.\nShow the 1NF table and say: “one requirement per row.”\nShow the 2NF table list and say: “we separated data by purpose.”\nShow the 3NF table list and say: “we separated operational and accountability data.”\nUse the phrase: “The sample tables explain the process; the final tables align with our actual ADAMS database.”\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n12. Normalization Has a Required Hierarchy\nNormalization has a required path: UNF -> 1NF -> 2NF -> 3NF. It is not random. Each stage has a rule that must be satisfied before the next stage can be claimed.\nMain defense idea: 3NF already assumes the table is in 1NF and 2NF. If repeating groups still exist, the design is not even 1NF; therefore, it cannot be called 3NF yet.\n\nStage\n\nRequired Before This Stage\n\nWhat This Stage Checks\n\nWhy It Cannot Be Skipped\n\nUNF\n\nNone. This is the raw/problem state.\n\nShows repeated columns, mixed data, and\nspreadsheet-style storage.\n\nUNF is the starting point used to identify what is\nwrong.\n\n1NF\n\nStarts from UNF.\n\nChecks if fields are atomic and if repeating groups\nare removed.\n\nYou cannot discuss 2NF/3NF properly if\nRequirement 1, Requirement 2, Status 1, Status 2\nstill exist.\n\n2NF\n\nMust already satisfy 1NF.\n\nChecks if main data is separated by purpose and\nnot repeatedly dependent on a combined record.\n\nIf student/category/requirement names are still\nrepeated in every row, the design is cleaner but\nstill redundant.\n\n3NF\n\nMust already satisfy 1NF and 2NF.\n\nChecks if indirect or supporting data is separated\nfrom the main records.\n\nIf logs, print history, reset tokens, and archives are\nmixed into the main student record, maintenance\nand accountability become weak.\n\n13. If Asked: Why Cannot We Update Everything Already in 1NF?\nPossible professor question: “Why not separate users, logs, print logs, reset tokens, documents, and archives already in 1NF?”\nBest answer: In actual system design, we may already plan the final tables early. However, in a normalization explanation, each stage proves a different rule. 1NF only proves that\nvalues are atomic and repeating groups are removed. It does not yet prove that all dependencies and supporting records are properly separated.\nSo, even if we already know the final tables, we explain them stage by stage because each stage answers a different database concern.\nQuestion\n\nDirect Answer for Defense\n\nCan we separate everything in 1NF?\n\nWe can plan the final structure early, but academically 1NF only focuses on atomic values and\nremoval of repeating groups. The reasons for separating entities and operational tables belong to\n2NF and 3NF.\n\nWhy continue to 2NF after 1NF?\n\nBecause after 1NF, student details, category names, and requirement names may still repeat\nacross many rows. 2NF separates the core entities.\n\nWhy continue to 3NF after 2NF?\n\nBecause the database still has supporting concerns such as user accounts, activity logs, print\nlogs, reset tokens, documents, and archives. These should be separate from the main student and\nrequirement records.\n\nWhat is the safest one-line answer?\n\n1NF fixes the format of the rows; 2NF fixes repeated entity data; 3NF fixes indirect/supporting data\nand makes the database maintainable.\n\nDefense line: “1NF is correct, but it is not complete. It removes repeating columns, but it does not fully remove redundancy or separate all dependency concerns. That is why we\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\nstill need 2NF and 3NF.”\n\n14. If Asked: Why Cannot One Requirement per Row Be Done Only in 3NF?\nPossible professor question: “If 3NF is the final design, why not place one requirement per row only in 3NF?”\nBest answer: Because one requirement per row is the basic requirement of 1NF. 3NF is not a replacement for 1NF. 3NF comes after 1NF and 2NF. If the table still has\nRequirement 1, Requirement 2, Status 1, Status 2, it fails 1NF and therefore cannot be considered 3NF.\nFix\n\nCorrect Stage\n\nReason\n\nRemove Requirement 1 / Requirement 2 repeating columns\n\n1NF\n\nThis fixes repeating groups and makes each field atomic.\n\nSeparate students, categories, requirement types, category\nchecklist, and student requirement records\n\n2NF\n\nThis fixes repeated core data and separates tables by purpose.\n\nSeparate users, logs, print logs, password reset tokens,\ndocuments, and archives\n\n3NF\n\nThis fixes indirect/supporting data and keeps each table focused\non one main idea.\n\n15. “Kahit Pagbalibaligtarin” Review Map\nUse this section when the question is asked in a different way. The key is to answer based on the rule of the stage, not only based on the table name.\nIf the Professor Asks...\n\nWhat You Should Say\n\n“Why not jump directly from UNF to 3NF?”\n\nIn actual design, a developer may design the final schema directly. But for defense, we show the logical\nnormalization path because 3NF assumes 1NF and 2NF are already satisfied.\n\n“Can 1NF already have many tables?”\n\nIt may have separated rows or even early table planning, but the 1NF justification is only atomicity and\nno repeating groups. The full reason for separating entities belongs to 2NF and 3NF.\n\n“Why are logs and print records not discussed in 1NF?”\n\nBecause logs and print records are not about atomic values. They are about operational accountability\nand indirect/supporting data, which is explained under 3NF.\n\n“What if students still repeat in 1NF?”\n\nThat is acceptable at 1NF stage because 1NF only removes repeating groups. The repeated\nstudent/category data is exactly the reason why we proceed to 2NF.\n\n“What is the hierarchy?”\n\nUNF shows the problem. 1NF fixes repeated columns. 2NF separates core entities. 3NF separates\nindirect or supporting data.\n\nMemory shortcut: 1NF = row/column format. 2NF = core tables/entities. 3NF = clean dependencies and support tables.\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\fPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES | Open University System | ADAMS Normalization Backup\n\n16. Short Oral Answer You Can Memorize\n“We cannot put every correction under 1NF because normalization is hierarchical. 1NF only checks atomic values and removes repeating groups. After satisfying 1NF, we move\nto 2NF to separate repeated core data such as students, categories, and requirement types. After satisfying 2NF, we move to 3NF to separate indirect or supporting data such\nas users, logs, print history, reset tokens, documents, and archives. So the stages are not random; each stage has its own rule and the next stage assumes the previous stage\nis already satisfied.”\n\nFor presentation backup only - use when asked for a more detailed before-and-after normalization explanation.\n\n\f",
    "documentation": "Republic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nADMISSION DOCUMENT AND APPLICANT MANAGEMENT SYSTEM\n(A D A M S)\nDesign and Development of an Automated Admission\nManagement and Tracking System\n\nA Final Project Documentation\nPresented to the Faculty of the\nCollege of Computer and Information Sciences\nPolytechnic University of the Philippines\n\nIn Partial Fulfilment of the Requirements for the Degree\nBachelor of Science in Information Technology\n\nby\n\nSan Pedro, Jonathan C.\nBalakwit, Joan S.\nCioco, Gracheil M.\nGravoso, Catherine S.\nPamintuan, Kriszia Mae H.\n\nBSIT-OUMN 2-3\nInformation Management\nTarget Client: PUP Open University System Registrar's Office\nJune 2026\n\n1\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\n2\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nACKNOWLEDGEMENTS\nWe wish to express our sincere gratitude to the faculty of the Polytechnic University of the Philippines Open\nUniversity System for the guidance, feedback, and project requirements that shaped this final Information\nManagement documentation. We also acknowledge the PUP Open University System Registrar's Office as\nthe target client and process reference for the proposed admission document management prototype.\nWe further thank our classmates, resource persons, and team members who contributed to system analysis,\ndatabase design, user interface preparation, documentation drafting, and testing. Their technical and\nadministrative inputs helped complete the Admission Document and Applicant Management System\n(ADAMS) as a database-driven final project.\nJ.C.S. / J.S.B. / G.M.C. / C.S.G. / K.M.H.P.\n\n3\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nTABLE OF CONTENTS\nTitle Page\nAcknowledgements\nTable of Contents\nList of Tables\nList of Figures\nChapter 1. Project Context\n1.1 Introduction\n1.2 Project Overview\n1.3 Target Client and Users\n1.4 Problem Identification\n1.5 Business Rules\n1.6 Objectives of the Study/System\n1.7 Scope and Limitations\nChapter 2. Database Design and Documentation Requirements\n2.1 Current Form and Proposed Form\n2.2 Entities and Attributes\n2.3 Normalization\n2.4 Entity Relationship Diagram (ERD)\n2.5 Enhanced Entity Relationship Diagram (EERD)\n2.6 Data Dictionary\nChapter 3. Full Application and Functional Requirements\n3.1 System Architecture\n3.2 N Screenshots of User Interface\n3.3 Functional Requirements and User Manual\n3.4 Non-Functional Requirements\nChapter 4. SQL Implementation\n4.1 SQL Query Requirements\n4.2 Simple SQL Queries\n4.3 Moderate SQL Queries\n4.4 Difficult SQL Queries\n4.5 SQL Code / DDL Schema\nChapter 5. Program Requirements and Deployment\n5.1 Hardware Requirements\n5.2 Software Requirements\n5.3 Deployment and Backup Requirements\nReferences\nAppendices\nAppendix A. Source Code and Database Package Contents\n\n4\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nLIST OF TABLES\nTable 1. Problem identification and database response\nTable 2. ADAMS entities and attributes\nTable 3. Unnormalized form example\nTable 4. First normal form example\nTable 5. Second normal form decomposition\nTable 6. Third normal form decomposition\nTable 7. ERD relationship cardinalities\nTable 8. EERD element explanation\nTable 9. Data dictionary\nTable 10. Application modules and functions\nTable 11. Functional requirements and user manual\nTable 12. Non-functional requirements\nTable 13. Hardware requirements\nTable 14. Software requirements\nTable 15. Source code and database package contents\n\n5\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nLIST OF FIGURES\nFigure 1. Current CAEPUP-OUS application form\nFigure 2. Proposed ADAMS admission form\nFigure 3. ADAMS ERD summary view\nFigure 4. ADAMS ERD detailed implementation view\nFigure 5. ADAMS enhanced entity relationship diagram\nFigure 6. ADAMS login page\nFigure 7. ADAMS dashboard page\nFigure 8. Student management page\nFigure 9. Student archives page\nFigure 10. Category management page\nFigure 11. Requirement management page\nFigure 12. Activity logs page\nFigure 13. User management page\n\n6\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nChapter 1. Project Context\n1.1 Introduction\nAdmission offices receive and validate many student documents during application and enrolment. When\ninformation is monitored through manual forms, separate folders, or scattered files, staff may spend more\ntime searching for records than verifying the actual requirements. The ADAMS project responds to this\nconcern by proposing a database-driven admission document and applicant management system for the\nPUP Open University System.\nThe system focuses on the Information Management requirement of designing a normalized relational\ndatabase and connecting it to a working prototype application. The documentation therefore presents both\nthe database design and the full application features, including entities, normalization, ERD, EERD, data\ndictionary, user interface screenshots, SQL queries, program requirements, functional requirements, and\nSQL DDL schema.\n\n1.2 Project Overview\nThe Admission Document and Applicant Management System (ADAMS) is a database-driven prototype for\nmanaging student admission records and document requirements for the PUP Open University System. The\nsystem organizes applicants/students, student categories, required document types, uploaded requirement\nfiles, user accounts, activity logs, printing records, password reset records, and archived student records into\na structured relational database.\nThe main purpose of ADAMS is to replace scattered manual monitoring with a database that can answer\noperational questions: who the student is, what category the student belongs to, what requirements are\nexpected, which requirements have already been uploaded, which users performed changes, which records\nwere printed, and which student records were archived. The database component is the core of the system\nbecause it uses primary keys, foreign keys, unique constraints, bridge tables, and logical relationships to\nsupport accurate retrieval, completeness checking, accountability, and reporting.\n\n1.3 Target Client and Users\nThe target client of ADAMS is the PUP Open University System Registrar's Office. The system is intended to\nsupport registrar-related admission document monitoring, applicant profile management, document checklist\ntracking, report printing, and record archiving.\n\nThe submitted user scope includes only Superadmin and Staff roles. Applicants/students are maintained as\nadmission records and are not included as login users in this final documentation scope.\n Superadmin: manages system-wide user accounts, settings, categories, requirements, logs, and\nreports.\n Staff: handles routine record searching, updating, uploading, monitoring, printing, and archiving subject\nto granted access.\n\n1.4 Problem Identification\nThe major problem addressed by ADAMS is the difficulty of managing admission document records when\nstudent information, required documents, uploaded files, and monitoring logs are handled manually or\ninconsistently. Without a relational database, the office may experience duplicate records, incomplete\ndocument tracking, unclear accountability, and difficulty identifying which requirements remain pending.\nTable 1. Problem identification and database response\n\n7\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nIdentified Problem\n\nOperational Effect\n\nDatabase Response\n\nManual or scattered recording\n\nStudent records and requirement statuses\nbecome difficult to search and verify.\n\nCreate searchable students,\nstudent_categories, requirement_types,\nand student_requirements tables.\n\nDifferent requirements per student\ncategory\n\nThe office may apply the wrong checklist to Use category_requirements to define the\nthe wrong student group.\nrequired documents per category.\n\nIncomplete or pending uploaded\nrequirements\n\nStaff may not quickly know which\nrequirements are missing, pending,\nrejected, or insufficient.\n\nUse student_requirements with status,\nfile_name, file_path, upload_date, and\nuploaded_at.\n\nUnclear accountability\n\nIt may be difficult to identify who performed\nan update, upload, print, or archive action.\n\nUse users, activity_log, uploaded_by,\narchived_by, and print_logs.\n\nNeed to preserve removed records\n\nDeleted or inactive student records may be\nlost without historical reference.\n\nUse archived_students to keep student\nsnapshots and archive details.\n\n1.5 Business Rules\n Each student/applicant belongs to one student category when classified.\n A student category may require many admission requirement types.\n A requirement type may be required by many student categories.\n A student may have many requirement records.\n Each student requirement refers to one requirement type.\n A student may have document records attached to the student profile.\n Authorized users perform system actions and uploads.\n Every major system action must be traceable through activity logs or related audit fields.\n Student report printing must be recorded for accountability.\n Archived students are kept as historical snapshots instead of being permanently lost.\n The mapping between student categories and requirement types must be maintained through a bridge\ntable to avoid repeating checklist data.\n Only valid requirement statuses may be recorded, such as PENDING, SUBMITTED, VERIFIED,\nAPPROVED, INSUFFICIENT, or REJECTED.\n\n1.6 Objectives of the Study/System\nGeneral Objective. The general objective of ADAMS is to develop a database-driven admission document\nmanagement prototype that helps the office record, monitor, verify, retrieve, print, and archive student\nadmission records and requirements more accurately and efficiently.\nSpecific Objectives. The system specifically aims to:\n Create a structured database for users, students, student categories, requirement types, category\nrequirements, student requirements, document records, activity logs, print logs, password reset tokens,\nand archived student records.\n Define which requirement types are applicable to each student category through a bridge table.\n Record student-specific requirement statuses, uploaded files, upload dates, and uploading users.\n Allow authorized users to manage student records, requirements, uploads, printing, password recovery,\nand archiving activities.\n Apply normalization principles to reduce redundancy, remove repeating groups, and improve\nconsistency.\n\n8\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n Present a defensible database design through ERD, EERD, data dictionary, SQL queries, and SQL\nschema code.\n Demonstrate useful SQL queries for requirement lists, student checklist monitoring, missing requirement\ndetection, activity tracking, and reporting.\n\n1.7 Scope and Limitations\nThe scope of ADAMS covers admission-related document tracking, student profile maintenance, category\nand requirement setup, file upload monitoring, user account administration, activity logging, report printing,\npassword reset token tracking, and archiving. It is designed as a final project prototype, not as a fully\ndeployed university-wide production system.\nThe current prototype depends on the correctness of encoded applicant information and uploaded files.\nIntegration with official university authentication, payment systems, student information systems, and\nexternal verification agencies is outside the present scope, but the relational design can be extended to\nsupport these integrations in future versions.\n\n9\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nChapter 2. Database Design and Documentation Requirements\n2.1 Current Form and Proposed Form\nThe current admission form captures applicant profile data, contact information, emergency contact,\nacademic information, employment information, and chosen academic program. ADAMS converts these\ninformation areas into structured database fields and upload-monitoring workflows so that the office can\nsearch, validate, and report admission records more efficiently.\n\nFigure 1. Current CAEPUP-OUS application form\n\nThe proposed ADAMS form supports structured entry of personal information, contact details, emergency\ncontact, academic information, employment information, and academic program preferences. The design is\naligned with the proposed database by separating student identity, category classification, requirements,\nfiles, and status tracking.\n\n10\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 2. Proposed ADAMS admission form\n\n2.2 Entities and Attributes\nTable 2. ADAMS entities and attributes\nEntity/Table\n\nPrimary Key\n\nMajor Attributes\n\nPurpose\n\nusers\n\nuser_id\n\nusername, password, email,\nfull_name, phone, role,\nis_active, created_at, last_login\n\nStores authorized accounts and\naccess roles.\n\n11\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nstudent_categories\n\ncategory_id\n\ncategory_name, sort_order\n\nStores reusable student\nclassifications such as\nFreshman, Transferee,\nReturning, or similar categories.\n\nstudents\n\nstudent_id\n\nuser_id, student_name,\nlast_name, first_name,\nmiddle_name, birth_date,\nemail, category_id, remarks,\nphone\n\nStores applicant/student profile\ninformation.\n\nrequirement_types\n\nrequirement_id\n\nrequirement_name, description\n\nStores the master list of\nadmission document\nrequirements.\n\ncategory_requirements\n\ncategory_id + requirement_id\n\ncategory_id, requirement_id\n\nBridge table that defines which\nrequirements apply to each\nstudent category.\n\nstudent_requirements\n\nstudent_requirement_id\n\nstudent_id, requirement_id,\nfile_name, file_path,\nfile_content, mime_type,\nfile_size, uploaded_by, status,\nupload_date, uploaded_at\n\nTracks student-specific\nrequirement status and\nuploaded files.\n\ndocuments\n\ndocument_id\n\nstudent_id, document_type,\nfile_path, tracking_number,\nstatus, date_submitted,\nremarks, student_pk\n\nStores additional document\nrecords attached to student\nprofiles.\n\nactivity_log\n\nlog_id\n\nuser_id, username, action,\nmodule, description, log_time\n\nRecords major user actions for\naccountability.\n\nprint_logs\n\nlog_id\n\nref_no, student_id,\ndocument_type, printed_by,\nprinted_by_name, printed_at,\ncampus_code\n\nRecords printed student reports\nor system reports.\n\npassword_reset_tokens\n\nid\n\nuser_id, token, expires_at,\nused, created_at\n\nStores password recovery\ntokens and token status.\n\narchived_students\n\narchive_id\n\nstudent_id, student_name,\nlast_name, first_name,\nmiddle_name, email, phone,\nbirth_date, category_id,\nremarks, archived_at,\narchived_by\n\nStores snapshots of archived\nstudent records.\n\n2.3 Normalization\nNormalization was applied to convert a logbook-style admission record into a cleaner relational database. In\na manual setup, one record may contain student details, category details, multiple requirement names,\nmultiple status values, and upload information in the same row. This creates redundancy and update errors.\nThe normalized design separates repeated data into related tables.\n\nUnnormalized Form (UNF)\nIn UNF, multiple requirements and upload details may appear in one wide record. This violates the rule that\nfields should contain atomic values.\nTable 3. Unnormalized form example\nStudent\nName\n\nCategory\n\nRequireme\nnt 1\n\nStatus 1\n\nFile 1\n\n12\n\nRequireme\nnt 2\n\nStatus 2\n\nFile 2\n\nRemarks\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nReyes, Ana\n\nFreshman\n\nBirth\nCertificate\n\nSUBMITTED birth.pdf\n\nValid ID\n\nPENDING\n\nSantos,\nMark\n\nTransferee\n\nTranscript\n\nPENDING\n\nGood Moral\n\nSUBMITTED goodmoral.p\ndf\n\nN/A\n\nN/A\n\nFor\nverification\nIncomplete\n\nFirst Normal Form (1NF)\nIn 1NF, repeating groups are removed. Each requirement is represented as a separate row with a single\nrequirement value and a single status value.\nTable 4. First normal form example\nStudent Name\n\nCategory\n\nRequirement\n\nStatus\n\nFile Name\n\nUploaded By\n\nUpload Date\n\nReyes, Ana\n\nFreshman\n\nBirth Certificate\n\nSUBMITTED\n\nbirth.pdf\n\nadmin\n\n2026-06-20\n\nReyes, Ana\n\nFreshman\n\nValid ID\n\nPENDING\n\nN/A\n\nadmin\n\nSantos, Mark\n\nTransferee\n\nTranscript\n\nPENDING\n\nN/A\n\nregistrar\n\nSantos, Mark\n\nTransferee\n\nGood Moral\n\nSUBMITTED\n\ngoodmoral.pdf\n\nregistrar\n\n2026-06-20\n\nSecond Normal Form (2NF)\nIn 2NF, data is separated based on its main purpose. Student details, category details, requirement type\ndetails, and student requirement records are separated to reduce partial dependency and repeated fields.\nTable 5. Second normal form decomposition\nTable\n\nPrimary Key\n\nPurpose\n\nstudents\n\nstudent_id\n\nStores student/applicant identity once.\n\nstudent_categories\n\ncategory_id\n\nStores reusable category names such as\nFreshman, Transferee, Returning, and\nsimilar groups.\n\nrequirement_types\n\nrequirement_id\n\nStores reusable requirement names such\nas Birth Certificate or Valid ID.\n\ncategory_requirements\n\ncategory_id + requirement_id\n\nDefines which requirements apply to each\ncategory.\n\nstudent_requirements\n\nstudent_requirement_id\n\nStores requirement status and upload\ndetails per student and requirement.\n\nThird Normal Form (3NF)\nIn 3NF, remaining transitive or repeated operational data is separated into supporting tables. Users, activity\nlogs, print logs, password reset tokens, documents, and archived student records support accountability,\nreporting, and security without repeating the same details inside the student table.\nTable 6. Third normal form decomposition\nFinal Table\n\nKey Fields\n\nReason for Separation\n\nusers\n\nuser_id, username\n\nStores authorized accounts and roles\nonce.\n\n13\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nactivity_log\n\nlog_id, user_id\n\nStores system actions separately for\ntraceability.\n\nprint_logs\n\nlog_id, ref_no\n\nStores printing history separately from\nstudent records.\n\npassword_reset_tokens\n\nid, user_id, token\n\nStores password recovery tokens\nseparately for security.\n\ndocuments\n\ndocument_id, student_pk\n\nStores document records linked to a\nstudent.\n\narchived_students\n\narchive_id, student_id\n\nStores historical snapshots of archived\nstudent records.\n\nThe students_backup table found in the database package is excluded from the normalized operational\ndesign because it is a backup/support table, not part of the main application model.\n\n2.4 Entity Relationship Diagram (ERD)\nThe ERD presents the implementation view of the ADAMS database. It includes actual tables, major\nattributes, primary keys, foreign keys, unique constraints, relationship labels, and cardinality. The detailed\nview below corresponds to the relational tables documented in the data dictionary and DDL schema.\n\nFigure 3. ADAMS ERD summary view\n\n14\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 4. ADAMS ERD detailed implementation view\n\nTable 7. ERD relationship cardinalities\nRelationship\n\nCardinality\n\nExplanation\n\nstudent_categories -> students\n\n1:M\n\nOne category can classify many students;\neach student belongs to one category\nwhen assigned.\n\nstudent_categories ->\ncategory_requirements\n\n1:M\n\nOne category may require many\nrequirement types.\n\nrequirement_types ->\ncategory_requirements\n\n1:M\n\nOne requirement type may appear in many\ncategory checklists.\n\nstudents -> student_requirements\n\n1:M\n\nOne student may have many requirement\nrecords.\n\n15\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nrequirement_types ->\nstudent_requirements\n\n1:M\n\nOne requirement type may be assigned to\nmany student requirement records.\n\nstudents -> documents\n\n1:M\n\nOne student may have many document\nrecords.\n\nusers -> activity_log\n\n1:M\n\nOne user may create many activity log\nentries.\n\nusers -> print_logs\n\n1:M\n\nOne user may print many records/reports.\n\nusers -> password_reset_tokens\n\n1:M\n\nOne user may request many password\nreset tokens.\n\n2.5 Enhanced Entity Relationship Diagram (EERD)\nThe EERD presents the conceptual enhanced model using Chen-style notation. It emphasizes\nspecialization/generalization for the two authorized system roles, namely Superadmin and Staff, and also\nshows student classification through student categories. To keep the diagram readable, it shows major\nattributes only; the complete SQL fields are shown in the ERD, data dictionary, and DDL schema.\n\nFigure 5. ADAMS enhanced entity relationship diagram\n\n16\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nTable 8. EERD element explanation\nEERD Element\n\nMeaning in ADAMS\n\nUSER specialization\n\nUsers are classified only as SUPERADMIN_USER\nor STAFF_USER based on the role field.\n\nSTUDENT specialization\n\nStudents may be conceptually classified into categories such as\nFreshman, Sophomore, Junior, Senior, Transferee, and\nReturning. In the database this is implemented through\nstudent_categories and students.category_id.\n\nRelationship diamonds\n\nDiamonds show actions or associations such as classifies, has,\nassigned_as, uploads, records, requests, prints, archives, and\narchived_as.\n\nCardinality labels\n\n1 and M labels show whether one record can relate to many\nrecords in another entity.\n\nPrimary key ovals\n\nUnderlined ovals indicate key attributes in Chen notation.\n\n2.6 Data Dictionary\nThe data dictionary below is based on the ADAMS operational tables. The backup table students_backup is\nexcluded from the main documentation because it is not part of the core application model.\nTable 9. Data dictionary\nTable\n\nField\n\nData Type\n\nKey/Constraint\n\nDescription\n\nusers\n\nuser_id\n\nINT\n\nPK\n\nUnique user identifier.\n\nusers\n\nusername\n\nVARCHAR(50)\n\nUK, NOT NULL\n\nLogin username.\n\nusers\n\npassword\n\nVARCHAR(100)\n\nNOT NULL\n\nStored password/hash\nvalue.\n\nusers\n\nemail\n\nVARCHAR(100)\n\nNULL\n\nUser email address.\n\nusers\n\nfull_name\n\nVARCHAR(100)\n\nNULL\n\nFull name of user.\n\nusers\n\nphone\n\nVARCHAR(20)\n\nNULL\n\nContact number.\n\nusers\n\nis_active\n\nTINYINT(1)\n\nDEFAULT 1\n\nIndicates active account.\n\nusers\n\ncreated_at\n\nDATETIME\n\nDEFAULT\nCURRENT_TIMESTAM\nP\n\nAccount creation date.\n\nusers\n\nlast_login\n\nDATETIME\n\nNULL\n\nLatest login time.\n\nusers\n\nrole\n\nVARCHAR(20)\n\nCHECK\n\nUser role: superadmin or\nstaff.\n\nstudent_categories\n\ncategory_id\n\nINT\n\nPK\n\nUnique category\nidentifier.\n\nstudent_categories\n\ncategory_name\n\nVARCHAR(100)\n\nUK, NOT NULL\n\nName of student\ncategory.\n\nstudent_categories\n\nsort_order\n\nINT\n\nDEFAULT 0\n\nOrdering value for\ndisplay.\n\nstudents\n\nstudent_id\n\nINT\n\nPK\n\nUnique student identifier.\n\n17\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nstudents\n\nuser_id\n\nINT\n\nFK, NULL\n\nOptional linked user\naccount.\n\nstudents\n\nstudent_name\n\nVARCHAR(100)\n\nUK with birth_date\n\nFull student name.\n\nstudents\n\nlast_name\n\nVARCHAR(100)\n\nNOT NULL\n\nStudent last name.\n\nstudents\n\nfirst_name\n\nVARCHAR(100)\n\nNOT NULL\n\nStudent first name.\n\nstudents\n\nmiddle_name\n\nVARCHAR(100)\n\nNULL\n\nStudent middle name.\n\nstudents\n\nbirth_date\n\nDATE\n\nNULL\n\nDate of birth.\n\nstudents\n\nemail\n\nVARCHAR(100)\n\nNULL\n\nEmail address.\n\nstudents\n\ncategory_id\n\nINT\n\nFK\n\nStudent category.\n\nstudents\n\nremarks\n\nVARCHAR(255)\n\nNULL\n\nRemarks or notes.\n\nstudents\n\nphone\n\nVARCHAR(20)\n\nNULL\n\nPhone number.\n\nrequirement_types\n\nrequirement_id\n\nINT\n\nPK\n\nUnique requirement type\nidentifier.\n\nrequirement_types\n\nrequirement_name\n\nVARCHAR(100)\n\nUK, NOT NULL\n\nName of requirement.\n\nrequirement_types\n\ndescription\n\nVARCHAR(255)\n\nNULL\n\nRequirement description.\n\ncategory_requirements\n\ncategory_id\n\nINT\n\nPK/FK\n\nReferences\nstudent_categories.\n\ncategory_requirements\n\nrequirement_id\n\nINT\n\nPK/FK\n\nReferences\nrequirement_types.\n\nstudent_requirements\n\nstudent_requirement_id\n\nINT\n\nPK\n\nUnique student\nrequirement record.\n\nstudent_requiremen student_id\nts\n\nVARCHAR(20)\n\nNOT NULL, UK with Logical student\nrequirement_id\nreference used by\nthe application.\n\nstudent_requiremen requirement_id\nts\n\nINT\n\nNOT NULL,\nIndexed\n\nRequirement type\nreference.\n\nstudent_requirements\n\nfile_name\n\nVARCHAR(255)\n\nNULL\n\nUploaded file name.\n\nstudent_requirements\n\nfile_path\n\nVARCHAR(500)\n\nNULL\n\nUploaded file path.\n\nstudent_requirements\n\nfile_content\n\nLONGBLOB\n\nNULL\n\nBinary file content.\n\nstudent_requirements\n\nmime_type\n\nVARCHAR(100)\n\nNULL\n\nFile MIME type.\n\nstudent_requirements\n\nfile_size\n\nBIGINT\n\nNULL\n\nFile size.\n\nstudent_requiremen uploaded_by\nts\n\nINT\n\nNULL\n\nUser who uploaded\nthe file, if recorded.\n\nstudent_requiremen status\nts\n\nVARCHAR(50)\n\nIndexed\n\nRequirement status.\n\nstudent_requirements\n\nupload_date\n\nDATE\n\nNULL\n\nUpload date.\n\nstudent_requirements\n\nuploaded_at\n\nDATETIME\n\nNULL\n\nUpload timestamp.\n\ndocuments\n\ndocument_id\n\nINT\n\nPK\n\nUnique document\nrecord.\n\ndocuments\n\nstudent_id\n\nVARCHAR(20)\n\nNULL\n\nStudent number or\nexternal student\n\n18\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nreference.\ndocuments\n\ndocument_type\n\nVARCHAR(50)\n\nNULL\n\nDocument type label.\n\ndocuments\n\nfile_path\n\nVARCHAR(255)\n\nNULL\n\nDocument file path.\n\ndocuments\n\ntracking_number\n\nVARCHAR(50)\n\nNULL\n\nTracking/reference\nnumber if used.\n\ndocuments\n\nstatus\n\nVARCHAR(20)\n\nNULL\n\nDocument status.\n\ndocuments\n\ndate_submitted\n\nDATETIME\n\nNULL\n\nSubmission date.\n\ndocuments\n\nremarks\n\nVARCHAR(255)\n\nNULL\n\nRemarks.\n\ndocuments\n\nstudent_pk\n\nINT\n\nNOT NULL, FK\n\nReferences\nstudents.student_id.\n\nactivity_log\n\nlog_id\n\nINT\n\nPK\n\nUnique activity log\nidentifier.\n\nactivity_log\n\nuser_id\n\nINT\n\nFK\n\nUser who performed the\naction.\n\nactivity_log\n\nusername\n\nVARCHAR(100)\n\nNOT NULL\n\nUsername at time of\naction.\n\nactivity_log\n\naction\n\nVARCHAR(50)\n\nCHECK\n\nAction type such as\nADD, UPDATE,\nDELETE, REPLACE,\nUPLOAD, ARCHIVE.\n\nactivity_log\n\nmodule\n\nVARCHAR(50)\n\nNOT NULL\n\nModule affected.\n\nactivity_log\n\ndescription\n\nTEXT\n\nNOT NULL\n\nAction description.\n\nactivity_log\n\nlog_time\n\nDATETIME\n\nDEFAULT\nCURRENT_TIMESTAM\nP\n\nDate/time of activity.\n\nprint_logs\n\nlog_id\n\nINT\n\nPK\n\nUnique print log.\n\nprint_logs\n\nref_no\n\nVARCHAR(100)\n\nUK\n\nUnique reference\nnumber.\n\nprint_logs\n\nstudent_id\n\nINT\n\nFK, NULL\n\nStudent printed, if\napplicable.\n\nprint_logs\n\ndocument_type\n\nVARCHAR(50)\n\nCHECK\n\nReport/document type.\n\nprint_logs\n\nprinted_by\n\nINT\n\nFK, NULL\n\nUser who printed.\n\nprint_logs\n\nprinted_by_name\n\nVARCHAR(100)\n\nNULL\n\nName of printing user.\n\nprint_logs\n\nprinted_at\n\nDATETIME\n\nDEFAULT\nCURRENT_TIMESTAM\nP\n\nPrint date/time.\n\nprint_logs\n\ncampus_code\n\nVARCHAR(10)\n\nDEFAULT MN0\n\nCampus code.\n\npassword_reset_tokens\n\nid\n\nINT\n\nPK\n\nUnique token record.\n\npassword_reset_tokens\n\nuser_id\n\nINT\n\nFK\n\nUser requesting reset.\n\npassword_reset_tokens\n\ntoken\n\nVARCHAR(64)\n\nUK, NOT NULL\n\nReset token.\n\npassword_reset_tokens\n\nexpires_at\n\nDATETIME\n\nNOT NULL\n\nExpiration timestamp.\n\npassword_reset_tokens\n\nused\n\nTINYINT(1)\n\nDEFAULT 0\n\nUsage flag.\n\npassword_reset_tokens\n\ncreated_at\n\nDATETIME\n\nDEFAULT\n\nCreation timestamp.\n\n19\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nCURRENT_TIMESTAM\nP\narchived_students\n\narchive_id\n\nINT\n\nPK\n\nUnique archive record.\n\narchived_students\n\nstudent_id\n\nINT\n\nLogical reference\n\nOriginal student\nidentifier.\n\narchived_students\n\nstudent_name\n\nVARCHAR(255)\n\nNULL\n\nArchived full name.\n\narchived_students\n\nlast_name\n\nVARCHAR(100)\n\nNULL\n\nArchived last name.\n\narchived_students\n\nfirst_name\n\nVARCHAR(100)\n\nNULL\n\nArchived first name.\n\narchived_students\n\nmiddle_name\n\nVARCHAR(100)\n\nNULL\n\nArchived middle name.\n\narchived_students\n\nemail\n\nVARCHAR(255)\n\nNULL\n\nArchived email.\n\narchived_students\n\nphone\n\nVARCHAR(50)\n\nNULL\n\nArchived phone.\n\narchived_students\n\nbirth_date\n\nDATE\n\nNULL\n\nArchived birth date.\n\narchived_students\n\ncategory_id\n\nINT\n\nLogical/FK\n\nArchived category.\n\narchived_students\n\nremarks\n\nTEXT\n\nNULL\n\nArchived remarks.\n\narchived_students\n\narchived_at\n\nDATETIME\n\nDEFAULT\nCURRENT_TIMESTAM\nP\n\nArchive timestamp.\n\narchived_students\n\narchived_by\n\nINT\n\nLogical/FK\n\nUser who archived\nrecord.\n\n20\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nChapter 3. Full Application and Functional Requirements\n3.1 System Architecture\nADAMS follows a web-based Java application structure using JSP/Servlets, DAO classes, model classes,\nutility classes, and a MySQL or MariaDB relational database. The application layer handles forms, validation,\nuser actions, file upload, reporting, and printing. The database layer stores normalized data and supports\nSQL queries for monitoring and reporting.\nTable 10. Application modules and functions\nModule\n\nMain Function\n\nLogin and Authentication\n\nAllows authorized users to log in, log out, and recover passwords\nthrough reset tokens.\n\nDashboard\n\nDisplays summary counts, monitoring indicators, and reports for\nmanagement review.\n\nStudent Management\n\nAllows adding, searching, editing, viewing, printing, and archiving\nstudent/applicant records.\n\nCategory Management\n\nAllows maintaining student categories and their display order.\n\nRequirement Management\n\nAllows maintaining requirement types and mapping requirements\nto categories.\n\nUpload / Student Requirements\n\nAllows uploading files and updating requirement status per\nstudent.\n\nActivity Logs\n\nAllows the Superadmin to review traceable system actions and\naccountability records.\n\nPrint Logs and Reports\n\nRecords generated reports and reference numbers.\n\nUser Management\n\nAllows the Superadmin to maintain system user accounts, roles,\nand activity status.\n\nArchives\n\nKeeps historical snapshots of archived student records.\n\n3.2 N Screenshots of User Interface\nThe following screenshots show the major pages of the ADAMS full application prototype. These screens\ndemonstrate that the database design is connected to functional pages for login, dashboard monitoring,\nstudent management, archives, category setup, requirement setup, activity logs, and user management.\n\n21\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 6. ADAMS login page\n\nFigure 7. ADAMS dashboard page\n\n22\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 8. Student management page\n\nFigure 9. Student archives page\n\n23\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 10. Category management page\n\nFigure 11. Requirement management page\n\n24\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nFigure 12. Activity logs page\n\nFigure 13. User management page\n\n3.3 Functional Requirements and User Manual\nThe functional requirements below are written as user-manual actions so that the documentation is\nconsistent with what the developed tool is expected to demonstrate during final evaluation.\nTable 11. Functional requirements and user manual\nFunctional Requirement\n\nUser Manual Action\n\nExpected System Response\n\nFR-01 Login\n\nUser opens the ADAMS login page, enters\nusername and password, and clicks Login.\n\nSystem validates credentials, checks\naccount status, opens the correct\n\n25\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\ndashboard, and records last login when\napplicable.\nFR-02 Logout\n\nUser clicks Logout from the sidebar or\nheader.\n\nSystem ends the session and returns the\nuser to the login page.\n\nFR-03 Password Reset\n\nUser clicks Forgot Password, enters the\naccount email/username, and follows the\nreset process.\n\nSystem generates a password reset token,\nstores expiration and usage status, and\nallows password update within the valid\ntoken period.\n\nFR-04 Dashboard Monitoring\n\nAuthorized user opens Dashboard after\nlogin.\n\nSystem displays student counts,\nrequirement indicators, category\ninformation, and management summaries.\n\nFR-05 Add Student\n\nSuperadmin or Staff opens Student\nManagement, clicks Add Student, encodes\nprofile information, selects category, and saves.\n\nSystem validates required fields, stores the\nstudent record, and links the selected\ncategory.\n\nFR-06 Search/View Student\n\nUser searches by student name, email, or\ncategory and opens the record.\n\nSystem retrieves matching records and\ndisplays profile details and requirement\nstatus.\n\nFR-07 Update Student\n\nAuthorized user opens a student record,\nedits allowed fields, and saves changes.\n\nSystem updates the student table and\nrecords the action in activity_log.\n\nFR-08 Archive Student\n\nAuthorized user clicks Archive for a student System copies key student information to\nrecord and confirms the action.\narchived_students and preserves archive\ndetails.\n\nFR-09 Manage Categories\n\nSuperadmin opens Categories,\nadds/edits/deletes category records, and\nmanages sort order.\n\nSystem updates student_categories and\nprevents duplicate category names.\n\nFR-10 Manage Requirement Types\n\nSuperadmin opens Requirements,\nadds/edits/deletes requirement types and\ndescriptions.\n\nSystem updates requirement_types and\nprevents duplicate requirement names.\n\nFR-11 Map Category Requirements\n\nSuperadmin assigns requirement types to the\nrelevant student category.\n\nSystem stores mappings in\ncategory_requirements so each category\nhas the correct checklist.\n\nFR-12 Upload Requirement File\n\nAuthorized user opens a student\nrequirement, selects the file, and\nsubmits/upload updates.\n\nSystem stores file metadata/content or\npath, uploader ID, status, upload date, and\nupload timestamp.\n\nFR-13 Update Requirement Status\n\nAuthorized user changes status to\nPENDING, SUBMITTED, VERIFIED,\nAPPROVED, INSUFFICIENT, or\nREJECTED.\n\nSystem updates student_requirements and\nsupports completeness monitoring.\n\nFR-14 Print Student Report\n\nUser opens student report/print page and\nprints the selected record.\n\nSystem generates a report, assigns a\nreference number if used, and stores\nprint_logs.\n\nFR-15 View Activity Logs\n\nSuperadmin opens Activity Logs and filters or\nreviews actions.\n\nSystem displays action type, module,\nusername, description, and timestamp.\n\nFR-16 Manage Users\n\nSuperadmin opens User Management and\nmanages Superadmin or Staff user accounts.\n\nSystem creates, updates, activates, or\ndeactivates user accounts according to the\nallowed roles: superadmin and staff.\n\n3.4 Non-Functional Requirements\nTable 12. Non-functional requirements\n\n26\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nRequirement Area\n\nDescription\n\nAccuracy\n\nThe database must prevent duplicate or inconsistent records\nthrough primary keys, foreign keys, unique constraints, and valid\nstatus values.\n\nUsability\n\nScreens must be accessible through a browser and organized by\ncommon registrar tasks.\n\nSecurity\n\nOnly authorized users should access restricted functions;\npasswords should be stored as hashes and reset tokens should\nexpire.\n\nAuditability\n\nMajor user actions, uploads, archiving, and print activities should\nbe traceable through logs.\n\nMaintainability\n\nDatabase tables and application modules should be named\nclearly so future developers can extend the system.\n\nBackup and Recovery\n\nDatabase dumps and backup tables may be used for restoration,\nbut backup tables are separated from the normalized operational\nmodel.\n\n27\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nChapter 4. SQL Implementation\n4.1 SQL Query Requirements\nThe following SQL queries satisfy the required three simple, four moderate, and three difficult SQL codes.\nEach query is aligned with an actual ADAMS database function and uses the normalized table names\ndocumented in the data dictionary.\n\n4.2 Simple SQL Queries\nSimple SQL 1: List Student Categories - Category Management\nSELECT category_id, category_name, sort_order\nFROM student_categories\nORDER BY sort_order, category_name;\n\ncategory_id\n\ncategory_name\n\nsort_order\n\n1\n\nFreshman\n\n1\n\n2\n\nTransferee\n\n2\n\n3\n\nReturning\n\n3\n\nExplanation and relevance: This query retrieves the master list of student categories used to classify\nstudents.\nSimple SQL 2: List Requirement Types - Requirement Setup\nSELECT requirement_id, requirement_name, description\nFROM requirement_types\nORDER BY requirement_name;\n\nrequirement_id\n\nrequirement_name\n\ndescription\n\n1\n\nBirth Certificate\n\nProof of birth\n\n2\n\nValid ID\n\nIdentity document\n\n3\n\nTranscript of Records\n\nAcademic record\n\nExplanation and relevance: This query shows the standard list of admission requirement types.\nSimple SQL 3: Show Active Users - User Management\nSELECT user_id, username, full_name, role\nFROM users\nWHERE is_active = 1\nORDER BY role, username;\n\n28\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nuser_id\n\nusername\n\nfull_name\n\nrole\n\n1\n\nsuperadmin\n\nSystem Superadmin\n\nsuperadmin\n\n5\n\nstaff1\n\nRegistrar Staff\n\nstaff\n\nExplanation and relevance: This query identifies active users who can access the system.\n\n4.3 Moderate SQL Queries\nModerate SQL 1: Student Profile with Category - Student Search\nSELECT s.student_id,\ns.student_name,\ns.email,\ns.phone,\nc.category_name\nFROM students s\nLEFT JOIN student_categories c ON c.category_id = s.category_id\nWHERE s.student_id = 1;\n\nstudent_id\n\nstudent_name\n\nemail\n\nphone\n\ncategory_name\n\n1\n\nJuana Santita\n\nsample@email.edu\n\n09171234567\n\nFreshman\n\nExplanation and relevance: This query joins students with student_categories to show the classification of a\nstudent.\nModerate SQL 2: Requirements Required per Category - Requirement Checklist\nSELECT c.category_name,\nr.requirement_name,\nr.description\nFROM category_requirements cr\nJOIN student_categories c ON c.category_id = cr.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nWHERE c.category_id = 1\nORDER BY r.requirement_name;\n\ncategory_name\n\nrequirement_name\n\ndescription\n\nFreshman\n\nBirth Certificate\n\nProof of birth\n\nFreshman\n\nValid ID\n\nIdentity document\n\nExplanation and relevance: This query shows which requirements apply to a selected student category.\nModerate SQL 3: Student Requirement Status - Requirement Upload Monitoring\nSELECT s.student_id,\ns.student_name,\nr.requirement_name,\n\n29\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nCOALESCE(sr.status, 'PENDING') AS current_status,\nsr.file_name,\nsr.uploaded_at\nFROM students s\nJOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR)\nJOIN requirement_types r ON r.requirement_id = sr.requirement_id\nWHERE s.student_id = 1\nORDER BY r.requirement_name;\n\nstudent_id\n\nstudent_name\n\nrequirement_name\n\ncurrent_status\n\n1\n\nJuana Santita\n\nBirth Certificate\n\nSUBMITTED\n\n1\n\nJuana Santita\n\nValid ID\n\nPENDING\n\nExplanation and relevance: This query joins students, student_requirements, and requirement_types to\ndisplay one student's requirement checklist and status.\nModerate SQL 4: Print Logs with Student and User - Report / Print Monitoring\nSELECT pl.ref_no,\ns.student_name,\npl.document_type,\nu.full_name AS printed_by,\npl.printed_at\nFROM print_logs pl\nLEFT JOIN students s ON s.student_id = pl.student_id\nLEFT JOIN users u ON u.user_id = pl.printed_by\nORDER BY pl.printed_at DESC;\n\nref_no\n\nstudent_name\n\ndocument_type\n\nprinted_by\n\nMN0-001\n\nJuana Santita\n\nSTUDENT_REPORT\n\nRegistrar Staff\n\nExplanation and relevance: This query connects print records to students and users for accountability.\n\n4.4 Difficult SQL Queries\nDifficult SQL 1: Missing or Pending Requirements - Completeness Report\nSELECT s.student_id,\ns.student_name,\nc.category_name,\nr.requirement_name,\nCOALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\n\n30\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL\nOR sr.status IS NULL\nOR sr.status IN ('PENDING', 'INSUFFICIENT', 'REJECTED')\nORDER BY s.student_name, r.requirement_name;\n\nstudent_id\n\nstudent_name\n\nrequirement_name\n\nstatus_result\n\n1\n\nJuana Santita\n\nValid ID\n\nPENDING\n\n2\n\nMark Santos\n\nBirth Certificate\n\nMISSING\n\nExplanation and relevance: This difficult query compares required documents per category against actual\nstudent requirement records to identify missing or unresolved requirements.\nDifficult SQL 2: Requirement Completion Summary per Student - Dashboard / Management Report\nSELECT s.student_id,\ns.student_name,\nc.category_name,\nCOUNT(cr.requirement_id) AS required_count,\nCOUNT(sr.student_requirement_id) AS recorded_count,\nSUM(CASE WHEN sr.file_name IS NOT NULL THEN 1 ELSE 0 END) AS uploaded_count,\nSUM(CASE WHEN sr.status IN ('SUBMITTED','VERIFIED','APPROVED') THEN 1 ELSE 0 END) AS completed_count,\nCOUNT(cr.requirement_id) - COUNT(sr.student_requirement_id) AS missing_count\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = cr.requirement_id\nGROUP BY s.student_id, s.student_name, c.category_name\nORDER BY missing_count DESC, s.student_name;\n\nstudent_id\n\nstudent_name\n\nrequired_count\n\nuploaded_count\n\nmissing_count\n\n1\n\nJuana Santita\n\n6\n\n5\n\n1\n\n2\n\nMark Santos\n\n6\n\n3\n\n3\n\nExplanation and relevance: This query summarizes required, recorded, uploaded, completed, and missing\nrequirements per student.\nDifficult SQL 3: Pending Requirement Aging Report - Follow-up / Monitoring Report\nWITH requirement_status AS (\nSELECT s.student_id,\ns.student_name,\n\n31\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nr.requirement_name,\nsr.status,\nsr.uploaded_at,\nROW_NUMBER() OVER (\nPARTITION BY s.student_id, r.requirement_id\nORDER BY COALESCE(sr.uploaded_at, '1900-01-01') DESC\n) AS rn\nFROM students s\nJOIN category_requirements cr ON cr.category_id = s.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr\nON sr.student_id = CAST(s.student_id AS CHAR)\nAND sr.requirement_id = r.requirement_id\n)\nSELECT student_id,\nstudent_name,\nrequirement_name,\nCOALESCE(status, 'MISSING') AS status_result,\nuploaded_at,\nCASE\nWHEN uploaded_at IS NULL THEN NULL\nELSE DATEDIFF(CURDATE(), DATE(uploaded_at))\nEND AS days_since_upload\nFROM requirement_status\nWHERE rn = 1\nAND (status IS NULL OR status = 'PENDING')\nORDER BY student_name, requirement_name;\n\nstudent_id\n\nstudent_name\n\nrequirement_name\n\nstatus_result\n\ndays_since_upload\n\n1\n\nJuana Santita\n\nValid ID\n\nPENDING\n\n5\n\n2\n\nMark Santos\n\nTranscript\n\nMISSING\n\nNULL\n\nExplanation and relevance: This query uses a CTE and window function to identify the latest requirement\nstatus and highlight pending or missing requirements for follow-up.\n\n4.5 SQL Code / DDL Schema\nSQL DDL Schema for ADAMS\nCREATE DATABASE IF NOT EXISTS doc_admission_db;\nUSE doc_admission_db;\nCREATE TABLE users (\nuser_id INT PRIMARY KEY AUTO_INCREMENT,\nusername VARCHAR(50) NOT NULL UNIQUE,\npassword VARCHAR(100) NOT NULL,\nemail VARCHAR(100),\nfull_name VARCHAR(100),\nphone VARCHAR(20),\nis_active TINYINT(1) NOT NULL DEFAULT 1,\ncreated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\nlast_login DATETIME,\n\n32\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nrole VARCHAR(20) NOT NULL,\nCHECK (role IN ('superadmin','staff'))\n);\nCREATE TABLE student_categories (\ncategory_id INT PRIMARY KEY AUTO_INCREMENT,\ncategory_name VARCHAR(100) NOT NULL UNIQUE,\nsort_order INT DEFAULT 0\n);\nCREATE TABLE students (\nstudent_id INT PRIMARY KEY AUTO_INCREMENT,\nuser_id INT,\nstudent_name VARCHAR(100),\nlast_name VARCHAR(100) NOT NULL,\nfirst_name VARCHAR(100) NOT NULL,\nmiddle_name VARCHAR(100),\nbirth_date DATE,\nemail VARCHAR(100),\ncategory_id INT,\nremarks VARCHAR(255),\nphone VARCHAR(20),\nUNIQUE KEY uk_students_name_bdate (student_name, birth_date),\nUNIQUE KEY uk_student_fullname (last_name, first_name, middle_name, birth_date),\nFOREIGN KEY (category_id) REFERENCES student_categories(category_id)\nON DELETE SET NULL ON UPDATE CASCADE,\nFOREIGN KEY (user_id) REFERENCES users(user_id)\nON DELETE SET NULL ON UPDATE CASCADE\n);\nCREATE TABLE requirement_types (\nrequirement_id INT PRIMARY KEY AUTO_INCREMENT,\nrequirement_name VARCHAR(100) NOT NULL UNIQUE,\ndescription VARCHAR(255)\n);\nCREATE TABLE category_requirements (\ncategory_id INT NOT NULL,\nrequirement_id INT NOT NULL,\nPRIMARY KEY (category_id, requirement_id),\nFOREIGN KEY (category_id) REFERENCES student_categories(category_id)\nON DELETE CASCADE ON UPDATE CASCADE,\nFOREIGN KEY (requirement_id) REFERENCES requirement_types(requirement_id)\nON DELETE CASCADE ON UPDATE CASCADE\n);\nCREATE TABLE student_requirements (\nstudent_requirement_id INT PRIMARY KEY AUTO_INCREMENT,\nstudent_id VARCHAR(20) NOT NULL,\nrequirement_id INT NOT NULL,\nfile_name VARCHAR(255),\nfile_path VARCHAR(500),\nfile_content LONGBLOB,\nmime_type VARCHAR(100),\nfile_size BIGINT,\nuploaded_by INT,\nstatus VARCHAR(50),\nupload_date DATE,\nuploaded_at DATETIME,\nUNIQUE KEY uk_student_req (student_id, requirement_id),\nINDEX idx_sr_requirement (requirement_id),\nINDEX idx_sr_status (status),\nINDEX idx_sr_composite (student_id, requirement_id, file_name)\n\n33\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n);\nCREATE TABLE documents (\ndocument_id INT PRIMARY KEY AUTO_INCREMENT,\nstudent_id VARCHAR(20),\ndocument_type VARCHAR(50),\nfile_path VARCHAR(255),\ntracking_number VARCHAR(50),\nstatus VARCHAR(20),\ndate_submitted DATETIME,\nremarks VARCHAR(255),\nstudent_pk INT NOT NULL,\nFOREIGN KEY (student_pk) REFERENCES students(student_id)\nON DELETE CASCADE ON UPDATE CASCADE\n);\nCREATE TABLE activity_log (\nlog_id INT PRIMARY KEY AUTO_INCREMENT,\nuser_id INT NOT NULL,\nusername VARCHAR(100) NOT NULL,\naction VARCHAR(50) NOT NULL,\nmodule VARCHAR(50) NOT NULL,\ndescription TEXT NOT NULL,\nlog_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\nFOREIGN KEY (user_id) REFERENCES users(user_id)\nON DELETE CASCADE,\nCHECK (action IN ('ADD','UPDATE','DELETE','REPLACE','UPLOAD','ARCHIVE')),\nCHECK (module IN ('Students','Users','Categories','Requirements','Uploads','Profile'))\n);\nCREATE TABLE print_logs (\nlog_id INT PRIMARY KEY AUTO_INCREMENT,\nref_no VARCHAR(100) NOT NULL UNIQUE,\nstudent_id INT,\ndocument_type VARCHAR(50) NOT NULL,\nprinted_by INT,\nprinted_by_name VARCHAR(100),\nprinted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\ncampus_code VARCHAR(10) NOT NULL DEFAULT 'MN0',\nFOREIGN KEY (student_id) REFERENCES students(student_id)\nON DELETE SET NULL,\nFOREIGN KEY (printed_by) REFERENCES users(user_id)\nON DELETE SET NULL,\nCHECK (document_type IN ('STUDENT_REPORT','ALL_STUDENTS_REPORT'))\n);\nCREATE TABLE password_reset_tokens (\nid INT PRIMARY KEY AUTO_INCREMENT,\nuser_id INT NOT NULL,\ntoken VARCHAR(64) NOT NULL UNIQUE,\nexpires_at DATETIME NOT NULL,\nused TINYINT(1) DEFAULT 0,\ncreated_at DATETIME DEFAULT CURRENT_TIMESTAMP,\nFOREIGN KEY (user_id) REFERENCES users(user_id)\nON DELETE CASCADE\n);\nCREATE TABLE archived_students (\narchive_id INT PRIMARY KEY AUTO_INCREMENT,\nstudent_id INT NOT NULL,\nstudent_name VARCHAR(255),\nlast_name VARCHAR(100),\nfirst_name VARCHAR(100),\n\n34\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\nmiddle_name VARCHAR(100),\nemail VARCHAR(255),\nphone VARCHAR(50),\nbirth_date DATE,\ncategory_id INT,\nremarks TEXT,\narchived_at DATETIME DEFAULT CURRENT_TIMESTAMP,\narchived_by INT\n);\n\n35\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nChapter 5. Program Requirements and Deployment\n5.1 Hardware Requirements\nTable 13. Hardware requirements\nHardware Component\n\nRecommended Requirement\n\nDevelopment / Demonstration Computer\n\nIntel Core i3 / Ryzen 3 or higher; 4 GB RAM minimum, 8 GB\nrecommended; at least 5 GB free storage; Windows 10/11, Linux,\nor macOS.\n\nApplication/Database Server for LAN Demo\n\nDual-core CPU or higher; 8 GB RAM recommended; 20 GB\nstorage or higher; reliable LAN connection.\n\nClient Device\n\nDesktop/laptop with updated web browser and network access to\nthe application server.\n\nBackup Storage\n\nUSB drive, external drive, or cloud storage for source code, SQL\ndumps, screenshots, and project documentation.\n\n5.2 Software Requirements\nTable 14. Software requirements\nSoftware Component\n\nRecommended Requirement\n\nOperating System\n\nWindows 10/11, Linux, or macOS for development and testing.\n\nApplication Server\n\nApache Tomcat or compatible Java web server for JSP/Servlet\ndeployment.\n\nProgramming Stack\n\nJava, JSP/Servlets, Maven project structure, DAO/model/servlet\nclasses.\n\nDatabase Server\n\nMySQL 8.0 or MariaDB compatible server.\n\nDatabase Connector\n\nMySQL Connector/J JDBC driver.\n\nDevelopment Tools\n\nJava JDK, Apache Maven, IDE such as IntelliJ\nIDEA/Eclipse/NetBeans, MySQL Workbench or phpMyAdmin, and\nGit if available.\n\nBrowser\n\nGoogle Chrome, Microsoft Edge, Mozilla Firefox, or equivalent\nmodern browser.\n\nER Modeling / Diagram Tools\n\nDraw.io, Lucidchart, MySQL Workbench, or equivalent\nERD/EERD modeling tool.\n\nSecurity Tools/Features\n\nPassword hashing utility, role-based accounts, reset token expiry,\nand activity logging.\n\n5.3 Deployment and Backup Requirements\n Create the database doc_admission_db and run the ADAMS DDL/schema script before launching the\napplication.\n Configure the database connection settings in the application according to the local MySQL/MariaDB\nusername, password, host, and port.\n Deploy the compiled web application to Apache Tomcat or run it through the configured development\nenvironment.\n\n36\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n Test login, dashboard, student management, categories, requirements, uploads, reports, activity logs,\nand user management before final presentation.\n Keep a copy of the source code package, database dump, executable/deployable files, and final\ndocumentation in both USB and cloud storage as suggested by the class requirement.\n\nReferences\nPolytechnic University of the Philippines Open University System. (2024). CAEPUP-OUS application form.\nInternal admission document.\nPolytechnic University of the Philippines. (2026). DBMS project final documentation format and project\nrequirements. Course requirement materials.\nADAMS project team. (2026). Admission Document and Applicant Management System source code and\ndatabase package. Unpublished final project files.\n\n37\n\n\fRepublic of the Philippines\n\nPOLYTECHNIC UNIVERSITY OF THE PHILIPPINES\nOpen University System\n\n______________________________________________________________________________________\n______\n\nAppendices\nAppendix A. Source Code and Database Package Contents\nThe submitted compressed package includes the ADAMS application source code and database files. The\nfollowing summary helps the panel verify that the documentation is consistent with the actual project\npackage.\nTable 15. Source code and database package contents\nPackage Area\n\nFile/Folder Reference\n\nPurpose\n\nMain application folder\n\nADAMS - VANDAM/doc_ad_sys\n\nContains Java web application files, Maven\nstructure, JSP pages, servlets, DAO\nclasses, models, utilities, and web assets.\n\nDatabase folder\n\nADAMS_db\n\nContains SQL dump files for the\noperational database tables.\n\nJava DAO classes\n\ndao/*.java\n\nContains data access classes for users,\nstudents, requirements, uploads, logs,\ndashboard, printing, and archives.\n\nJava model classes\n\nmodel/*.java\n\nContains object representations of users,\nstudents, categories, requirements, logs,\nand uploaded files.\n\nServlet classes\n\nservlet/*.java\n\nHandles login, dashboard, student\nmanagement, requirements, uploads,\nreports, verification, and user management\nworkflows.\n\nJSP pages\n\nlogin.jsp, dashboard.jsp, students.jsp,\nuploads.jsp, archives.jsp, categories.jsp,\nrequirements.jsp, activity-log.jsp, usermanagement.jsp\n\nPresents the web user interface pages\nshown in the screenshots.\n\nDatabase dump files\n\ndoc_admission_db_users.sql, students.sql,\nstudent_categories.sql,\nrequirement_types.sql,\ncategory_requirements.sql,\nstudent_requirements.sql, documents.sql,\nactivity_log.sql, print_logs.sql,\npassword_reset_tokens.sql,\narchived_students.sql\n\nProvides the SQL table data/structure used\nfor the ADAMS database package.\n\nBackup/support file\n\nstudents_backup\n\nExcluded from the normalized operational\nmodel because it is a support/backup\ntable.\n\n38\n\n\f"
  },
  "sqlChallenges": [
    {
      "q": "Show all tables in the selected database.",
      "answer": "SHOW TABLES;",
      "regex": "^\\s*SHOW\\s+TABLES\\s*;?\\s*$",
      "hint": "Use SHOW TABLES;"
    },
    {
      "q": "Check the structure of the students table.",
      "answer": "DESCRIBE students;",
      "regex": "^\\s*(DESCRIBE|DESC)\\s+students\\s*;?\\s*$",
      "hint": "DESCRIBE shows columns and keys."
    },
    {
      "q": "Retrieve all records from students.",
      "answer": "SELECT * FROM students;",
      "regex": "^\\s*SELECT\\s+\\*\\s+FROM\\s+students\\s*;?\\s*$",
      "hint": "Use SELECT * FROM table_name;"
    },
    {
      "q": "Count all student records.",
      "answer": "SELECT COUNT(*) AS total_students FROM students;",
      "regex": "^\\s*SELECT\\s+COUNT\\s*\\(\\s*\\*\\s*\\)(\\s+AS\\s+\\w+)?\\s+FROM\\s+students\\s*;?\\s*$",
      "hint": "COUNT(*) counts rows."
    },
    {
      "q": "Search students with last name Santos.",
      "answer": "SELECT * FROM students WHERE last_name LIKE '%Santos%';",
      "regex": "^\\s*SELECT\\s+\\*\\s+FROM\\s+students\\s+WHERE\\s+last_name\\s+LIKE\\s+'%Santos%'\\s*;?\\s*$",
      "hint": "LIKE searches text patterns."
    }
  ],
  "flashcards": [
    {
      "front": "What is ADAMS?",
      "back": "Admission Document and Applicant Management System. It manages admission records and document requirements using a relational database."
    },
    {
      "front": "What is a primary key?",
      "back": "A primary key uniquely identifies each record. In ADAMS, students.student_id identifies each student."
    },
    {
      "front": "What is a foreign key?",
      "back": "A foreign key links one table to another. Example: students.category_id links to student_categories.category_id."
    },
    {
      "front": "What is cardinality?",
      "back": "Cardinality describes how many records in one table can relate to records in another table, such as 1:M or M:N."
    },
    {
      "front": "What is category_requirements?",
      "back": "It is a bridge table connecting student_categories and requirement_types for category-based checklists."
    },
    {
      "front": "What is 1NF?",
      "back": "1NF removes repeating groups and makes values atomic. One requirement should be one row, not Requirement1/Requirement2 columns."
    },
    {
      "front": "What is 2NF?",
      "back": "2NF separates core data by purpose, such as students, categories, requirements, and student requirement records."
    },
    {
      "front": "What is 3NF?",
      "back": "3NF separates indirect/supporting data such as users, activity logs, print logs, reset tokens, documents, and archives."
    },
    {
      "front": "How do you view all tables?",
      "back": "SHOW TABLES;"
    },
    {
      "front": "How do you check table structure?",
      "back": "DESCRIBE students;"
    }
  ]
};
