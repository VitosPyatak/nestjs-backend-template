FROM node:16-alpine3.11

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

CMD ["node", "dist/main"]