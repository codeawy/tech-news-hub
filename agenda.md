## 🧭 Our Scope

This project focuses on implementing a secure and modern authentication and authorization system using **Next.js**.  
Below is the breakdown of core functionalities and technologies within our scope:

---

### 🔐 Authentication Features
- **Email & Password Login/Register**  
  Users can sign up and log in using traditional credentials, with proper form validation and error handling.

- **Magic Link Authentication**  
  Passwordless login via email link for a seamless user experience.

- **OAuth (Google)**  
  Support for third-party authentication using Google OAuth 2.0 — allowing users to sign in with their Google accounts.

---

### 🧑‍💼 Authorization & Access Control
- **RBAC (Role-Based Access Control)**  
  Define user roles (e.g., Admin, Editor, Viewer) and assign permissions to protect routes and features accordingly.

---

### ⚙️ Middleware Integration
- **Next.js Middleware**  
  Implement middleware to:
  - Protect private routes
  - Redirect unauthorized users
  - Inject user session data into requests
