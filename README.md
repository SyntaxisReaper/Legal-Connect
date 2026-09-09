# Legal-Connect

A comprehensive full-stack platform designed to connect clients with legal professionals securely and efficiently.

## Features

- **For Clients:**
  - Browse and search lawyers by specialty, experience, and location.
  - Securely book video, audio, or chat consultations.
  - Upload case documents securely.
  - Leave ratings and reviews for lawyers post-consultation.
- **For Lawyers:**
  - Create professional profiles with specialties and credentials.
  - Manage consultation requests and appointments.
  - Track earnings via a dedicated dashboard.
  - Securely access client-uploaded case documents.
- **Admin Tools:**
  - Manage user and lawyer registrations.
  - Verify lawyer credentials.
  - Platform-wide analytics and reporting.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, Prisma ORM, SQLite
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer (Local storage)

## Getting Started

### Prerequisites
- Node.js (v18+)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database and run migrations:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js # Optional: Add seed data
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

- **Backend:** Must be deployed to a service with a **persistent disk** (e.g., Render, Railway, or a traditional VPS) because it relies on SQLite and local file storage for document uploads.
- **Frontend:** Can be deployed to any static hosting provider like Vercel, Netlify, or Cloudflare Pages.

## License
MIT
