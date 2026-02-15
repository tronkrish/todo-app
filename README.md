# Todo App — Full Stack

A modern, full-stack Todo application built with **React**, **Spring Boot**, and **MySQL**.

## Project Structure

```
├── backend/          # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── frontend/         # React (Vite) UI
│   ├── src/
│   └── package.json
└── README.md
```

## Local Development

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+

### 1. MySQL Setup
```sql
CREATE DATABASE tododb;
```

### 2. Backend
```bash
cd backend
./mvnw spring-boot:run
```
API runs at `http://localhost:8080`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
UI runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint                | Description        |
|--------|------------------------|--------------------|
| GET    | /api/todos             | Get all todos      |
| POST   | /api/todos             | Create a todo      |
| PUT    | /api/todos/{id}        | Update a todo      |
| PATCH  | /api/todos/{id}/toggle | Toggle completion  |
| DELETE | /api/todos/{id}        | Delete a todo      |

## Deployment
- **Backend + MySQL**: Railway
- **Frontend**: Vercel
