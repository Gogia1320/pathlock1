# Task Management System

A **full-stack Task Management System** built with **ASP.NET Core (C#)** for the backend and **React + TypeScript + Tailwind CSS (Vite)** for the frontend.  
It allows users to manage tasks efficiently — add, view, and organize tasks with clean UI and robust backend APIs.

---

##  Project Structure

├── README.md
├── backend/
│ └── TaskManagement/
│ ├── Controllers/
│ ├── Models/
│ ├── Services/
│ ├── Program.cs
│ ├── appsettings.json
│ └── TaskManagement.csproj
└── frontend/
├── src/
│ ├── components/
│ │ ├── AddTask.tsx
│ │ ├── TaskItem.tsx
│ │ └── TaskList.tsx
│ ├── App.tsx
│ └── main.tsx
├── package.json
└── vite.config.ts

---

## Setup & Installation

## Backend (ASP.NET Core)

1. Navigate to backend:
   ```bash
   cd backend/TaskManagement

2. Restore dependencies:
    ```bash
    dotnet restore

3. Run the backend server:
    ```bash
    dotnet run
4.The API will start at:
  https://localhost:5298

once running you can test API routes at:
   https://localhost:5298/swagger

## Frontend (React + Vite + TypeScript)
1. Navigate to frontend:
     ```bash 
     cd frontend
2. Install dependencies:
     ```bash
     npm install
3. Start the development server:
    ```bash
    npm run dev
4. The frontend will be available at:
   http://localhost:5173

## Tech Stack
| Layer                 | Technologies Used                     |
| --------------------- | ------------------------------------- |
| **Frontend**          | React, TypeScript, Tailwind CSS, Vite |
| **Backend**           | ASP.NET Core 8.0, C#                  |
| **API Communication** | RESTful APIs                          |
| **Styling**           | Tailwind CSS                          |
| **Version Control**   | Git & GitHub                          |

## Endpoints:
GET /api/tasks
POST/api/tasks
PUT/api/tasks/{id}
DELETE /api/tasks/{id}

Folder Explanation 
1. Controllers/ → Defines all API endpoints.
2. Models/ → Contains data models.
3. Services/ → Handles logic and task scheduling.
4. frontend/src/components → Contains React components for UI.
5. App.tsx → Main app orchestrating components and API calls.



