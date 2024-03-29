
FROM node:16-alpine AS build-step1

RUN mkdir -p /ORM-fe
WORKDIR /ORM-fe

COPY package.json package-lock.json /ORM-fe/

#RUN npm install nodejs
RUN npm install

COPY . /ORM-fe/

RUN npm install -g typescript@4.5.5
RUN npm install -g vite
RUN npm run build

FROM nginx:1.17.1-alpine

COPY --from=build-step1 /ORM-fe/dist  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

