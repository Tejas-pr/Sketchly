# Sketchly

**Sketchly** is an online collaborative whiteboard application, inspired by tools like Excalidraw. It allows users to draw, sketch, and collaborate in real-time, making brainstorming and visual thinking simple and interactive.

---

## Features

- Real-time collaborative drawing
- Multiple drawing tools (shapes, pen, etc.)
- User authentication (Email, Google, GitHub)
- Responsive and intuitive interface
- Persistent storage using Prisma and PostgreSQL

---

## Tech Stack

- **Frontend:** Next.js, TailwindCSS, ShadCN UI
- **Backend:** Node.js, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** Custom auth client with social login
- **Containerization:** Docker

---

## Getting Started with Docker

This project uses **Docker** to easily run the database and manage Prisma migrations.

### 1. Start PostgreSQL with Docker

```bash
docker run -d \
  --name sketchly-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sketchly \
  -p 5432:5432 \
  postgres:15
```

- POSTGRES_USER: Database username
- POSTGRES_PASSWORD: Database password
- POSTGRES_DB: Database name
- -p 5432:5432: Exposes PostgreSQL port to host machine

### 2. Configure Prisma

Ensure your .env file has the correct database URL:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sketchly?schema=public"

### 3. Run Prisma Migrations

npx prisma migrate dev --name init

This will create the necessary tables in your PostgreSQL database.

### 4. Start the Next.js Application

pnpm install
pnpm dev

Your app should now be running at http://localhost:3000
Notes

Use docker ps to check if your PostgreSQL container is running.

Use docker logs sketchly-db to view database logs.

Prisma can be used to generate types and manage migrations with:

npx prisma generate
npx prisma migrate dev

Contributing

Contributions are welcome! Please create issues or pull requests for bug fixes, improvements, or new features.
