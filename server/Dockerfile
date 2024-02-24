

FROM node:lts-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=prod

RUN npm run build

FROM node:lts-alpine

USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist/ ./dist

EXPOSE 8000

CMD [ "npm", "run", "prod" ]