FROM node:lts-alpine as builder

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

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

COPY ./assets /app/dist/assets

EXPOSE 80
EXPOSE 443

FROM node:lts-alpine

COPY --from=builder /app/dist/ /app/dist/

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

FROM nginx:latest

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html
