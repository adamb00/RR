# Use an official Node.js LTS version as the base image
FROM node:lts-alpine AS builder

# Set working directory
WORKDIR /app

# ENV PATH /usr/src/node_modules/.bin:$PATH

# ARG VITE_NODE_ENV
# ARG VITE_FACEBOOK_APP_ID
# ARG VITE_BASE_URL_SOCKET
# ARG VITE_BASE_URL
# ARG VITE_BASE_URL_LINK

# ENV VITE_NODE_ENV=$VITE_NODE_ENV
# ENV VITE_FACEBOOK_APP_ID=$VITE_FACEBOOK_APP_ID
# ENV VITE_BASE_URL_SOCKET=$VITE_BASE_URL_SOCKET
# ENV VITE_BASE_URL=$VITE_BASE_URL
# ENV VITE_BASE_URL_LINK=$VITE_BASE_URL_LINK

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]



# Stage 2: Serve the built files with a lightweight HTTP server
# FROM nginx:alpine

# # Copy the built files from the builder stage
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY --from=builder /app/assets /usr/share/nginx/html/assets

# # Expose port 80
# EXPOSE 80
# EXPOSE 5173


# # Start nginx server
# CMD ["nginx", "-g", "daemon off;"]
