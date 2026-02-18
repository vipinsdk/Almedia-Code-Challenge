FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

FROM node:18-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN addgroup -S almedia && adduser -S almedia -G almedia

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm cache clean --force && npm install --omit=dev

USER almedia

ENTRYPOINT ["node", "dist/app.js"]