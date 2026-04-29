# ---- Build Stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy only what's needed for production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY --from=build /app/dist ./dist
COPY public ./public

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
