FROM node as development

ARG VITE_NODE_ENV
ARG VITE_FACEBOOK_APP_ID
ARG VITE_BASE_URL_SOCKET
ARG VITE_BASE_URL
ARG VITE_BASE_URL_LINK

ENV VITE_NODE_ENV=${VITE_NODE_ENV}
ENV VITE_FACEBOOK_APP_ID=${VITE_FACEBOOK_APP_ID}
ENV VITE_BASE_URL_SOCKET=${VITE_BASE_URL_SOCKET}
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_BASE_URL_LINK=${VITE_BASE_URL_LINK}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine 

COPY --from=development /usr/src/app/dist /var/www/r2byou.com/admin/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]