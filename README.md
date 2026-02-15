# ✦ Todo App — Full-Stack with Authentication

A modern, full-stack Todo application with **user authentication**, built with React and Spring Boot.

🔗 **[Live Demo](https://todo-app-seven-taupe-85.vercel.app)** · 💻 **[Source Code](https://github.com/tronkrish/todo-app)**

---

## ✨ Features

- 🔐 **User Authentication** — Sign Up & Sign In with JWT tokens
- 📋 **Full CRUD** — Create, Read, Update, Delete todos
- 🎯 **Priority Levels** — Low, Medium, High with color-coded badges
- 🔍 **Search & Filter** — Search by title, filter by All / Active / Completed
- 📊 **Progress Dashboard** — Visual completion tracking with progress bar
- 👤 **Per-User Isolation** — Each user sees only their own todos
- 🌙 **Dark Theme** — Premium glassmorphism UI with micro-animations
- 📱 **Responsive** — Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Vanilla CSS |
| **Backend** | Java 17, Spring Boot 3.2, Spring Security |
| **Database** | MySQL |
| **Auth** | JWT (JSON Web Tokens) |
| **Deployment** | Render (Backend), Vercel (Frontend), Aiven (MySQL) |

---

## 📁 Project Structure

```
todo-app/
├── backend/                  # Spring Boot API
│   ├── src/main/java/com/todo/
│   │   ├── model/            # User, Todo entities
│   │   ├── repository/       # JPA repositories
│   │   ├── service/          # Business logic
│   │   ├── controller/       # REST endpoints
│   │   ├── security/         # JWT utils & auth filter
│   │   └── config/           # Security & CORS config
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── api/              # API service (auth + todos)
│   │   ├── context/          # Auth context provider
│   │   ├── components/       # Header, TodoForm, TodoList
│   │   └── pages/            # LoginPage
│   └── vercel.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/signin` | Login & get JWT token |
| GET | `/api/auth/me` | Get current user info |
| GET | `/api/auth/stats` | Get total registered users |

### Todos (🔒 Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos for logged-in user |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| PATCH | `/api/todos/:id/toggle` | Toggle complete/incomplete |
| DELETE | `/api/todos/:id` | Delete a todo |

---

## 🚀 Run Locally

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+

### Backend
```bash
cd backend
# Update application.properties with your MySQL credentials
./mvnw spring-boot:run
# Server starts at http://localhost:8080
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# App opens at http://localhost:5173
```

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Backend API | [Render](https://render.com) |
| Frontend | [Vercel](https://vercel.com) |
| Database | [Aiven MySQL](https://aiven.io) (Free tier) |

### Environment Variables

**Backend (Render):**
```
SPRING_DATASOURCE_URL=jdbc:mysql://host:port/database
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
JWT_SECRET=your-secret-key
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
PORT=8080
```

**Frontend (Vercel):**
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 📸 Screenshots

| Login Page | Todo Dashboard |
|-----------|---------------|
| Sign In / Sign Up with toggle | Add, edit, complete, delete todos |

---

## 🧑‍💻 Author

**Sriprasanna** — [@tronkrish](https://github.com/tronkrish)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

