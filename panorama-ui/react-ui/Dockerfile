# Stage 1 - dev

FROM node:10-alpine as build-step

# FROM node:14-alpine

RUN mkdir -p /home/node/app &&\
 chown -R node:node /home/node/app
WORKDIR /home/node/app

RUN chgrp -R 0 /home/node/app &&\
 chmod -R g+rwX /home/node/app

COPY package.json /home/node/app/
USER 1000
RUN npm install

COPY --chown=node:node . /home/node/app
EXPOSE 80

RUN npm run build

# Stage 2 - prod
FROM nginx:1.17.1-alpine

COPY --from=build-step /home/node/app/build /usr/share/nginx/html
RUN chgrp -R 0 /usr/share/nginx/html &&\
 chmod -R g+rwX /usr/share/nginx/html

