FROM alpine:latest

WORKDIR /app

RUN apk add --no-cache nodejs npm && \
    addgroup -S almedia && adduser -S almedia -G almedia

COPY package*.json ./

RUN npm install && apk del --no-cache npm

COPY app.js ./
COPY offer1_payload.js ./
COPY offer2_payload.js ./

EXPOSE 3000

USER almedia

ENTRYPOINT ["node", "app.js"]