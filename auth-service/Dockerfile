FROM node:14.16.0-buster
EXPOSE 50050
WORKDIR /auth-service
COPY . . 
RUN npm install
RUN npm run compile
CMD ["node", "out/index.js"]