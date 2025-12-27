# 📝 Technical Article Publishing System (MERN Stack)

> A robust, role-based Content Management System (CMS) designed for the verification and publication of technical articles.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)
![Status](https://img.shields.io/badge/status-Complete-success.svg)

## 📖 Overview

The **Technical Article Publishing System** is a web-based platform built to facilitate the creation, management, and dissemination of technical knowledge. Developed as a **Final Year Major Project**, it addresses the issue of unregulated content on standard blogging sites by enforcing a strict **Admin-Writer workflow**.

Unlike generic CMS platforms, this system integrates **Role-Based Access Control (RBAC)** to ensure that content is drafted by Writers but must be reviewed and approved by an Admin before becoming public.

## ✨ Key Features

* **🔐 Role-Based Access Control (RBAC):**
    * **Admin:** Superuser privileges to manage users, approve/reject drafts, and delete content.
    * **Writer:** Dedicated dashboard to create, edit, and manage personal drafts.
    * **Reader:** Public access to view and read published articles.
* **🛡️ Secure Authentication:**
    * Stateless session management using **JSON Web Tokens (JWT)**.
    * Secure password hashing using **Bcrypt.js**.
* **🚀 Modern Architecture:**
    * **Frontend:** React.js (Vite) for a fast, responsive Single Page Application (SPA).
    * **Backend:** Node.js & Express REST API with custom middleware protection.
    * **Database:** MongoDB for flexible, document-oriented storage.
* **📝 Content Lifecycle:** Implements a logical flow: `Draft` -> `Pending Review` -> `Published`.

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Dynamic User Interface |
| **Backend** | Node.js, Express.js | RESTful API Server |
| **Database** | MongoDB (Atlas) | NoSQL Data Storage |
| **Auth** | JWT, Bcrypt.js | Security & Encryption |
| **Styling** | CSS3 | Custom Responsive Design |

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v14 or higher)
* MongoDB (Local or Atlas Connection String)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/mern-technical-publishing-system.git](https://github.com/your-username/mern-technical-publishing-system.git)
cd mern-technical-publishing-system
