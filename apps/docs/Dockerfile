# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

WORKDIR /app

# Copy workspace files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/docs ./apps/docs

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build packages first
RUN pnpm --filter @spinozaos/tokens build
RUN pnpm --filter @spinozaos/motion build

# Build docs
WORKDIR /app/apps/docs
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/apps/docs/dist /usr/share/nginx/html

# Copy nginx config
COPY apps/docs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
