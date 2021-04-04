# node js base image

FROM node:10-alpine AS build-step

# working directory

WORKDIR /app

# copy all files from local to container

COPY . /app

# install node modules and run build

RUN npm install && npm run build 

# installing nginx web server

FROM nginx:1.17.1-alpine

# set working directory for nginx web server

WORKDIR /usr/share/nginx

# remove default configurations of nginx
RUN rm -rf /usr/share/nginx/html/* 

RUN rm -rf /etc/nginx/conf.d/default.conf

# replace default nginx file
COPY nginx.conf /etc/nginx/nginx.conf 

#copy files from build step

COPY --from=build-step /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]