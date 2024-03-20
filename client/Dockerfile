FROM node:lts-alpine as builder

<<<<<<< HEAD
ARG VITE_NODE_ENV
ARG VITE_FACEBOOK_APP_ID
ARG VITE_BASE_URL_SOCKET
ARG VITE_BASE_URL
ARG VITE_BASE_URL_LINK

ENV VITE_NODE_ENV=$VITE_NODE_ENV
ENV VITE_FACEBOOK_APP_ID=$VITE_FACEBOOK_APP_ID
ENV VITE_BASE_URL_SOCKET=$VITE_BASE_URL_SOCKET
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_URL_LINK=$VITE_BASE_URL_LINK

# Set working directory
=======
>>>>>>> d6f80fe (Test)
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

COPY ./assets /app/dist/assets

<<<<<<< HEAD
RUN echo "Files copied successfully to /app/dist"

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

RUN echo "Files copied successfully to /usr/share/nginx/html"

COPY --from=builder /app/dist /var/www/r2byou.com/html

RUN echo "Files copied successfully to /var/www/r2byou.com/html"

# Expose port 80
EXPOSE 80
EXPOSE 443
=======
COPY --from=builder /app/dist/ /app/dist/

COPY package.json .
COPY vite.config.ts .
>>>>>>> d6f80fe (Test)

RUN npm install typescript

FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html