# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YouTube Trends Server - A Node.js/TypeScript backend server for YouTube trends analysis using Express.js with JWT authentication.

**Tech Stack**:

- TypeScript 5.x
- Express 5.x
- tsx (TypeScript execution and build tool)
- JWT Authentication (jsonwebtoken)
- CORS support
- Environment configuration (dotenv)
- Prisma
- postgreSQL

## Development Commands

**Development** (using tsx - faster than ts-node):

- `npx tsx src/index.ts` - Run TypeScript directly without compilation
- `npx tsx watch src/index.ts` - Run with auto-reload on file changes

**Type Checking**:

- `npx tsc --noEmit` - Type check without compilation (requires tsconfig.json)

**Production Build**:

- `npx tsc` - Compile TypeScript to JavaScript (requires tsconfig.json)
- `node dist/index.js` - Run compiled JavaScript

## Project Structure

Project is currently empty. Recommended structure for Express/TypeScript server:

```
src/
  index.ts           # Application entry point
  app.ts             # Express app configuration
  config/            # Configuration files (database, environment)
  routes/            # API route definitions
  controllers/       # Request handlers
  middleware/        # Custom middleware (auth, error handling)
  models/            # Data models/schemas
  services/          # Business logic layer
  utils/             # Helper functions
  types/             # TypeScript type definitions
dist/                # Compiled JavaScript output
```

## Architecture Guidelines

**Layered Architecture Pattern**:

- **Routes** → define endpoints and map to controllers
- **Controllers** → handle requests/responses, call services
- **Services** → contain business logic, interact with external APIs/data
- **Middleware** → authentication, validation, error handling

**Key Dependencies**:

- `express` (v5.x) - Web framework
- `tsx` (v4.x) - Fast TypeScript execution and watch mode (replaces ts-node)
- `jsonwebtoken` (v9.x) - JWT token generation and verification
- `cors` (v2.x) - Cross-origin resource sharing
- `dotenv` (v17.x) - Environment variable management
- `typescript` (v5.x) - TypeScript compiler (dev dependency)

**TypeScript Configuration**:

- Create `tsconfig.json` with Node.js settings
- Recommended: `"module": "ESNext"`, `"target": "ES2022"`
- Use `"outDir": "dist"` for production builds
- Enable `"strict": true` for type safety
- Set `"moduleResolution": "bundler"` or `"node"` for imports

**Environment Variables**:

- Store in `.env` file (never commit to git)
- Load via `dotenv` in entry point
- Common vars: `PORT`, `JWT_SECRET`, `NODE_ENV`

**Authentication Flow**:

- JWT tokens created with `jsonwebtoken`
- Store secret in environment variables
- Verify tokens in middleware before protected routes

**Error Handling**:

- Use Express error handling middleware
- Centralize error responses
- Log errors appropriately based on environment

## Development Notes

**TypeScript Setup**:

- Project has TypeScript 5.x installed but no `tsconfig.json` yet
- Create one with Node.js settings for Express compatibility
- tsx can run TypeScript without tsconfig, but recommended for type checking

**CORS Configuration**:

- `cors` package installed - configure allowed origins
- Set specific origins in production, `*` only for development

**API Security**:

- Use strong JWT secrets stored in environment variables
- Implement token expiration and refresh logic
- Add authentication middleware for protected routes

**Code Organization**:

- Keep routes thin - only routing logic
- Controllers handle HTTP concerns (req/res)
- Services contain business logic and external API calls
- Use middleware for cross-cutting concerns (auth, validation, error handling)
