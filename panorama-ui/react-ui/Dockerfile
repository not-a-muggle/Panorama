# Stage 1 - dev

FROM node:10-alpine as build-step
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

RUN chgrp -R 0 /app && chmod -R g+rwx /app

COPY package.json /app
RUN npm install
COPY --chown=node:node . /app
# RUN npm run build

# Stage 2 - prod

# FROM nginx:alpine
#WORKDIR /usr/share/nginx
#RUN rm -rf /usr/share/nginx/html/*
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build-step /app/build /usr/share/nginx/html
EXPOSE 30800
CMD ["npm", "start"]
# RUN npm run start