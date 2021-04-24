# Stage 1 - dev

FROM node:10-alpine as build-step

WORKDIR /app
RUN chgrp -R 0 /app && \
    chmod -R g+rwX /app
COPY . /app
RUN npm install

EXPOSE 80

RUN npm run build

CMD ["npm", "start"]

# Stage 2 - prod
# FROM nginx:1.17.1-alpine
# COPY --from=build-step /app/build /usr/share/nginx/html

