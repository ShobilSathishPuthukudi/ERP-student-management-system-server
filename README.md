# Nexus ERP - Backend (Server)

The powerhouse of Nexus ERP. A robust Express.js API designed with **Domain-Driven Design (DDD)** and **MVC Architecture**, providing secure data orchestration and business logic for the entire ecosystem.

## 🏗️ Architecture
The server is structured into modular domains to ensure scalability and maintainability:
- **Modules**: Each domain (Auth, Student, Faculty, LMS) contains its own routes, controllers, and service layers.
- **Middleware**: Centralized security, validation, and error handling layers.
- **Utils**: Shared utilities for JWT handling, password hashing, and response formatting.

## 🛠️ Core Stack
- **Node.js & Express**: High-performance HTTP server.
- **MongoDB & Mongoose**: Flexible, schema-based data modeling.
- **JWT (JSON Web Tokens)**: Secure Access and Refresh token implementation.
- **Express-Validator**: Rigorous input sanitization and validation.
- **Winston & Morgan**: Industrial-grade logging and audit trails.

## 📦 Service Modules
- **🔐 Auth Module**: Handles dual-flow authentication.
  - *Standard*: Email/Password (Admin).
  - *Institutional*: Email/ID/DOB (Student/Faculty).
- **🎓 LMS Module**: Manages course creation, enrollment, and content serving.
- **📊 Analytics Module**: Real-time aggregation of attendance and financial records.
- **👥 User Management**: Lifecycle management for three distinct user roles.

## ⚙️ Development Setup

### 1. Installation
```bash
cd server
npm install
```

### 2. Environment Configuration
Create a `.env` file with the following:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_highly_secure_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ADMIN_EMAIL=admin@sms.com
ADMIN_PASSWORD=your_password
```

### 3. Running
```bash
# Development mode with hot-reload
npm run dev

# Standard execution
npm start
```

## 🧪 Database Seeding
The backend includes several scripts to quickly populate your database:
- `npm run seed:users`: Setup initial Admin, Faculty, and Student users.
- `node seed_lms.js`: Populate the LMS with courses and lessons.
- `npm run seed:analytics`: Generate historical attendance and financial data.

---
*Back to [Project Root](../README.md)*
