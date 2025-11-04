# 🎨 Sketchly

<div align="center">

![Sketchly Banner](https://img.shields.io/badge/Sketchly-Collaborative%20Whiteboard-blue?style=for-the-badge)

**A production-ready collaborative whiteboard application with real-time drawing, AI-powered shape generation, and enterprise-grade infrastructure**

[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat-square&logo=turborepo)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![WebSockets](https://img.shields.io/badge/WebSockets-Real--time-green?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

[Live Demo](https://drawing.tejaspr.site/) • [Features](#-features) • [Architecture](#-architecture) • [Installation](#-getting-started)

</div>

DEMO VIDEO:
- 
[SKETCHLY-APP.webm](https://github.com/user-attachments/assets/518f9707-e22e-4fa0-8062-178f835827a1)

## 📖 About

**Sketchly** is a production-ready collaborative whiteboard application inspired by Excalidraw and Tldraw, built with modern web technologies and enterprise-grade architecture. It enables teams to draw, sketch, and brainstorm together in real-time with AI-powered assistance.

**🎉 Project Status: COMPLETED** - This project is fully functional and deployed to production!

### Perfect for:
- 🧠 **Brainstorming Sessions** - Collaborate with your team in real-time
- 📊 **Visual Planning** - Create diagrams and flowcharts effortlessly
- 👥 **Remote Collaboration** - Work together from anywhere in the world
- 🎓 **Online Teaching** - Interactive whiteboard for educators
- 🎨 **Creative Ideation** - Sketch ideas with AI assistance

## ✨ Features

### 🚀 Core Features (Completed)

#### Drawing & Canvas
- ✏️ **Advanced Drawing Tools** - Freehand pen, shapes (rectangles, circles, lines, arrows)
- 🎨 **Rich Color Palette** - Comprehensive color picker with custom colors
- 🔍 **Zoom Controls** - Precise zoom in/out for detailed work
- 📐 **Shape Tools** - Pre-built geometric shapes and connectors

#### Real-time Collaboration
- ⚡ **Live Multi-user Editing** - See changes from other users instantly
- 🔌 **WebSocket Integration** - Dedicated WebSocket server for real-time sync
- 👥 **Authenticated Collaboration** - Only signed-in users can collaborate
- 🚀 **Optimized Performance** - Redis caching for lightning-fast updates

#### AI-Powered Features
- 🤖 **AI Shape Generation** - LangChain integration for intelligent shape creation
- 🎯 **Natural Language Processing** - Draw shapes using text descriptions
- 🧠 **Smart Suggestions** - AI-assisted drawing recommendations

#### Authentication & Security
- 🔐 **Better Auth Integration** - Modern, secure authentication system
- 📧 **Email/Password Authentication** - Traditional login method
- 🌐 **OAuth Support** - Google and GitHub single sign-on
- 🛡️ **Session Management** - Secure user sessions with automatic refresh

#### Data Persistence
- 💾 **PostgreSQL Database** - Production-grade relational database
- 🔄 **Prisma ORM** - Type-safe database queries and migrations
- ⚡ **Redis Caching** - Fast data retrieval and real-time sync
- 📊 **Automatic Saving** - All drawings saved automatically

#### Modern Architecture
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎯 **Server Actions** - Next.js server actions instead of traditional HTTP endpoints
- 🏗️ **Monorepo Structure** - Turborepo for efficient code organization
- 🎨 **ShadCN/UI Components** - Beautiful, accessible UI library

#### DevOps & Deployment
- 🐳 **Docker Support** - Complete containerization with Docker Compose
- 🔄 **CI/CD Pipeline** - Automated testing and deployment
- 📦 **Docker Hub Integration** - Automated image builds and publishing
- ☁️ **Vercel Deployment** - Production deployment on Vercel
- 🚀 **Zero-Downtime Deploys** - Continuous deployment with rollback support

---

## 🏗️ Architecture

### Turborepo Monorepo Structure

```
Sketchly/
├── apps/
│   ├── web/                    # Next.js Frontend Application
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router
│   │   │   ├── components/    # React Components (ShadCN/UI)
│   │   │   ├── lib/           # Utilities & Helpers
│   │   │   └── actions/       # Server Actions
│   │────── Dockerfiles
│   │
│   └── websocket/              # WebSocket Server Layer
│       ├── src/
│       │   ├── handlers/      # WebSocket event handlers
│       │   ├── redis/         # Redis client configuration
│       │   └── db/            # Database integration
│
├── packages/
│   ├── database/              # Prisma ORM Package
│   │   ├── prisma/
│   │   │   ├── schema.prisma  # Database schema
│   │   │   └── migrations/    # Database migrations
│   │   └── src/               # Prisma client exports
│   │
│   ├── ui/                    # Shared UI Components (ShadCN)
│   │   └── components/        # Reusable components
│   │
│   ├── typescript-config/     # Shared TypeScript configs
│   └── eslint-config/         # Shared ESLint configs
│
├── .github/
│   └── workflows/             # CI/CD Pipeline
│       ├── build.yml          # Build and test
│       ├── deploy.yml         # Deploy to Vercel
│       └── docker.yml         # Build and push Docker images
│
├── docker-compose.yml         # Multi-container orchestration
├── turbo.json                 # Turborepo configuration
├── pnpm-workspace.yaml        # pnpm workspace setup
└── README.md
```

### Technology Stack

#### Frontend Layer (apps/web)
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first styling
- **[ShadCN/UI](https://ui.shadcn.com/)** - Beautiful component library
- **[React](https://react.dev/)** - UI rendering library
- **Server Actions** - Type-safe server mutations

#### WebSocket Layer (apps/websocket)
- **[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)** - Real-time bidirectional communication
- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[Redis](https://redis.io/)** - In-memory data store for caching

#### Database & ORM
- **[PostgreSQL 15+](https://www.postgresql.org/)** - Production database
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database client
- **[Redis](https://redis.io/)** - Caching and real-time data sync

#### AI & Machine Learning
- **[LangChain](https://www.langchain.com/)** - AI orchestration framework
- **LLM Integration** - Natural language shape generation

#### Authentication
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution
- **OAuth Providers** - Google, GitHub integration
- **Email/Password** - Traditional authentication

#### DevOps & Infrastructure
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[Docker Compose](https://docs.docker.com/compose/)** - Multi-container orchestration
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **[Vercel](https://vercel.com/)** - Frontend deployment platform
- **[Docker Hub](https://hub.docker.com/)** - Container registry

#### Monorepo Tools
- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[pnpm](https://pnpm.io/)** - Fast, disk-efficient package manager

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Docker** and **Docker Compose**
- **Git**

### Quick Start with Docker Compose (Recommended)

The fastest way to get Sketchly running locally:

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tejas-pr/Sketchly.git
cd Sketchly
```

#### 2️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/sketchly?schema=public"

# Redis
REDIS_URL="redis://redis:6379"

# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key-here-min-32-chars"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI / LangChain
GOOGLE_API_KEY="your-openai-api-key"  # Optional: For AI features

# Environment
NODE_ENV="development"
```

#### 3️⃣ Start All Services

```bash
# Build and start all containers
docker-compose up --build

# Or run in detached mode
docker-compose up -d
```

This single command starts:
- ✅ PostgreSQL database
- ✅ Redis cache
- ✅ Next.js web application
- ✅ WebSocket server

#### 4️⃣ Access the Application

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **WebSocket**: [ws://localhost:8080](ws://localhost:8080)
- **Database**: `localhost:5432`
- **Redis**: `localhost:6379`

---

### Manual Development Setup

If you prefer to run services individually:

#### 1️⃣ Install Dependencies

```bash
pnpm install
```

#### 2️⃣ Start Database & Redis

```bash
# Start PostgreSQL
docker run -d \
  --name sketchly-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=sketchly \
  -p 5432:5432 \
  postgres:15

# Start Redis
docker run -d \
  --name sketchly-redis \
  -p 6379:6379 \
  redis:7-alpine
```

#### 3️⃣ Run Database Migrations

```bash
pnpm --filter=database prisma:generate
pnpm --filter=database prisma:migrate
```

#### 4️⃣ Start Development Servers

```bash
# Start all apps (web + websocket)
pnpm dev

# Or start individually
pnpm dev --filter=web          # Web app on :3000
pnpm dev --filter=websocket    # WebSocket on :8080
```

---

## 🐳 Docker Commands

### Docker Compose Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f web
docker-compose logs -f websocket

# Rebuild containers
docker-compose build

# Restart a specific service
docker-compose restart web
```

### Individual Container Commands

```bash
# List running containers
docker ps

# Stop a container
docker stop sketchly-postgres
docker stop sketchly-redis

# Start a stopped container
docker start sketchly-postgres

# View container logs
docker logs sketchly-postgres -f

# Access container shell
docker exec -it sketchly-postgres psql -U postgres -d sketchly
docker exec -it sketchly-redis redis-cli

# Remove containers
docker rm -f sketchly-postgres sketchly-redis
```

---

## 🔧 Available Scripts

### Monorepo Commands

```bash
# Development - runs all apps
pnpm dev

# Build all apps
pnpm build

# Production start
pnpm start

# Lint all code
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Clean build artifacts
pnpm clean
```

### Workspace-Specific Commands

```bash
# Web app only
pnpm dev --filter=web
pnpm build --filter=web

# WebSocket server only
pnpm dev --filter=websocket
pnpm build --filter=websocket

# Database commands
pnpm --filter=database prisma:generate
pnpm --filter=database prisma:migrate
pnpm --filter=database prisma:studio
pnpm --filter=database prisma:seed
```

### Docker Build Commands

```bash
# Build web app image
docker build -t sketchly-web ./apps/web

# Build websocket image
docker build -t sketchly-websocket ./apps/websocket

# Build all with docker-compose
docker-compose build
```

---

## 🔄 CI/CD Pipeline

Sketchly uses GitHub Actions for automated CI/CD:

### Automated Workflows

1. **Build & Test** (`.github/workflows/web.yml`)
   - Runs on every push and PR
   - Installs dependencies with pnpm
   - Runs linting and type checking
   - Builds all apps and packages
   - Runs test suites

### Docker Hub Repository

Pre-built images are available on Docker Hub:

```bash
# Pull latest images
docker pull tejaspr/sketchly-web:latest

# Run from Docker Hub
docker run -p 3000:3000 tejaspr/sketchly-web:latest
```

---

## 🎨 Using Sketchly

### Basic Drawing

1. **Select a Tool** - Choose from pen, shapes, or text tools
2. **Pick a Color** - Use the color picker to customize
3. **Draw on Canvas** - Click and drag to create
4. **Pan & Zoom** - Use mouse wheel to zoom, drag to pan

### Real-time Collaboration

1. **Sign In** - Authenticate with email, Google, or GitHub
2. **Share Canvas** - Share the URL with collaborators
3. **Collaborate** - See real-time updates from other users
4. **Auto-save** - All changes saved automatically

### AI Shape Generation

1. **Activate AI Tool** - Click the AI assistant button
2. **Describe Shape** - Type natural language description
   - Example: "Create a flowchart with 3 connected boxes"
   - Example: "Draw a circle connected to a square with an arrow"
3. **Generate** - AI creates shapes based on your description
4. **Refine** - Adjust and customize the generated shapes

---

## 🔐 Authentication Setup

### Better Auth Configuration

Better Auth is configured in `apps/web/lib/auth.ts`. The system supports:

- **Email/Password** - Traditional authentication
- **Google OAuth** - Single sign-on with Google
- **GitHub OAuth** - Single sign-on with GitHub

### Setting Up OAuth Providers

#### Google OAuth

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Copy credentials to `.env`:
   ```env
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL:
   - Development: `http://localhost:3000/api/auth/callback/github`
   - Production: `https://yourdomain.com/api/auth/callback/github`
4. Copy credentials to `.env`:
   ```env
   GITHUB_CLIENT_ID="your-client-id"
   GITHUB_CLIENT_SECRET="your-client-secret"
   ```

---

## 📊 Database Management

### Prisma Commands

```bash
# Generate Prisma Client
pnpm --filter=database prisma:generate

# Create a new migration
pnpm --filter=database prisma:migrate dev --name your_migration_name

# Apply migrations to production
pnpm --filter=database prisma:migrate deploy

# Open Prisma Studio (Database GUI)
pnpm --filter=database prisma:studio

# Reset database (caution: deletes all data)
pnpm --filter=database prisma:migrate reset

# Seed database
pnpm --filter=database prisma:seed
```

### Database Schema

Key models in the Prisma schema:

- **User** - User accounts and profiles
- **Session** - User sessions for Better Auth
- **Canvas** - Whiteboard canvases
- **Shape** - Individual drawing elements
- **Collaboration** - Real-time collaboration sessions

### Redis Caching Strategy

Redis is used in the WebSocket layer to:
- Cache active canvas data for fast access
- Store real-time collaboration state
- Queue shape updates before database write
- Manage WebSocket connection states

---

## 🚀 Deployment

### Production Deployment on Vercel

The web application is automatically deployed to Vercel via GitHub Actions:

1. **Push to main branch** → Triggers deployment
2. **Automatic build** → Next.js builds and optimizes
3. **Database migrations** → Prisma migrations applied
4. **Live deployment** → Available at production URL

**Live Demo**: [https://sketchly.vercel.app](https://sketchly.vercel.app)

### Self-Hosting with Docker

#### Using Docker Compose

```bash
# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale websocket=3
```

#### Using Pre-built Images

```bash
# Pull from Docker Hub
docker pull tejaspr/sketchly-web:latest
docker pull tejaspr/sketchly-websocket:latest

# Run containers
docker run -d \
  --name sketchly-web \
  -p 3000:3000 \
  --env-file .env.production \
  tejaspr/sketchly-web:latest

docker run -d \
  --name sketchly-websocket \
  -p 8080:8080 \
  --env-file .env.production \
  tejaspr/sketchly-websocket:latest
```

### Environment Variables for Production

```env
# Database (Production)
DATABASE_URL="your-production-database-url"

# Redis (Production)
REDIS_URL="your-production-redis-url"

# Authentication
BETTER_AUTH_SECRET="secure-random-string-min-32-chars"
BETTER_AUTH_URL="https://yourdomain.com"

# OAuth
GOOGLE_CLIENT_ID="production-google-client-id"
GOOGLE_CLIENT_SECRET="production-google-client-secret"
GITHUB_CLIENT_ID="production-github-client-id"
GITHUB_CLIENT_SECRET="production-github-client-secret"

# AI (Optional)
OPENAI_API_KEY="your-openai-api-key"

# Environment
NODE_ENV="production"
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation
4. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow the existing TypeScript/React patterns
- **Commits**: Use conventional commits (feat, fix, docs, etc.)
- **Testing**: Add tests for new functionality
- **Documentation**: Update README and inline docs
- **Type Safety**: Maintain strict TypeScript types

### Areas for Contribution

- 🎨 UI/UX improvements
- 🐛 Bug fixes
- ✨ New features (shapes, tools, export options)
- 📚 Documentation improvements
- 🧪 Test coverage
- 🌐 Internationalization
- ♿ Accessibility enhancements

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? Please [open an issue](https://github.com/Tejas-pr/Sketchly/issues)!

**For bugs, include:**
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment (browser, OS, etc.)

**For features, include:**
- Clear description of the feature
- Use cases and benefits
- Proposed implementation (optional)
- UI mockups (optional)

---

## 📚 Learn More

### Documentation Resources

- **[Turborepo Docs](https://turbo.build/repo/docs)** - Monorepo management
- **[Next.js Docs](https://nextjs.org/docs)** - React framework
- **[Prisma Docs](https://www.prisma.io/docs)** - Database ORM
- **[Better Auth Docs](https://www.better-auth.com/docs)** - Authentication
- **[ShadCN/UI](https://ui.shadcn.com/)** - UI components
- **[LangChain Docs](https://docs.langchain.com/)** - AI integration
- **[Docker Docs](https://docs.docker.com/)** - Containerization
- **[pnpm Workspaces](https://pnpm.io/workspaces)** - Package management

### Project Resources

- **[GitHub Repository](https://github.com/Tejas-pr/Sketchly)** - Source code
- **[Issues](https://github.com/Tejas-pr/Sketchly/issues)** - Bug reports
- **[Discussions](https://github.com/Tejas-pr/Sketchly/discussions)** - Community forum
- **[Docker Hub](https://hub.docker.com/r/tejaspr/sketchly-web)** - Container images

---

## 📈 Performance & Scalability

### Optimization Strategies

- **Redis Caching** - Fast data retrieval and reduced database load
- **WebSocket Optimization** - Efficient real-time communication
- **Server Actions** - Type-safe mutations without HTTP overhead
- **Turborepo Caching** - Fast builds with intelligent caching
- **Docker Compose** - Easy horizontal scaling

### Monitoring

Recommended monitoring tools:
- **Vercel Analytics** - Frontend performance
- **Database Monitoring** - Query performance
- **Redis Insights** - Cache hit rates
- **WebSocket Metrics** - Connection health

---

## 🔒 Security

Security is a top priority for Sketchly:

- ✅ **Better Auth** - Modern, secure authentication
- ✅ **OAuth 2.0** - Industry-standard authorization
- ✅ **CSRF Protection** - Cross-site request forgery prevention
- ✅ **SQL Injection Prevention** - Prisma's parameterized queries
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Rate Limiting** - API abuse prevention
- ✅ **Input Validation** - Server-side validation

**Reporting Security Issues**: Please email security concerns privately to the maintainer.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Tejas**
- GitHub: [@Tejas-pr](https://github.com/Tejas-pr)
- Portfolio: [tejaspr.site](https://tejaspr.site/)

---

## 🙏 Acknowledgments

Special thanks to:
- **Excalidraw** for inspiration
- **Vercel** for hosting
- **Turborepo** team for amazing monorepo tools
- **ShadCN** for beautiful UI components
- All contributors and supporters

---

## 🌟 Show Your Support

If you find Sketchly helpful, please:
- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 🤝 Contribute code
- 📢 Share with others

---

## 📞 Contact & Support

**Have questions or suggestions?**
- 📝 [Open an issue](https://github.com/Tejas-pr/Sketchly/issues)
- 💬 [Start a discussion](https://github.com/Tejas-pr/Sketchly)

---

## 🗓️ Project Stats

- **Status**: ✅ Production Ready
- **Latest Version**: v1.0.0
- **Stars**: ⭐ Give us a star!

---

<div align="center">

**Built with ❤️ using Next.js, Turborepo, and modern web technologies**

Made by [Tejas](https://github.com/Tejas-pr)

[⬆ Back to top](#-sketchly)

</div>
