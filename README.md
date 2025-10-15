# 🎨 Sketchly

<div align="center">

![Sketchly Banner](https://img.shields.io/badge/Sketchly-Collaborative%20Whiteboard-blue?style=for-the-badge)

**A powerful online collaborative whiteboard application for real-time drawing and brainstorming**

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

[Demo](#) • [Features](#features) • [Installation](#getting-started) • [Contributing](#contributing)

</div>

---

## 📖 About

**Sketchly** is an online collaborative whiteboard application inspired by tools like Excalidraw and Tldraw. It empowers teams to draw, sketch, and brainstorm together in real-time, making visual collaboration simple, intuitive, and interactive.

Perfect for:
- 🧠 Brainstorming sessions
- 📊 Visual planning and diagramming
- 👥 Remote team collaboration
- 🎓 Online teaching and tutoring
- 🎨 Creative ideation

---

## ✨ Features

### Current Features
- ✏️ **Drawing Tools** - Freehand pen tool for sketching
- 🎨 **Color Picker** - Customize your drawing colors
- 🔐 **User Authentication** - Secure login with Email, Google, and GitHub
- 💾 **Persistent Storage** - All drawings saved to PostgreSQL database
- 📱 **Responsive Design** - Works seamlessly across devices
- 🎯 **Intuitive Interface** - Clean, modern UI built with ShadCN

### 🚀 Upcoming Enhancements
- [ ] **Shape Tools** - Rectangles, circles, lines, arrows, and more
- [ ] **Docker Compose** - One-command deployment with Dockerfile
- [ ] **Infinite Canvas** - Pan and zoom across unlimited workspace
- [ ] **Zoom Controls** - Zoom in/out for detailed work
- [ ] **Real-time Collaboration** - Live multi-user editing with WebSockets
- [ ] **Cloud Sync** - Automatic saving and syncing across devices
- [ ] **Export Options** - Export as PNG, SVG, or PDF
- [ ] **Layer Management** - Organize drawings with layers

---

## 🛠️ Tech Stack

### Monorepo
- **[Turborepo](https://turbo.build/)** - High-performance build system for monorepos

### Frontend
- **[Next.js](https://nextjs.org/)** - React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN UI](https://ui.shadcn.com/)** - Beautiful, accessible components

### Backend
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Prisma ORM](https://www.prisma.io/)** - Next-generation database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful relational database

### Authentication
- Custom authentication client with support for:
  - Email/Password
  - Google OAuth
  - GitHub OAuth

### DevOps
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher) - Required for Turborepo
- **Docker** (for database)

> **Note:** This project uses Turborepo for monorepo management and pnpm workspaces.

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tejas-pr/Sketchly.git
cd Sketchly
```

#### 2️⃣ Install Dependencies

```bash
# Install all dependencies across the monorepo
pnpm install
```

Turborepo will automatically manage the dependencies for all apps and packages.

#### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sketchly?schema=public"

# Authentication (Add your OAuth credentials)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

#### 4️⃣ Start PostgreSQL with Docker

```bash
docker run -d \
  --name sketchly-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sketchly \
  -p 5432:5432 \
  postgres:15
```

**What this does:**
- Creates a PostgreSQL container named `sketchly-db`
- Sets up database credentials (username: `postgres`, password: `postgres`)
- Creates a database named `sketchly`
- Exposes port `5432` to your local machine

#### 5️⃣ Run Database Migrations

```bash
# Generate Prisma Client
pnpm --filter=database prisma:generate

# Run migrations
pnpm --filter=database prisma:migrate
```

This will:
- Create all necessary database tables
- Generate Prisma Client for type-safe database access

#### 6️⃣ Start the Development Server

```bash
# Starts all apps in the monorepo
pnpm dev

# Or start only the web app
pnpm dev --filter=web
```

Your application should now be running at **[http://localhost:3000](http://localhost:3000)** 🎉

> **Turborepo Benefits:** Changes in shared packages will automatically trigger rebuilds in dependent apps thanks to Turborepo's intelligent caching and task orchestration.

---

## 🐳 Docker Commands

### Useful Docker Commands

```bash
# Check if PostgreSQL container is running
docker ps

# View database logs
docker logs sketchly-db

# Stop the database
docker stop sketchly-db

# Start the database again
docker start sketchly-db

# Remove the database container (caution: deletes data)
docker rm -f sketchly-db
```

---

## 🗂️ Project Structure

```
Sketchly/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/
│   │   │   ├── app/        # Next.js app directory
│   │   │   ├── components/ # React components
│   │   │   └── lib/        # Utility functions
│   │   ├── public/         # Static assets
│   │   └── package.json
│   └── docs/               # Documentation site (optional)
├── packages/
│   ├── ui/                 # Shared UI components (ShadCN)
│   ├── database/           # Prisma schema and client
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── package.json
│   ├── typescript-config/  # Shared TypeScript configs
│   └── eslint-config/      # Shared ESLint configs
├── turbo.json              # Turborepo configuration
├── pnpm-workspace.yaml     # pnpm workspace configuration
├── package.json            # Root package.json
└── README.md
```

---

## 🔧 Available Scripts

### Turborepo Commands

```bash
# Development - runs all apps in dev mode
pnpm dev

# Build - builds all apps and packages
pnpm build

# Start - starts all apps in production mode
pnpm start

# Lint - lints all apps and packages
pnpm lint

# Format - formats code across the monorepo
pnpm format

# Clean - removes all build artifacts
pnpm clean
```

### Workspace-Specific Commands

```bash
# Run dev only for web app
pnpm dev --filter=web

# Build only the web app
pnpm build --filter=web

# Run commands in specific workspace
pnpm --filter=@sketchly/database prisma:studio
```

### Database Commands

```bash
# Run database migrations
pnpm --filter=database prisma:migrate

# Generate Prisma Client
pnpm --filter=database prisma:generate

# Open Prisma Studio (database GUI)
pnpm --filter=database prisma:studio
```

### Turborepo Cache

```bash
# Clear Turborepo cache
pnpm turbo clean

# Run with cache disabled
pnpm turbo dev --no-cache
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help is appreciated.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea for a new feature? Please [open an issue](https://github.com/Tejas-pr/Sketchly/issues) with:
- Clear description of the issue/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

---

## 📝 Database Schema

Sketchly uses Prisma ORM with PostgreSQL. Key models include:

- **User** - User accounts and authentication
- **Canvas** - Whiteboard canvases
- **Drawing** - Individual drawing elements
- **Session** - User sessions

To view your database schema:
```bash
npx prisma studio
```

---

## 🔐 Authentication Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### GitHub OAuth Setup
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret to `.env`

---

## 📚 Learn More

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [ShadCN UI Components](https://ui.shadcn.com/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Tejas**
- GitHub: [@Tejas-pr](https://github.com/Tejas-pr)

---

## 🌟 Show Your Support

If you find this project helpful, please consider giving it a ⭐️ on GitHub!

---

## 📞 Contact

Have questions or suggestions? Feel free to reach out:
- Open an [issue](https://github.com/Tejas-pr/Sketchly/issues)
- Start a [discussion](https://github.com/Tejas-pr/Sketchly/discussions)

---

<div align="center">

Made with ❤️ by the Sketchly Team

**[⬆ back to top](#-sketchly)**

</div>