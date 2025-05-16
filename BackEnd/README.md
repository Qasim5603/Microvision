# MicroVision Backend

This is the backend part of the MicroVision application - a histopathology image analysis platform with patient, pathologist, and admin dashboards.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Set up a PostgreSQL database and update the `.env` file with your database connection string:
```
DATABASE_URL=postgresql://username:password@localhost:5432/microvision
```

3. Start the development server:
```bash
npm run dev
```

The server will be available at http://localhost:5000

## Features

- RESTful API for the MicroVision application
- User authentication and session management
- Analysis storage and retrieval
- Resource management
- Appointment scheduling
- Video consultation coordination

## Project Structure

- `server/` - Express server implementation
  - `routes.ts` - API route handlers
  - `storage.ts` - Data access layer
  - `db.ts` - Database connection
  - `types.ts` - TypeScript type definitions
- `shared/` - Shared schema and types used by both frontend and backend