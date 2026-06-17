window.ADAMS_DATA = {
  "meta": {
    "source": "Actual ADAMS System n DB.rar SQL dump parsed locally",
    "counts": {
      "users": 9,
      "student_categories": 6,
      "students": 1309,
      "requirement_types": 7,
      "category_requirements": 7,
      "student_requirements": 57,
      "documents": 0,
      "activity_log": 148,
      "print_logs": 747,
      "password_reset_tokens": 0,
      "archived_students": 3
    },
    "note": "Real SQL data used. Student and log displays are limited for browser readability. Password hashes/tokens are hidden."
  },
  "schema": [
    {
      "table": "users",
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
      "count": 9
    },
    {
      "table": "student_categories",
      "columns": [
        "category_id",
        "category_name",
        "sort_order"
      ],
      "count": 6
    },
    {
      "table": "students",
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
      "count": 1309
    },
    {
      "table": "requirement_types",
      "columns": [
        "requirement_id",
        "requirement_name",
        "description"
      ],
      "count": 7
    },
    {
      "table": "category_requirements",
      "columns": [
        "category_id",
        "requirement_id"
      ],
      "count": 7
    },
    {
      "table": "student_requirements",
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
      "count": 57
    },
    {
      "table": "documents",
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
      "count": 0
    },
    {
      "table": "activity_log",
      "columns": [
        "log_id",
        "user_id",
        "username",
        "action",
        "module",
        "description",
        "log_time"
      ],
      "count": 148
    },
    {
      "table": "print_logs",
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
      "count": 747
    },
    {
      "table": "password_reset_tokens",
      "columns": [
        "id",
        "user_id",
        "token",
        "expires_at",
        "used",
        "created_at"
      ],
      "count": 0
    },
    {
      "table": "archived_students",
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
      "count": 3
    }
  ],
  "tables": {
    "users": [
      {
        "user_id": 1,
        "username": "superadmin",
        "email": "valkyrie_valdez@emb.gov.ph",
        "full_name": "Kyrie",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-04-12 11:07:50",
        "last_login": "2026-05-31 18:38:01",
        "role": "superadmin"
      },
      {
        "user_id": 5,
        "username": "staff1",
        "email": "live_stream@emb.gov.ph",
        "full_name": "Registrar Staff",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-04-12 11:07:50",
        "last_login": "2026-05-31 18:47:02",
        "role": "staff"
      },
      {
        "user_id": 6,
        "username": "student1",
        "email": null,
        "full_name": null,
        "phone": null,
        "is_active": 1,
        "created_at": "2026-04-12 11:07:50",
        "last_login": null,
        "role": "student"
      },
      {
        "user_id": 11,
        "username": "registrar",
        "email": "valkyriefernandbvaldez@iskolarngbayan.pup.edu.ph",
        "full_name": "Registrar",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-04-15 20:15:54",
        "last_login": "2026-05-30 21:57:19",
        "role": "admin"
      },
      {
        "user_id": 12,
        "username": "dean",
        "email": "angelikanacorda@iskolarngbayan.pup.edu.ph",
        "full_name": "Angelika Nakorda",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-04-18 14:51:59",
        "last_login": "2026-04-18 14:52:37",
        "role": "admin"
      },
      {
        "user_id": 13,
        "username": "chairperson",
        "email": "merlynarlante@iskolarngbayan.pup.edu.ph",
        "full_name": "Merlyn Arlante",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-05-19 20:24:58",
        "last_login": "2026-05-19 20:29:17",
        "role": "admin"
      },
      {
        "user_id": 14,
        "username": "cheerleader",
        "email": "paulehttealvarez@iskolarngbayan.pup.edu.ph",
        "full_name": "Paulehtte Alvarez",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-05-19 20:26:15",
        "last_login": "2026-05-19 20:28:47",
        "role": "admin"
      },
      {
        "user_id": 15,
        "username": "president",
        "email": "renzkriziahpmendoza@iskolarngbayan.pup.edu.ph",
        "full_name": "Renz Kriziah Mendoza",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-05-19 20:27:11",
        "last_login": "2026-05-19 20:28:17",
        "role": "admin"
      },
      {
        "user_id": 16,
        "username": "test",
        "email": "mnkylazy@gmail.com",
        "full_name": "Test Account",
        "phone": 9123456789,
        "is_active": 1,
        "created_at": "2026-05-24 13:14:01",
        "last_login": null,
        "role": "staff"
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
        "category_name": "Sophomore",
        "sort_order": 2
      },
      {
        "category_id": 3,
        "category_name": "Junior",
        "sort_order": 3
      },
      {
        "category_id": 4,
        "category_name": "Senior",
        "sort_order": 4
      },
      {
        "category_id": 5,
        "category_name": "Transferee",
        "sort_order": 5
      },
      {
        "category_id": 6,
        "category_name": "Returning",
        "sort_order": 6
      }
    ],
    "students": [
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "email": "prudencio196@dummy.edu",
        "phone": 9221234696,
        "category_id": 1,
        "remarks": "Dummy record",
        "category_name": "Freshman"
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "email": "quirina197@dummy.edu",
        "phone": 9221234697,
        "category_id": 1,
        "remarks": "Dummy record",
        "category_name": "Freshman"
      },
      {
        "student_id": 1,
        "student_name": "Juan dela Cruz",
        "email": "juandelacruz@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "Working student",
        "category_name": "Sophomore"
      },
      {
        "student_id": 3,
        "student_name": "Pedro Pascal",
        "email": "juandelacruz@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "Incomplete requirements",
        "category_name": "Sophomore"
      },
      {
        "student_id": 31,
        "student_name": "Fukushima Tsunami",
        "email": "tsunami101@gmail.com",
        "phone": 9123456789,
        "category_id": 3,
        "remarks": "Incomplete",
        "category_name": "Junior"
      },
      {
        "student_id": 32,
        "student_name": "Karla Katrina Detera",
        "email": "karlakatrinadetera@iskolarngbayan.pup.edu.ph",
        "phone": 9123456789,
        "category_id": 3,
        "remarks": "Maganda at sexy",
        "category_name": "Junior"
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "email": "manual_quezon@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 4,
        "remarks": "",
        "category_name": "Senior"
      },
      {
        "student_id": 47,
        "student_name": "Maria Santos",
        "email": "maria02@dummy.edu",
        "phone": 9171234502,
        "category_id": 4,
        "remarks": "Senior",
        "category_name": "Senior"
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "email": "lorenzo21@dummy.edu",
        "phone": 9181234521,
        "category_id": 5,
        "remarks": "Dummy record",
        "category_name": "Transferee"
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "email": "isabella22@dummy.edu",
        "phone": 9181234522,
        "category_id": 5,
        "remarks": "Dummy record",
        "category_name": "Transferee"
      },
      {
        "student_id": 86,
        "student_name": "Dominic Aguilar",
        "email": "dominic41@dummy.edu",
        "phone": 9191234541,
        "category_id": 6,
        "remarks": "Dummy record",
        "category_name": "Returning"
      },
      {
        "student_id": 87,
        "student_name": "Pamela Villanueva",
        "email": "pamela42@dummy.edu",
        "phone": 9191234542,
        "category_id": 6,
        "remarks": "Dummy record",
        "category_name": "Returning"
      },
      {
        "student_id": 7,
        "student_name": "Atalia Kyna Valdez",
        "email": "valkyrie_valdez@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "Daughter",
        "category_name": "Sophomore"
      },
      {
        "student_id": 9,
        "student_name": "Asandro Kylo Valdez",
        "email": "kylo_valdez@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "",
        "category_name": "Sophomore"
      },
      {
        "student_id": 13,
        "student_name": "Ferdinand Bongbong Marcos",
        "email": "ferdinand_marcos@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "",
        "category_name": "Sophomore"
      },
      {
        "student_id": 14,
        "student_name": "Susie M Hartwig",
        "email": "SusieMHartwig@armyspy.com",
        "phone": null,
        "category_id": 2,
        "remarks": null,
        "category_name": "Sophomore"
      },
      {
        "student_id": 15,
        "student_name": "Maria D Thomas",
        "email": "MariaDThomas@jourrapide.com",
        "phone": null,
        "category_id": 2,
        "remarks": null,
        "category_name": "Sophomore"
      },
      {
        "student_id": 16,
        "student_name": "Carol M Cantrell",
        "email": "CarolMCantrell@armyspy.com",
        "phone": null,
        "category_id": 2,
        "remarks": null,
        "category_name": "Sophomore"
      },
      {
        "student_id": 17,
        "student_name": "Diane M Knight",
        "email": "DianeMKnight@armyspy.com",
        "phone": null,
        "category_id": 2,
        "remarks": null,
        "category_name": "Sophomore"
      },
      {
        "student_id": 18,
        "student_name": "Arlene N Loving",
        "email": "ArleneNLoving@jourrapide.com",
        "phone": null,
        "category_id": 2,
        "remarks": null,
        "category_name": "Sophomore"
      }
    ],
    "requirement_types": [
      {
        "requirement_id": 1,
        "requirement_name": "Birth Certificate",
        "description": "Photocopy and/or Original"
      },
      {
        "requirement_id": 3,
        "requirement_name": "Good Moral Certificate",
        "description": "Original"
      },
      {
        "requirement_id": 4,
        "requirement_name": "ID Picture",
        "description": "2x2"
      },
      {
        "requirement_id": 6,
        "requirement_name": "NBI Clearance",
        "description": "Original"
      },
      {
        "requirement_id": 8,
        "requirement_name": "Police Clearance",
        "description": "Original"
      },
      {
        "requirement_id": 2,
        "requirement_name": "Report Card",
        "description": "Original and/or Photocopy"
      },
      {
        "requirement_id": 9,
        "requirement_name": "Valid ID",
        "description": "Apart from NBI Clearance and Birth Certificate"
      }
    ],
    "category_requirements": [
      {
        "category_id": 1,
        "category_name": "Freshman",
        "requirement_id": 1,
        "requirement_name": "Birth Certificate"
      },
      {
        "category_id": 5,
        "category_name": "Transferee",
        "requirement_id": 1,
        "requirement_name": "Birth Certificate"
      },
      {
        "category_id": 1,
        "category_name": "Freshman",
        "requirement_id": 2,
        "requirement_name": "Report Card"
      },
      {
        "category_id": 5,
        "category_name": "Transferee",
        "requirement_id": 2,
        "requirement_name": "Report Card"
      },
      {
        "category_id": 1,
        "category_name": "Freshman",
        "requirement_id": 3,
        "requirement_name": "Good Moral Certificate"
      },
      {
        "category_id": 1,
        "category_name": "Freshman",
        "requirement_id": 4,
        "requirement_name": "ID Picture"
      },
      {
        "category_id": 5,
        "category_name": "Transferee",
        "requirement_id": 4,
        "requirement_name": "ID Picture"
      }
    ],
    "student_requirements": [
      {
        "student_id": 3,
        "student_name": "Pedro Pascal",
        "requirement_name": "Report Card",
        "status": "PENDING",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 3,
        "student_name": "Pedro Pascal",
        "requirement_name": "Good Moral Certificate",
        "status": "PENDING",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 5,
        "student_name": null,
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 8,
        "student_name": null,
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 9,
        "student_name": "Asandro Kylo Valdez",
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 10,
        "student_name": null,
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 3,
        "student_name": "Pedro Pascal",
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "requirement_name": "Birth Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "requirement_name": "Good Moral Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "requirement_name": "ID Picture",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 11,
        "student_name": "Manuel L Quezon",
        "requirement_name": "Report Card",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 12,
        "student_name": null,
        "requirement_name": "Birth Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 12,
        "student_name": null,
        "requirement_name": "Good Moral Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 12,
        "student_name": null,
        "requirement_name": "ID Picture",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 12,
        "student_name": null,
        "requirement_name": "NBI Clearance",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 12,
        "student_name": null,
        "requirement_name": "Report Card",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 13,
        "student_name": "Ferdinand Bongbong Marcos",
        "requirement_name": "Birth Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 13,
        "student_name": "Ferdinand Bongbong Marcos",
        "requirement_name": "Good Moral Certificate",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      },
      {
        "student_id": 13,
        "student_name": "Ferdinand Bongbong Marcos",
        "requirement_name": "ID Picture",
        "status": "Pending",
        "file_name": null,
        "uploaded_at": null
      }
    ],
    "documents": [],
    "activity_log": [
      {
        "log_id": 1,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Erica Tingson Valdez\" (ID: 10) | Email: erica_tingson@emb.gov.ph",
        "log_time": "2026-04-11 23:21:01"
      },
      {
        "log_id": 2,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Atalia Kyna Valdez\" (ID: 7) | Email: atalie_valdez@emb.gov.ph",
        "log_time": "2026-04-11 23:57:38"
      },
      {
        "log_id": 3,
        "user_id": 1,
        "username": "admin",
        "action": "REPLACE",
        "module": "Uploads",
        "description": "Replaced file \"pup-open-u-3.jpg\" for Student ID: 7 | Requirement ID: 7",
        "log_time": "2026-04-11 23:57:52"
      },
      {
        "log_id": 4,
        "user_id": 1,
        "username": "admin",
        "action": "REPLACE",
        "module": "Uploads",
        "description": "Replaced file \"pup_ous_2024_04_10_17_55_04.jpg\" for Student ID: 7 | Requirement ID: 8",
        "log_time": "2026-04-11 23:58:00"
      },
      {
        "log_id": 5,
        "user_id": 1,
        "username": "admin",
        "action": "REPLACE",
        "module": "Uploads",
        "description": "Replaced file \"pup-open-u-3.jpg\" for Student ID: 18 | Requirement ID: 8",
        "log_time": "2026-04-11 23:58:30"
      },
      {
        "log_id": 6,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Users",
        "description": "Updated user ID: 1 | Role: superadmin → superadmin | Active: true",
        "log_time": "2026-04-12 11:26:00"
      },
      {
        "log_id": 7,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Users",
        "description": "Updated user ID: 1 | Role: superadmin → superadmin | Active: true",
        "log_time": "2026-04-12 11:44:46"
      },
      {
        "log_id": 8,
        "user_id": 1,
        "username": "admin",
        "action": "ADD",
        "module": "Users",
        "description": "Created user: \"staff\" | Role: admin",
        "log_time": "2026-04-12 11:45:47"
      },
      {
        "log_id": 9,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Asandro Kylo Valdez\" (ID: 9) | Email: kylo_valdez@emb.gov.ph",
        "log_time": "2026-04-12 22:16:49"
      },
      {
        "log_id": 10,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Azrael Kyros Valdez\" (ID: 8) | Email: vfb.valdez@icloud.com",
        "log_time": "2026-04-12 22:16:55"
      },
      {
        "log_id": 11,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Erica Tingson Valdez\" (ID: 10) | Email: erica_tingson@emb.gov.ph",
        "log_time": "2026-04-12 22:16:59"
      },
      {
        "log_id": 12,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Manuel L. Quezon\" (ID: 11) | Email: manual_quezon@emb.gov.ph",
        "log_time": "2026-04-12 22:17:03"
      },
      {
        "log_id": 13,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Rodrigo Roa Duterte\" (ID: 12) | Email: rodrigo_duterte@emb.gov.ph",
        "log_time": "2026-04-12 22:17:06"
      },
      {
        "log_id": 14,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Students",
        "description": "Updated student: \"Ferdinand Bongbong Marcos\" (ID: 13) | Email: ferdinand_marcos@emb.gov.ph",
        "log_time": "2026-04-12 22:17:10"
      },
      {
        "log_id": 15,
        "user_id": 1,
        "username": "admin",
        "action": "ADD",
        "module": "Users",
        "description": "Created user: \"registrat\" | Role: staff",
        "log_time": "2026-04-15 20:14:57"
      },
      {
        "log_id": 16,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Users",
        "description": "Updated user ID: 10 | Role: staff → staff | Active: true",
        "log_time": "2026-04-15 20:15:22"
      },
      {
        "log_id": 17,
        "user_id": 1,
        "username": "admin",
        "action": "DELETE",
        "module": "Users",
        "description": "Deleted user: \"registrat\" (ID: 10)",
        "log_time": "2026-04-15 20:15:38"
      },
      {
        "log_id": 18,
        "user_id": 1,
        "username": "admin",
        "action": "ADD",
        "module": "Users",
        "description": "Created user: \"registrar\" | Role: staff",
        "log_time": "2026-04-15 20:15:54"
      },
      {
        "log_id": 19,
        "user_id": 11,
        "username": "registrar",
        "action": "ADD",
        "module": "Students",
        "description": "Added new student: \"Angelika Nacorda\" | Email: angelikanacorda@iskolarngbayan.pup.edu.ph",
        "log_time": "2026-04-15 20:17:50"
      },
      {
        "log_id": 20,
        "user_id": 1,
        "username": "admin",
        "action": "UPDATE",
        "module": "Users",
        "description": "Updated user ID: 11 | Role: staff → admin | Active: true",
        "log_time": "2026-04-15 20:19:03"
      }
    ],
    "print_logs": [
      {
        "ref_no": "VDM-20260417-S001-MN0-7136",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:01:12"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-3506",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:04:14"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-9995",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:04:15"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-7507",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:05:42"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-6315",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:06:11"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-6343",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:06:39"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-6839",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:29:22"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-5123",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:33:16"
      },
      {
        "ref_no": "VDM-RPT-20260417-MN0-8250",
        "student_name": null,
        "document_type": "ALL_STUDENTS_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:36:18"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-8663",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 17:45:47"
      },
      {
        "ref_no": "VDM-20260417-S001-MN0-1552",
        "student_name": "Juan dela Cruz",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 18:38:47"
      },
      {
        "ref_no": "VDM-RPT-20260417-MN0-5135",
        "student_name": null,
        "document_type": "ALL_STUDENTS_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:32:39"
      },
      {
        "ref_no": "VDM-RPT-20260417-MN0-7038",
        "student_name": null,
        "document_type": "ALL_STUDENTS_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:52:00"
      },
      {
        "ref_no": "VDM-20260417-S007-MN0-1968",
        "student_name": "Atalia Kyna Valdez",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S013-MN0-7422",
        "student_name": "Ferdinand Bongbong Marcos",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S014-MN0-2481",
        "student_name": "Susie M Hartwig",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S015-MN0-2542",
        "student_name": "Maria D Thomas",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S016-MN0-7050",
        "student_name": "Carol M Cantrell",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S017-MN0-8819",
        "student_name": "Diane M Knight",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      },
      {
        "ref_no": "VDM-20260417-S018-MN0-4103",
        "student_name": "Arlene N Loving",
        "document_type": "STUDENT_REPORT",
        "printed_by": "admin",
        "printed_at": "2026-04-17 21:55:10"
      }
    ],
    "password_reset_tokens": [],
    "archived_students": [
      {
        "archive_id": 1,
        "student_id": 12,
        "student_name": "Rodrigo Roa Duterte",
        "email": "rodrigo_duterte@emb.gov.ph",
        "phone": 9123456789,
        "category_id": 4,
        "remarks": "Noted",
        "archived_at": "2026-05-24 12:20:00",
        "archived_by": 1
      },
      {
        "archive_id": 2,
        "student_id": 46,
        "student_name": "Juan Dela Cruz",
        "email": "juan01@dummy.edu",
        "phone": 9171234501,
        "category_id": 4,
        "remarks": "Senior",
        "archived_at": "2026-05-24 13:25:27",
        "archived_by": 1
      },
      {
        "archive_id": 3,
        "student_id": 1430,
        "student_name": "Darlyn Enriquez",
        "email": "darceenriquez@gmail.com",
        "phone": 9123456789,
        "category_id": 2,
        "remarks": "Working student and best in honor.",
        "archived_at": "2026-05-31 18:44:19",
        "archived_by": 1
      }
    ],
    "missing_requirements": [
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Report Card",
        "status_result": "MISSING"
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Good Moral Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "ID Picture",
        "status_result": "MISSING"
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Report Card",
        "status_result": "MISSING"
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Good Moral Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "ID Picture",
        "status_result": "MISSING"
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "Report Card",
        "status_result": "MISSING"
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "ID Picture",
        "status_result": "MISSING"
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING"
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "Report Card",
        "status_result": "MISSING"
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "ID Picture",
        "status_result": "MISSING"
      }
    ],
    "completion_summary": [
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "required_count": 4,
        "recorded_count": 0,
        "uploaded_count": 0,
        "completed_count": 0,
        "missing_count": 4
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "required_count": 4,
        "recorded_count": 0,
        "uploaded_count": 0,
        "completed_count": 0,
        "missing_count": 4
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "required_count": 3,
        "recorded_count": 0,
        "uploaded_count": 0,
        "completed_count": 0,
        "missing_count": 3
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "required_count": 3,
        "recorded_count": 0,
        "uploaded_count": 0,
        "completed_count": 0,
        "missing_count": 3
      }
    ],
    "aging_report": [
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Report Card",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "Good Moral Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 241,
        "student_name": "Prudencio Garcia",
        "category_name": "Freshman",
        "requirement_name": "ID Picture",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Report Card",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "Good Moral Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 242,
        "student_name": "Quirina Ramos",
        "category_name": "Freshman",
        "requirement_name": "ID Picture",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "Report Card",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 66,
        "student_name": "Lorenzo Garcia",
        "category_name": "Transferee",
        "requirement_name": "ID Picture",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "Birth Certificate",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "Report Card",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      },
      {
        "student_id": 67,
        "student_name": "Isabella Tan",
        "category_name": "Transferee",
        "requirement_name": "ID Picture",
        "status_result": "MISSING",
        "uploaded_at": null,
        "days_since_upload": null
      }
    ]
  },
  "qa": [
    {
      "q": "What is the main focus of ADAMS?",
      "a": "ADAMS manages admission documents and applicant/student records using a relational database.",
      "adams": "ADAMS helps record, search, monitor, print, and archive admission records."
    },
    {
      "q": "Why is ADAMS a database project?",
      "a": "Its main features depend on tables, keys, relationships, and SQL queries.",
      "adams": "The system uses tables such as students, users, requirements, logs, and archives."
    },
    {
      "q": "What is a database?",
      "a": "An organized collection of related data that can be stored, searched, updated, and managed.",
      "adams": "ADAMS stores applicant records, requirements, user accounts, logs, and archived records."
    },
    {
      "q": "What is a DBMS?",
      "a": "Software used to create, manage, secure, and retrieve records from a database.",
      "adams": "MySQL/MariaDB manages the ADAMS database."
    },
    {
      "q": "Why use MySQL?",
      "a": "It supports relational tables, keys, joins, constraints, and reports.",
      "adams": "ADAMS uses structured related data, so MySQL is appropriate."
    },
    {
      "q": "What type of DBMS is MySQL?",
      "a": "MySQL is an RDBMS or Relational Database Management System.",
      "adams": "It stores data in related tables."
    },
    {
      "q": "What is a relational database?",
      "a": "A database that stores data in tables and connects them using keys.",
      "adams": "Students connect to categories and requirements through related tables."
    },
    {
      "q": "Why is a relational database suitable for ADAMS?",
      "a": "ADAMS has related records such as students, categories, requirements, files, users, logs, and archives.",
      "adams": "Relational design supports accurate requirement tracking."
    },
    {
      "q": "What is SQL?",
      "a": "Structured Query Language used to retrieve, insert, update, delete, and manage database data.",
      "adams": "SQL is used to pull student records and reports."
    },
    {
      "q": "What are the main SQL command categories?",
      "a": "DDL, DML, DQL, DCL, and TCL.",
      "adams": "Common ADAMS commands are CREATE, SELECT, INSERT, UPDATE, DELETE, and JOIN."
    },
    {
      "q": "What is DDL?",
      "a": "Data Definition Language; it defines or changes database structures.",
      "adams": "Examples: CREATE TABLE, ALTER TABLE, DROP TABLE."
    },
    {
      "q": "What is DML?",
      "a": "Data Manipulation Language; it changes table records.",
      "adams": "Examples: INSERT, UPDATE, DELETE."
    },
    {
      "q": "What is DQL?",
      "a": "Data Query Language; it retrieves records.",
      "adams": "The main DQL command is SELECT."
    },
    {
      "q": "What is a table?",
      "a": "A table stores related data in rows and columns.",
      "adams": "The students table stores applicant/student information."
    },
    {
      "q": "What is a field or column?",
      "a": "One data attribute in a table.",
      "adams": "first_name, email, and category_id are fields."
    },
    {
      "q": "What is a record or row?",
      "a": "One complete entry in a table.",
      "adams": "One applicant in students is one record."
    },
    {
      "q": "What is a primary key?",
      "a": "A field that uniquely identifies each record.",
      "adams": "students.student_id uniquely identifies each student."
    },
    {
      "q": "What is a foreign key?",
      "a": "A field that links one table to another.",
      "adams": "students.category_id links to student_categories.category_id."
    },
    {
      "q": "What is a unique key?",
      "a": "A constraint that prevents duplicate values.",
      "adams": "users.username must be unique."
    },
    {
      "q": "What is referential integrity?",
      "a": "It keeps table relationships valid and consistent.",
      "adams": "A student category assigned to a student must exist in student_categories."
    },
    {
      "q": "What are business rules?",
      "a": "Rules describing how records relate in the real process.",
      "adams": "One student belongs to one category when classified."
    },
    {
      "q": "Give one ADAMS business rule.",
      "a": "Each student/applicant belongs to one student category when classified.",
      "adams": "This appears in students.category_id."
    },
    {
      "q": "Why do categories need different requirements?",
      "a": "Different admission categories may require different checklists.",
      "adams": "A transferee may need different documents from a freshman."
    },
    {
      "q": "What table handles category-based requirements?",
      "a": "category_requirements.",
      "adams": "It connects student_categories and requirement_types."
    },
    {
      "q": "Why do you need category_requirements?",
      "a": "It avoids repeated checklists and resolves many-to-many relationships.",
      "adams": "One category can require many requirements and one requirement can be reused by many categories."
    },
    {
      "q": "What is a bridge table?",
      "a": "A table that connects two tables with a many-to-many relationship.",
      "adams": "category_requirements bridges categories and requirement_types."
    },
    {
      "q": "What is cardinality?",
      "a": "It describes how many records in one table relate to records in another.",
      "adams": "Examples: 1:M and M:N relationships in ADAMS."
    },
    {
      "q": "Give one 1:M relationship in ADAMS.",
      "a": "student_categories to students.",
      "adams": "One category can classify many students."
    },
    {
      "q": "Give one M:N relationship in ADAMS.",
      "a": "student_categories and requirement_types.",
      "adams": "It is implemented through category_requirements."
    },
    {
      "q": "What table stores actual requirement status?",
      "a": "student_requirements.",
      "adams": "It stores status, file name, upload date, uploaded_by, and timestamps."
    },
    {
      "q": "What is normalization?",
      "a": "Organizing data into related tables to reduce redundancy and improve consistency.",
      "adams": "ADAMS separates students, categories, requirements, users, logs, and archives."
    },
    {
      "q": "Why normalize the database?",
      "a": "To avoid duplicate data, repeating groups, and update errors.",
      "adams": "Requirements are stored in separate related tables."
    },
    {
      "q": "What is UNF?",
      "a": "Unnormalized Form with repeating groups or non-atomic values.",
      "adams": "Example: Requirement1, Status1, Requirement2, Status2 in one row."
    },
    {
      "q": "How did ADAMS apply 1NF?",
      "a": "By removing repeating groups and making values atomic.",
      "adams": "Each requirement is stored as a separate record."
    },
    {
      "q": "How did ADAMS apply 2NF?",
      "a": "By separating data based on purpose.",
      "adams": "Student, category, requirement type, and status data were separated."
    },
    {
      "q": "How did ADAMS apply 3NF?",
      "a": "By separating supporting data such as users, logs, reset tokens, documents, and archived records.",
      "adams": "Operational data is not repeated inside students."
    },
    {
      "q": "What problem happens with one big table?",
      "a": "Duplicate data, update errors, missing records, and accidental data loss.",
      "adams": "Requirement tracking becomes inconsistent."
    },
    {
      "q": "What is an update anomaly?",
      "a": "When repeated copies of data are not updated consistently.",
      "adams": "Changing a requirement name in many rows can cause inconsistency."
    },
    {
      "q": "What is an insertion anomaly?",
      "a": "When data cannot be added without unrelated data.",
      "adams": "Cannot add a new requirement type unless a student exists."
    },
    {
      "q": "What is a deletion anomaly?",
      "a": "When deleting a record accidentally removes important information.",
      "adams": "Deleting a student could lose the only record of a requirement."
    },
    {
      "q": "What is an ERD?",
      "a": "Entity Relationship Diagram showing entities, attributes, keys, and relationships.",
      "adams": "ADAMS ERD shows students, users, requirements, documents, logs, and archives."
    },
    {
      "q": "What is an EERD?",
      "a": "Enhanced ERD showing advanced concepts like specialization/generalization.",
      "adams": "ADAMS EERD shows USER specialization into Superadmin and Staff."
    },
    {
      "q": "Difference between ERD and EERD?",
      "a": "ERD shows basic entities and relationships; EERD adds subtypes and specialization.",
      "adams": "ADAMS EERD explains Superadmin and Staff as user subtypes."
    },
    {
      "q": "What is specialization in EERD?",
      "a": "Dividing a general entity into specific subtypes.",
      "adams": "USER is specialized into SUPERADMIN_USER and STAFF_USER."
    },
    {
      "q": "Who are final system users?",
      "a": "Superadmin and Staff only.",
      "adams": "Students/applicants are records, not final login users."
    },
    {
      "q": "Purpose of data dictionary?",
      "a": "It explains each table field, data type, key/constraint, and meaning.",
      "adams": "It checks consistency of ERD and SQL schema."
    },
    {
      "q": "SQL command to view all tables?",
      "a": "SHOW TABLES;",
      "adams": "Used to confirm all ADAMS tables exist."
    },
    {
      "q": "SQL command to check structure?",
      "a": "DESCRIBE table_name;",
      "adams": "Example: DESCRIBE students;"
    },
    {
      "q": "SQL command to retrieve student records?",
      "a": "SELECT. Example: SELECT * FROM students;",
      "adams": "Use specific columns for cleaner output."
    },
    {
      "q": "Why SQL/MySQL instead of NoSQL?",
      "a": "ADAMS uses structured related data needing keys, joins, constraints, and reports.",
      "adams": "Relational data fits SQL/MySQL better."
    }
  ],
  "requiredSQL": [
    {
      "level": "Simple",
      "title": "Simple SQL 1: List Student Categories - Category Management",
      "query": "SELECT category_id, category_name, sort_order\nFROM student_categories\nORDER BY sort_order, category_name;",
      "result": [
        {
          "category_id": 1,
          "category_name": "Freshman",
          "sort_order": 1
        },
        {
          "category_id": 2,
          "category_name": "Sophomore",
          "sort_order": 2
        },
        {
          "category_id": 3,
          "category_name": "Junior",
          "sort_order": 3
        },
        {
          "category_id": 4,
          "category_name": "Senior",
          "sort_order": 4
        },
        {
          "category_id": 5,
          "category_name": "Transferee",
          "sort_order": 5
        },
        {
          "category_id": 6,
          "category_name": "Returning",
          "sort_order": 6
        }
      ],
      "explain": "Retrieves the real master list of student categories from the uploaded ADAMS SQL dump."
    },
    {
      "level": "Simple",
      "title": "Simple SQL 2: List Requirement Types - Requirement Setup",
      "query": "SELECT requirement_id, requirement_name, description\nFROM requirement_types\nORDER BY requirement_name;",
      "result": [
        {
          "requirement_id": 1,
          "requirement_name": "Birth Certificate",
          "description": "Photocopy and/or Original"
        },
        {
          "requirement_id": 3,
          "requirement_name": "Good Moral Certificate",
          "description": "Original"
        },
        {
          "requirement_id": 4,
          "requirement_name": "ID Picture",
          "description": "2x2"
        },
        {
          "requirement_id": 6,
          "requirement_name": "NBI Clearance",
          "description": "Original"
        },
        {
          "requirement_id": 8,
          "requirement_name": "Police Clearance",
          "description": "Original"
        },
        {
          "requirement_id": 2,
          "requirement_name": "Report Card",
          "description": "Original and/or Photocopy"
        },
        {
          "requirement_id": 9,
          "requirement_name": "Valid ID",
          "description": "Apart from NBI Clearance and Birth Certificate"
        }
      ],
      "explain": "Shows the real admission requirement types from the uploaded ADAMS database."
    },
    {
      "level": "Simple",
      "title": "Simple SQL 3: Show Active Users - User Management",
      "query": "SELECT user_id, username, full_name, role\nFROM users\nWHERE is_active = 1\nORDER BY role, username;",
      "result": [
        {
          "user_id": 1,
          "username": "superadmin",
          "full_name": "Kyrie",
          "role": "superadmin",
          "is_active": 1
        },
        {
          "user_id": 5,
          "username": "staff1",
          "full_name": "Registrar Staff",
          "role": "staff",
          "is_active": 1
        },
        {
          "user_id": 6,
          "username": "student1",
          "full_name": null,
          "role": "student",
          "is_active": 1
        },
        {
          "user_id": 11,
          "username": "registrar",
          "full_name": "Registrar",
          "role": "admin",
          "is_active": 1
        },
        {
          "user_id": 12,
          "username": "dean",
          "full_name": "Angelika Nakorda",
          "role": "admin",
          "is_active": 1
        },
        {
          "user_id": 13,
          "username": "chairperson",
          "full_name": "Merlyn Arlante",
          "role": "admin",
          "is_active": 1
        },
        {
          "user_id": 14,
          "username": "cheerleader",
          "full_name": "Paulehtte Alvarez",
          "role": "admin",
          "is_active": 1
        },
        {
          "user_id": 15,
          "username": "president",
          "full_name": "Renz Kriziah Mendoza",
          "role": "admin",
          "is_active": 1
        },
        {
          "user_id": 16,
          "username": "test",
          "full_name": "Test Account",
          "role": "staff",
          "is_active": 1
        }
      ],
      "explain": "Identifies active users. Password hashes are intentionally hidden from the public reviewer."
    },
    {
      "level": "Moderate",
      "title": "Moderate SQL 1: Student Profile with Category - Student Search",
      "query": "SELECT s.student_id, s.student_name, s.email, s.phone, c.category_name\nFROM students s\nLEFT JOIN student_categories c ON c.category_id = s.category_id\nWHERE s.student_id = 1;",
      "result": [
        {
          "student_id": 1,
          "student_name": "Juan dela Cruz",
          "email": "juandelacruz@emb.gov.ph",
          "phone": 9123456789,
          "category_id": 2,
          "remarks": "Working student",
          "category_name": "Sophomore"
        }
      ],
      "explain": "Joins students with student_categories using actual student data."
    },
    {
      "level": "Moderate",
      "title": "Moderate SQL 2: Requirements Required per Category - Requirement Checklist",
      "query": "SELECT c.category_name, r.requirement_name, r.description\nFROM category_requirements cr\nJOIN student_categories c ON c.category_id = cr.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nWHERE c.category_id = 1\nORDER BY r.requirement_name;",
      "result": [
        {
          "category_id": 1,
          "category_name": "Freshman",
          "requirement_id": 1,
          "requirement_name": "Birth Certificate"
        },
        {
          "category_id": 1,
          "category_name": "Freshman",
          "requirement_id": 2,
          "requirement_name": "Report Card"
        },
        {
          "category_id": 1,
          "category_name": "Freshman",
          "requirement_id": 3,
          "requirement_name": "Good Moral Certificate"
        },
        {
          "category_id": 1,
          "category_name": "Freshman",
          "requirement_id": 4,
          "requirement_name": "ID Picture"
        }
      ],
      "explain": "Shows the real checklist mapping for Freshman/category_id 1."
    },
    {
      "level": "Moderate",
      "title": "Moderate SQL 3: Student Requirement Status - Upload Monitoring",
      "query": "SELECT s.student_id, s.student_name, r.requirement_name, COALESCE(sr.status, 'PENDING') AS current_status, sr.file_name, sr.uploaded_at\nFROM students s\nJOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR)\nJOIN requirement_types r ON r.requirement_id = sr.requirement_id\nWHERE s.student_id = 3\nORDER BY r.requirement_name;",
      "result": [
        {
          "student_id": 3,
          "student_name": "Pedro Pascal",
          "requirement_name": "Report Card",
          "status": "PENDING",
          "file_name": null,
          "uploaded_at": null
        },
        {
          "student_id": 3,
          "student_name": "Pedro Pascal",
          "requirement_name": "Good Moral Certificate",
          "status": "PENDING",
          "file_name": null,
          "uploaded_at": null
        },
        {
          "student_id": 3,
          "student_name": "Pedro Pascal",
          "requirement_name": "NBI Clearance",
          "status": "Pending",
          "file_name": null,
          "uploaded_at": null
        }
      ],
      "explain": "Uses real requirement status rows. student_id 3 is used because the uploaded dump has student_requirements for that student."
    },
    {
      "level": "Moderate",
      "title": "Moderate SQL 4: Print Logs with Student and User - Report Monitoring",
      "query": "SELECT pl.ref_no, s.student_name, pl.document_type, u.full_name AS printed_by, pl.printed_at\nFROM print_logs pl\nLEFT JOIN students s ON s.student_id = pl.student_id\nLEFT JOIN users u ON u.user_id = pl.printed_by\nORDER BY pl.printed_at DESC;",
      "result": [
        {
          "ref_no": "VDM-20260417-S001-MN0-7136",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:01:12"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-3506",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:04:14"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-9995",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:04:15"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-7507",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:05:42"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-6315",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:06:11"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-6343",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:06:39"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-6839",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:29:22"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-5123",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:33:16"
        },
        {
          "ref_no": "VDM-RPT-20260417-MN0-8250",
          "student_name": null,
          "document_type": "ALL_STUDENTS_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:36:18"
        },
        {
          "ref_no": "VDM-20260417-S001-MN0-8663",
          "student_name": "Juan dela Cruz",
          "document_type": "STUDENT_REPORT",
          "printed_by": "admin",
          "printed_at": "2026-04-17 17:45:47"
        }
      ],
      "explain": "Uses real print log records from the uploaded database."
    },
    {
      "level": "Difficult",
      "title": "Difficult SQL 1: Missing or Pending Requirements - Completeness Report",
      "query": "SELECT s.student_id, s.student_name, c.category_name, r.requirement_name, COALESCE(sr.status, 'MISSING') AS status_result\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nJOIN requirement_types r ON r.requirement_id = cr.requirement_id\nLEFT JOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR) AND sr.requirement_id = r.requirement_id\nWHERE sr.student_requirement_id IS NULL OR sr.status IS NULL OR sr.status IN ('PENDING','INSUFFICIENT','REJECTED')\nORDER BY s.student_name, r.requirement_name;",
      "result": [
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Report Card",
          "status_result": "MISSING"
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Good Moral Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "ID Picture",
          "status_result": "MISSING"
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Report Card",
          "status_result": "MISSING"
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Good Moral Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "ID Picture",
          "status_result": "MISSING"
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "Report Card",
          "status_result": "MISSING"
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "ID Picture",
          "status_result": "MISSING"
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING"
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "Report Card",
          "status_result": "MISSING"
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "ID Picture",
          "status_result": "MISSING"
        }
      ],
      "explain": "Compares real required documents against real student requirement records; result limited for display."
    },
    {
      "level": "Difficult",
      "title": "Difficult SQL 2: Requirement Completion Summary per Student",
      "query": "SELECT s.student_id, s.student_name, c.category_name, COUNT(cr.requirement_id) AS required_count, COUNT(sr.student_requirement_id) AS recorded_count, SUM(CASE WHEN sr.file_name IS NOT NULL THEN 1 ELSE 0 END) AS uploaded_count, SUM(CASE WHEN sr.status IN ('SUBMITTED','VERIFIED','APPROVED') THEN 1 ELSE 0 END) AS completed_count, COUNT(cr.requirement_id) - COUNT(sr.student_requirement_id) AS missing_count\nFROM students s\nJOIN student_categories c ON c.category_id = s.category_id\nJOIN category_requirements cr ON cr.category_id = c.category_id\nLEFT JOIN student_requirements sr ON sr.student_id = CAST(s.student_id AS CHAR) AND sr.requirement_id = cr.requirement_id\nGROUP BY s.student_id, s.student_name, c.category_name\nORDER BY missing_count DESC, s.student_name;",
      "result": [
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "required_count": 4,
          "recorded_count": 0,
          "uploaded_count": 0,
          "completed_count": 0,
          "missing_count": 4
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "required_count": 4,
          "recorded_count": 0,
          "uploaded_count": 0,
          "completed_count": 0,
          "missing_count": 4
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "required_count": 3,
          "recorded_count": 0,
          "uploaded_count": 0,
          "completed_count": 0,
          "missing_count": 3
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "required_count": 3,
          "recorded_count": 0,
          "uploaded_count": 0,
          "completed_count": 0,
          "missing_count": 3
        }
      ],
      "explain": "Real dashboard-style summary using uploaded ADAMS rows; display limited to 20 students."
    },
    {
      "level": "Difficult",
      "title": "Difficult SQL 3: Pending Requirement Aging Report",
      "query": "WITH requirement_status AS (...)\nSELECT student_id, student_name, requirement_name, COALESCE(status, 'MISSING') AS status_result, uploaded_at, days_since_upload\nFROM requirement_status\nWHERE rn = 1 AND (status IS NULL OR status = 'PENDING')\nORDER BY student_name, requirement_name;",
      "result": [
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Report Card",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "Good Moral Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 241,
          "student_name": "Prudencio Garcia",
          "category_name": "Freshman",
          "requirement_name": "ID Picture",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Report Card",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "Good Moral Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 242,
          "student_name": "Quirina Ramos",
          "category_name": "Freshman",
          "requirement_name": "ID Picture",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "Report Card",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 66,
          "student_name": "Lorenzo Garcia",
          "category_name": "Transferee",
          "requirement_name": "ID Picture",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "Birth Certificate",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "Report Card",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        },
        {
          "student_id": 67,
          "student_name": "Isabella Tan",
          "category_name": "Transferee",
          "requirement_name": "ID Picture",
          "status_result": "MISSING",
          "uploaded_at": null,
          "days_since_upload": null
        }
      ],
      "explain": "Shows pending/missing items from the real data. Aging is null when no upload date exists."
    }
  ]
};
