FROM node:lts-alpine as builder

WORKDIR /usr/src/app

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

COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

RUN npm install

COPY . .

RUN npm run build

# Copy assets from /app/dist to a location within the build context
COPY ./assets /usr/src/app/dist/assets

COPY package.json .
COPY vite.config.ts .

RUN npm install typescript

# Final stage
FROM nginx:latest

# Copy files from the builder stage to the final stage
COPY --from=builder /usr/src/app/dist /var/www/r2byou.com/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
