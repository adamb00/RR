# Use an official Node.js LTS version as the base image
FROM node:lts-alpine AS builder

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
COPY robots.txt ./dist/


FROM nginx:alpine


# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]



