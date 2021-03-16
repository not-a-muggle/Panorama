# Stage 1 - development

FROM node:10-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install
#RUN npm install
RUN npm run build

# Stage 2 - production

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/build /usr/share/nginx/html