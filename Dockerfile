FROM node:current-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build && npm prune --production

FROM alpine:latest AS runner

ENV NODE_ENV=production

WORKDIR /app

RUN apk add --no-cache nodejs && \
    addgroup -S almedia && adduser -S almedia -G almedia

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

USER almedia

ENTRYPOINT ["node" , "dist/app.js"]