# Use an official Node.js LTS version as the base image
FROM node:lts-alpine AS builder

ARG VITE_NODE_ENV
ARG VITE_FACEBOOK_APP_ID
ARG VITE_BASE_URL_SOCKET
ARG VITE_BASE_URL
ARG VITE_BASE_URL_LINK

ENV VITE_NODE_ENV=$VITE_NODE_ENV
ENV VITE_FACEBOOK_APP_ID=$VITE_FACEBOOK_APP_ID
ENV VITE_BASE_URL_SOCKET=$VITE_BASE_URL_SOCKE
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_BASE_URL_LINK=$VITE_BASE_URL_LINK

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

COPY ./assets ./dist/assets

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist /var/www/r2byou.com/html
# Expose port 80
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]



