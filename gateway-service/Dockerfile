FROM node:14.16.0-buster
EXPOSE 50055
WORKDIR /gateway-service
COPY . . 
RUN npm install
RUN npm run compile
CMD ["node", "out/index.js"]