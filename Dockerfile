FROM node:14-alpine3.14

WORKDIR /app

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD ["node", "dist/main"]
