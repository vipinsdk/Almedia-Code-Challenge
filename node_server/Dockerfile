FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY app.js ./
COPY offer1_payload.js ./
COPY offer2_payload.js ./

EXPOSE 3000

USER node

ENTRYPOINT ["node", "app.js"]