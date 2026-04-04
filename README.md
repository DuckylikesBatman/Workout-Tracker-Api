# Project Web API

A RESTful API built with **Node.js** and **Express.js** to manage **users**, **workouts**, **exercises**, and **feedback**.

This project demonstrates:
- CRUD operations for multiple resources
- relationships between MongoDB collections
- use of **two databases** in the same backend:
  - **MongoDB + Mongoose** for Users, Workouts, and Exercises
  - **SQLite + Sequelize** for Feedback

---

## Features

- Create, read, update, and delete **users**
- Create, read, update, and delete **workouts**
- Create, read, update, and delete **exercises**
- Create, read, update, and delete **feedback**
- Link exercises to workouts using a **many-to-many relationship**
- Populate related MongoDB documents (`user` and `exercises`) when retrieving workouts
- Centralized error handling
- 404 route handling

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **SQLite**
- **Sequelize**

---

## Project Structure

```bash
Project Web API/
│── app.js
│── database.sqlite
│── README.md
│
├── models/
│   ├── User.js
│   ├── Workout.js
│   ├── Exercise.js
│   └── FeedBack.js
│
└── routes/
    ├── userRoutes.js
    ├── workoutRoutes.js
    ├── exerciseRoutes.js
    └── FeedbackRoutes.js
