# Stage 1 - dev

FROM node:10-alpine as build-step

RUN mkdir -p /home/node/app &&\
 chown -R node:node /home/node/app

WORKDIR /home/node/app

RUN chgrp -R 0 /home/node/app &&\
 chmod -R g+rwX /home/node/app

COPY package.json /home/node/app/

USER 1000

RUN npm install

COPY --chown=node:node . /home/node/app

EXPOSE 30800

RUN npm run build

# Stage 2 - prod
FROM nginx:1.17.1-alpine

WORKDIR /usr/share/nginx 

RUN chmod -R 777 /var/log/nginx/ /var/cache/nginx/ /etc/nginx/ /var/run/

RUN rm -rf /usr/share/nginx/html/*

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY --from=build-step /home/node/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf 

EXPOSE 30800

CMD ["nginx", "-g", "daemon off;"]

