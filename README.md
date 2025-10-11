# YouTube Trends Backend

A Node.js/TypeScript backend server for YouTube trends analysis with JWT authentication.

## Tech Stack

- **Runtime**: Node.js with TypeScript 5.x
- **Framework**: Express 5.x
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (jsonwebtoken)
- **Development**: tsx for fast TypeScript execution

## Features

- YouTube trends data fetching and analysis
- Classification of shorts vs long-form content
- Database-based caching for performance
- JWT-based authentication
- CORS support for cross-origin requests

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- YouTube Data API key

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/youtube_trends"
JWT_SECRET=your_jwt_secret_here
YOUTUBE_API_KEY=your_youtube_api_key_here
NODE_ENV=development
```

### Development

```bash
# Run with auto-reload
npx tsx watch src/index.ts

# Type checking
npx tsc --noEmit
```

### Production Build

```bash
# Compile TypeScript
npx tsc

# Run compiled JavaScript
node dist/index.js
```

## Project Structure

```
src/
  ├── index.ts           # Application entry point
  ├── app.ts             # Express app configuration
  ├── config/            # Configuration files
  ├── routes/            # API route definitions
  ├── controllers/       # Request handlers
  ├── middleware/        # Auth & error handling
  ├── services/          # Business logic
  └── types/             # TypeScript type definitions
```

## API Endpoints

Documentation coming soon.

## License

MIT
