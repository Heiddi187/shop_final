# TicketHub

A full-stack event ticketing application built with React, TypeScript, Express, and PostgreSQL.

Users can browse upcoming events, purchase tickets, and view their purchased tickets through a personal account system using JWT authentication.

---

## Features

### User Features

* Browse upcoming events
* Filter events by:

  * City
  * Category
  * Venue
  * Search term
* View event details
* Create an account
* Login / Logout
* Purchase tickets
* View purchased tickets
* Track total spending and purchased events

### Technical Features

* React + TypeScript frontend
* Express + TypeScript backend
* PostgreSQL database
* JWT authentication
* Protected API routes
* Railway PostgreSQL hosting
* Railway backend deployment
* Vercel frontend deployment

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Context API
* Tailwind CSS
* Shadcn UI

### Backend

* Node.js
* Express
* TypeScript
* pg-promise
* JWT
* bcrypt

### Database

* PostgreSQL

### Deployment

* Vercel (Frontend)
* Railway (Backend + PostgreSQL)

---

## Project Structure

```text
shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── auth/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── shared/
│   └── package.json
│
└── README.md
```

---

## Local Installation

### Prerequisites

Install:

* Node.js (v20 or newer recommended)
* PostgreSQL
* Git

---

## Clone Repository

```bash
git clone https://github.com/Heiddi187/shop_final.git
cd shop_final
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=3000

PGHOST=localhost
PGPORT=5432
PGDATABASE=tickethub
PGUSER=postgres
PGPASSWORD=your_password

JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

Expected output:

```text
Connected to PostgreSQL database
Server is running on: 3000
```

---

## Database Setup

Create a PostgreSQL database.

Run the SQL schema and seed files included in the project to create:

* users
* venues
* events
* tickets

tables.

---

## Frontend Setup

Open a second terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Production Deployment

### Backend (Railway)

The backend is deployed on Railway.

Required environment variables:

```env
DATABASE_URL=<railway_database_url>
JWT_SECRET=<jwt_secret>
PORT=8080
```

Railway automatically provides:

```env
DATABASE_URL
```

which is used by the application for database connectivity.

---

### Frontend (Vercel)

The frontend is deployed on Vercel.

Required environment variable:

```env
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

Example:

```env
VITE_API_URL=https://shopfinal-production.up.railway.app
```

---

## API Endpoints

### Events

```http
GET /api/events
GET /api/events/:id
```

### Venues

```http
GET /api/venues
```

### Users

```http
POST /api/users/signup
POST /api/users/login
```

### Tickets

```http
POST /api/tickets/buy
GET /api/tickets/user
```

---

## Authentication

Authentication is handled using JSON Web Tokens (JWT).

Protected routes require:

```http
Authorization: Bearer <token>
```

The token is issued upon successful login and stored client-side.

---

## Testing

Frontend tests can be run with:

```bash
npm test
```

or

```bash
npm run test
```

depending on environment configuration.

---

## Future Improvements

* Ticket return/refund functionality
* Admin dashboard
* Event creation interface
* User profile management
* Image upload support
* Payment gateway integration
* Email confirmations

---

## Author

**Heiðar Hlöðversson**

Final project developed as part of a full-stack web development program.
