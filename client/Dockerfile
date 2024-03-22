# Stage 1: Build the application
FROM node:lts-alpine as builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

COPY ./assets ./dist/assets
# Install TypeScript for final stage
RUN npm install typescript

# Stage 2: Serve the application with nginx
FROM nginx:latest

# Copy built assets from builder stage to nginx
# COPY --from=builder /usr/src/app/dist /var/www/r2byou.com/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
