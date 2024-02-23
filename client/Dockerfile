# Use an official Node.js LTS version as the base image
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the built files with a lightweight HTTP server
FROM nginx:alpine

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/assets /usr/share/nginx/html/assets

# Expose port 80
EXPOSE 80
EXPOSE 5173

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
