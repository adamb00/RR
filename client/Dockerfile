FROM node as development

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production

COPY --from=development /usr/src/app/dist /var/www/r2byou.com/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]