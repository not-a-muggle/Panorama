FROM node:14.16.0-buster

WORKDIR /user-service

COPY . .

RUN npm install --only=production

CMD ["node", "server.js"]
