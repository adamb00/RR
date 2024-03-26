FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

USER node

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY --from=builder /app/dist/ /app/dist/

USER root

RUN mkdir -p /app/dist/uploads && chmod -R 777 /app/dist/uploads

EXPOSE 8000

CMD [ "npm", "run", "start" ]