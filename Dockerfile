# 0. base images
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# 1. Install all dependencies (including dev) for build steps
FROM base AS deps
RUN npm ci

# 2. Production-only dependencies for the final image
FROM base AS prod-deps
RUN npm ci --omit=dev

# 3. Build the source code only when needed
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules

# Copy build dependencies
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript to JavaScript
RUN npm run build

# 4. Production image
FROM base AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy production files
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Create logs directory with proper permissions
RUN mkdir -p logs && \
    chown -R nodejs:nodejs /app/logs

# Expose application port
EXPOSE 4000

# Run database migrations and start application
CMD ["npm", "run", "prod"]
