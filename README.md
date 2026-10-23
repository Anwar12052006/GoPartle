# GoPratle – Event Talent & Requirement Marketplace

> A production-ready full-stack event requirement wizard and marketplace connecting event hosts with verified **Event Planners**, **Performers**, and technical **Production Crew**.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_%2F_Mongoose_9-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tests](https://img.shields.io/badge/Tests-16_Passing-success?logo=jest)](https://github.com/)

---

## 📌 Overview

GoPratle is designed to streamline event hiring workflows. The platform provides an intuitive, step-by-step wizard that dynamically adapts fields based on whether the host requires an **Event Planner** (strategy & coordination), **Performer** (stage & entertainment), or **Crew** (technical & ground operations). Submitted postings are saved with strict server-side schema validations to MongoDB and displayed in a real-time requirement marketplace.

---

## ✨ Key Features

### 1. Interactive 4-Step Wizard
- **Step 1: Event Details & Category Selection**
  - Event title, multi-category selector (Event Planner, Performer, Crew), location with autocomplete indicators, and date range verification (preventing end dates before start dates).
- **Step 2: Dynamic Category-Specific Specifications**
  - **Event Planner:** Turnkey management, decor styling, guest RSVP, vendor sourcing, and target audience scale.
  - **Performer:** Band/DJ/soloist selection, musical genres, performance duration, languages, and technical rider.
  - **Crew:** Audio/lighting engineers, stage hands, riggers, shift durations, dress code, and technical certifications.
- **Step 3: Logistics & Commercials**
  - Host equipment checklist (PA system, generator, lighting, green room, Wi-Fi), call-time schedules, multi-currency budget types (Fixed, Hourly, Per Day, Negotiable).
- **Step 4: Final Verification & Inline Editing**
  - Full structured summary of event data with single-click edit navigation back to prior steps, duplicate submission prevention, and success confirmation view.

### 2. Live Requirement Marketplace
- Browse active requirements in real time.
- Filter by requirement category (**All**, **Event Planner**, **Performer**, **Crew**).
- Informative cards displaying scope tags, headcount requirements, date badges, and budget figures.

### 3. Resilient Backend Architecture
- **Schema & Business Logic Validation:** Strict validation ensuring payloads only contain fields relevant to the selected category.
- **Data Privacy & Security:** Zero internal credentials or connection strings leaked in error responses.
- **Graceful DB Degradation:** Handles MongoDB disconnections gracefully (returns HTTP 503 with user-safe error messages while keeping the health API operational).

---

## 🛠 Tech Stack

| Layer | Technology | Key Libraries |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router) | React 19, Tailwind CSS v4, Turbopack |
| **Backend** | Node.js, Express 5 | Mongoose 9, CORS, Dotenv, Nodemon |
| **Database** | MongoDB / MongoDB Atlas | Mongoose Schemas & Pre-validation Hooks |
| **Language** | JavaScript & TypeScript | ES Modules, Next.js JSX, Typed API client |

---

## 📂 Project Architecture

```
Assignment GoPartle/
├── backend/
│   ├── src/
│   │   ├── config/              # MongoDB connection & env variable loader
│   │   ├── controllers/         # Health & Requirement business controllers
│   │   ├── middleware/          # Global error handler & 404 catch-all
│   │   ├── models/              # Mongoose Requirement schema & validations
│   │   ├── routes/              # Express API route declarations
│   │   ├── app.js               # Express application initialization & middleware
│   │   └── server.js            # Server entry point & graceful shutdown
│   ├── test-suite.js            # Automated 16-point integration test runner
│   ├── test-db-failure.js       # Chaos resilience test for DB outage
│   ├── .env.example             # Backend environment template
│   └── package.json
├── frontend/
│   ├── public/                  # Static assets & brand icons
│   ├── src/
│   │   ├── app/                 # Next.js App Router (layout, page, styling)
│   │   ├── components/
│   │   │   ├── wizard/          # Stepper, 4 Step Views, Success state
│   │   │   ├── requirements/    # Live requirements feed & category filter
│   │   │   └── Icons.js         # Optimized SVG icon library
│   │   └── lib/
│   │       └── api.ts           # Centralized typed HTTP client
│   ├── .env.example             # Frontend environment template
│   └── package.json
├── .gitignore                   # Monorepo root Git ignore rules
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** ≥ 18.x
- **MongoDB** (Local instance or MongoDB Atlas URI)

---

### 1. Backend Setup

1. Open a terminal in the `backend/` directory:
   ```bash
   cd backend
   ```

2. Copy the environment template:
   ```bash
   # On macOS/Linux:
   cp .env.example .env

   # On Windows PowerShell:
   Copy-Item .env.example .env
   ```

3. Update `.env` with your MongoDB connection string if using MongoDB Atlas:
   ```ini
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/gopartle
   FRONTEND_ORIGIN=http://localhost:3000
   ```

4. Install dependencies and start the backend development server:
   ```bash
   npm install
   npm run dev
   ```
   *The backend will boot on `http://localhost:5000`.*

---

### 2. Frontend Setup

1. Open a second terminal in the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. Copy the environment template:
   ```bash
   # On macOS/Linux:
   cp .env.example .env.local

   # On Windows PowerShell:
   Copy-Item .env.example .env.local
   ```

3. Install dependencies and launch the Next.js development server:
   ```bash
   npm install
   npm run dev
   ```
   *The frontend application will run on `http://localhost:3000`.*

---

## 📡 API Reference

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Service health status & DB connectivity state | `200` |
| `POST` | `/requirements` | Create a new validated requirement | `201`, `400`, `503` |
| `GET` | `/requirements` | Fetch requirements (supports `?category=Performer`) | `200`, `503` |
| `GET` | `/requirements/:id` | Fetch specific requirement by 24-char ObjectId | `200`, `400`, `404` |

#### Example: Create Requirement (`POST /api/requirements`)

**Payload:**
```json
{
  "eventName": "InnovateTech Global Summit 2026",
  "eventType": "Corporate Conference",
  "location": "Bengaluru, Karnataka",
  "venue": "Convention Center Hall A",
  "startDate": "2026-11-10",
  "endDate": "2026-11-12",
  "category": "Event Planner",
  "categoryDetails": {
    "plannerServices": ["Full Turnkey Event Planning", "Vendor Sourcing & Management"],
    "targetAudienceSize": "Large (200-500)",
    "keyDeliverables": "Stage design, on-site event coordination"
  },
  "quantity": 2,
  "budget": 150000,
  "budgetType": "Fixed Total",
  "currency": "INR",
  "equipmentProvidedByHost": ["Stage & Elevated Platform", "High-Speed Wi-Fi & AV Connectivity"]
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Requirement posted successfully",
  "data": {
    "_id": "67b9...",
    "eventName": "InnovateTech Global Summit 2026",
    "category": "Event Planner",
    "status": "Open",
    "createdAt": "2026-10-24T00:00:00.000Z"
  }
}
```

---

## 🧪 Testing & Validation

### Backend Automated Test Suite
The project contains an automated integration test runner testing 16 distinct test cases including positive paths, edge cases, date range violations, cross-category validations, and data-leak checks.

```bash
cd backend
npm test
```

### Database Outage & Resilience Test
Verify that the API degrades gracefully with HTTP 503 instead of crashing when MongoDB is unreachable:

```bash
cd backend
npm run test:db-failure
```

### Frontend Code Quality
```bash
cd frontend
npm run lint
```

---

## 🔒 Security & Git Hygiene

- **Protected Secrets:** All `.env` and `.env.local` files containing actual database passwords or credentials are automatically ignored by Git.
- **Audited Configuration:** Safe `.env.example` templates are provided in both directories for quick onboarding.
- **Leak Protection:** Server middleware scrubs all internal MongoDB driver errors before returning JSON responses.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
