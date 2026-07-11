# Sports & Fitness Discovery Platform - Admin & Vendor Backend

This repository contains the backend systems, database schemas, and configuration models for the Sports & Fitness Discovery Platform, focusing on the Super Admin Panel and Vendor Management modules.

## Technical Summary
- **Backend Stack**: Node.js + Express.js + TypeScript
- **Database Mapping**: Prisma Client with PostgreSQL
- **Security Boundary**: Firebase Authentication + Custom User Claims Roles (RBAC)

## Project Layout
- `backend/`: Core Node.js / Express.js application workspace.
- `database/`: Folder containing Prisma models and database settings.
- `docs/`: Technical specification documents.
  - [PRD.md](file:///d:/apex%20internship/docs/PRD.md)
  - [ARCHITECTURE.md](file:///d:/apex%20internship/docs/ARCHITECTURE.md)
- `postman/`: Postman API test collection files.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database instance
- Firebase Project setup

### Setup Steps
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install the required packages:
   ```bash
   npm install
   ```
3. Set up your `.env` configuration:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sports_fitness?schema=public"
   PORT=5000
   FIREBASE_PROJECT_ID="your-firebase-project-id"
   FIREBASE_PRIVATE_KEY="your-firebase-private-key"
   FIREBASE_CLIENT_EMAIL="your-firebase-client-email"
   ```
4. Push the schema to your PostgreSQL database:
   ```bash
   npx prisma db push
   ```
5. Run the database seed script to populate mock metrics:
   ```bash
   npx prisma db seed
   ```
6. Start the local server in development mode:
   ```bash
   npm run dev
   ```
