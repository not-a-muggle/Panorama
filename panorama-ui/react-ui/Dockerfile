# Stage 1 - dev

FROM node:10-alpine as build-step




# FROM node:14-alpine

RUN mkdir -p /home/node/app &&\
 chown -R node:node /home/node/app
WORKDIR /home/node/app

RUN chgrp -R 0 /home/node/app &&\
 chmod -R g+rwX /home/node/app

COPY package*.json /home/node/app/
USER 1000
RUN npm install

COPY --chown=node:node . /home/node/app
EXPOSE 80
CMD ["npm", "start"]


# WORKDIR /app
# RUN chgrp -R 0 /app && \
#     chmod -R 777 /app
# COPY . /app
# RUN npm install
# RUN chmod 777 /app/node_modules/.cache/.eslintcache
# EXPOSE 80

# RUN npm run build

# CMD ["npm", "start"]

# Stage 2 - prod
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html

