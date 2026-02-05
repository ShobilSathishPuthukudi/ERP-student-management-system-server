# Nexus ERP - Student Management System

A comprehensive Academic Operating System (ERP) built with the MERN stack, designed to streamline institutional workflows for Administrators, Faculty, and Students.

## 🚀 Overview

Nexus ERP provides a secured, high-performance environment for managing academic records, course delivery (LMS), attendance tracking, and financial operations.

### Key Features

- **Multi-Role Portal**: Tailored experiences for Admin, Faculty, and Students.
- **Advanced Authentication**:
  - **Admin/Staff**: Strict Email & Password validation.
  - **Students/Faculty**: Multi-factor identification requiring Email, Registration/Faculty ID, and Date of Birth.
- **LMS Integration**: Course marketplace, enrollment systems, and a high-fidelity course player.
- **Administrative Suite**: Financial management (fees), student/faculty lifecycle management, and real-time analytics.
- **Analytics Dashboard**: Visual data representation for institutional health and performance.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit (State Management), React Router, Tailwind CSS, Vite.
- **Backend**: Node.js, Express.js (MVC Architecture).
- **Database**: MongoDB with Mongoose ODM.
- **Security**: JWT (Access & Refresh Tokens), Bcrypt.js (Password Hashing), Express-Validator (Input Sanitization).
- **Logging**: Winston & Morgan for production-grade audit trails.

---

## 📦 Project Structure

```text
/
├── client/           # React Frontend (Vite)
│   ├── src/features/ # Redux slices (Auth, LMS, Student)
│   ├── src/pages/    # Role-based dashboards & components
│   └── src/routes/   # Protected and dynamic routing
└── server/           # Express Backend
    ├── src/modules/  # Domain-driven modules (Auth, LMS, Analytics)
    ├── src/seeders/  # Database seeding scripts
    └── src/utils/    # Shared utilities (Tokens, Hashing)
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or MongoDB Atlas)

### Backend Setup (Server)

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on the environment variables needed:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_uri
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ADMIN_EMAIL=admin@sms.com
   ADMIN_PASSWORD=AdminPass123
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup (Client)

1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🧪 Seeding Data

To populate the database with demo students, faculty, and analytics data, run the following from the server directory:

- Seed Admin: Automatically handled on server start.
- Full ERP Seed: `npm run seed:full`
- LMS Seed: `node seed_lms.js`

---

## 📄 License

This project is licensed under the ISC License.
