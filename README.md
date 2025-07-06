# 🧠 Skill Validator App

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing skills and validating sub-skills.  
This project helps teams track progress and evaluate skills based on validation logic with priority weighting.

---

## 🚀 Features

- Add and manage skills with subskills
- Subskills have a title, validation status, and priority (low, medium, high)
- Automatic skill validation logic based on subskill status
- Role-based structure possible in future versions
- Frontend built with **React + Tailwind CSS**
- Backend built with **Express + Mongoose**
- Real-time feedback with **react-hot-toast**
- Validation using **Formik + Yup**

---

## ⚙️ Tech Stack

| Layer      | Tech                            |
|------------|---------------------------------|
| Frontend   | React, Tailwind CSS, Formik, Yup, Axios, React Router |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB (via Mongoose)          |
| Auth       | (optional for future) JWT       |
| UI Alerts  | React Hot Toast                 |

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/BouzirJawad/gestion-de-competences.git
cd gestion-de-competences

# 2. Install server
cd backend
npm install

# 3. Start backend server
npm run dev

# 4. In new terminal: install frontend
cd ../frontend
npm install

# 5. Start React frontend
npm run dev
