  # Stage 1 - dev environment
FROM node:14.15.5 as react-ui
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx
COPY --from=react-ui /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]