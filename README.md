# QR Attendance App

A QR code based attendance management system built as a Final Year Project. The system allows teachers to generate QR codes for each class session, students to scan and mark their attendance, and admins to manage the system through a web dashboard.

---

## Project Structure

```
attendance-app/
├── mobile/     # React Native app (Students & Teachers)
├── backend/    # Spring Boot REST API
└── admin/      # React web dashboard (Admin)
```

---

## How It Works

1. Teacher opens the app and starts an attendance session for their subject
2. App displays a QR code that rotates every 30 seconds
3. Students scan the QR code using their mobile app
4. Attendance is recorded and reflected instantly on dashboards
5. Admin manages students, teachers, subjects and enrollments via the web dashboard

---

## Tech Stack

### Mobile (`/mobile`)
- React Native (Expo)
- NativeWind (Tailwind CSS for React Native)
- Expo Router (file based navigation)
- Expo Camera (QR scanning)

### Backend (`/backend`)
- Java 17
- Spring Boot 3.2
- Spring Security (JWT authentication)
- Spring Data JPA
- PostgreSQL

### Admin Dashboard (`/admin`)
- React
- Coming soon

---

## Features

### Student
- View overall and subject wise attendance
- Scan QR code to mark attendance
- View detailed attendance history per subject

### Teacher
- Generate QR code per class session
- Auto rotating QR every 10 seconds (anti-cheat)
- View session history and per session attendance details

### Admin
- Manage students and teachers
- Create subjects and assign teachers
- Manage student enrollments

---

## Anti-Cheat Mechanism
- QR token rotates every 10 seconds — screenshots are useless almost instantly
- Each token is validated server side
- One scan per student per session
- Sessions have a defined time window

---

## Getting Started

### Prerequisites
- Node.js 18+
- Java 17
- PostgreSQL
- Expo CLI

### Mobile
```bash
cd mobile
npm install
npx expo start
```

### Backend
```bash
cd backend
# Configure database in src/main/resources/application.properties
./mvnw spring-boot:run
```

---

## Database Schema

```
users                → authentication and roles
students             → student profile linked to user
teachers             → teacher profile linked to user
subjects             → subjects assigned to teachers
enrollments          → students enrolled in subjects
attendance_sessions  → class sessions with QR token
attendance_records   → individual attendance per session
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/student/attendance/overview` | Student attendance summary |
| POST | `/api/student/attendance/scan` | Scan QR and mark attendance |
| GET | `/api/teacher/subjects` | Get teacher's subjects |
| POST | `/api/teacher/sessions/start` | Start a new class session |
| GET | `/api/teacher/sessions/{id}/token` | Get current rotating QR token |
| GET | `/api/admin/students` | List all students |
| POST | `/api/admin/enrollments` | Enroll student in subject |

---

## Author
Built as a Final Year Project.
