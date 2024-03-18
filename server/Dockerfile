

FROM node:lts-alpine as builder


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV NODE_ENV=prod

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