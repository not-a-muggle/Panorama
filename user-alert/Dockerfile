FROM node:14.16.0-buster
EXPOSE 30905
WORKDIR / user-alert
COPY . . 
RUN npm install
RUN npm run compile
CMD ["node", "out/index.js"]