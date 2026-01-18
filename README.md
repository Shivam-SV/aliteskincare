Full-stack application built with React, Server-Side Rendering (SSR), and tRPC. This project uses Bun as the runtime and leverages a monorepo structure to keep the frontend and backend organized while sharing code seamlessly.

## What's Inside

This is a monorepo setup that contains two main applications:

- **`apps/web`** - The frontend React application with SSR support
- **`apps/api`** - The backend API server built with Hono and tRPC
- **`packages/trpc`** - Shared TypeScript types for tRPC

The web app runs on port 3000 and the API server runs on port 4000. They're designed to work together, with the frontend making type-safe calls to the backend through tRPC.

## Getting Started

First things first, make sure you have Bun installed. If you don't, head over to [bun.sh](https://bun.sh) and get it set up. Once that's done, install all the dependencies:

```bash
bun install
```

This will install dependencies for all workspaces in the monorepo.

## Environment Variables

Both applications require environment variables to be configured. Create `.env` files in each app directory.

### API App (`apps/api/.env`)

Create a `.env` file in the `apps/api` directory with the following variables:

```env
# Required: MySQL Database Connection URL
# Format: mysql://username:password@host:port/database
DATABASE_URL=mysql://user:password@localhost:3306/aliteskincare

# Optional: API Server Port (defaults to 4000)
PORT=4000

# Optional: CORS Origins (comma-separated, defaults to http://localhost:3000,http://localhost:5173)
CORS_ORIGIN=http://localhost:3000,http://localhost:5173
```

**Required Variables:**
- `DATABASE_URL` - MySQL database connection string in the format: `mysql://username:password@host:port/database`

**Optional Variables:**
- `PORT` - Port number for the API server (default: `4000`)
- `CORS_ORIGIN` - Comma-separated list of allowed CORS origins (default: `http://localhost:3000,http://localhost:5173`)

### Web App (`apps/web/.env`)

Create a `.env` file in the `apps/web` directory with the following variables:

```env
# Optional: Web Server Port (defaults to 3000)
PORT=3000

# Optional: API Server URL (defaults to http://localhost:4000/api)
VITE_API_URL=http://localhost:4000/api
```

**Optional Variables:**
- `PORT` - Port number for the web server (default: `3000`)
- `VITE_API_URL` - Full URL to the API server endpoint (default: `http://localhost:4000/api`)

> **Note:** All environment variables prefixed with `VITE_` are exposed to the client-side code. Make sure not to include sensitive information in these variables.

## Running the Project

You have a few options for running the apps:

**Run web frontend:**
```bash
bun run dev:web
```

This starts both the web server and API server simultaneously. The web app will be available at `http://localhost:3000` and the API at `http://localhost:4000`.

**Run them separately:**

If you want to run just the frontend:
```bash
bun run dev:web
```

Or just the backend:
```bash
bun run dev:api
```

