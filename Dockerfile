FROM node:24-alpine AS build

WORKDIR /app

RUN npm install -g npm@12.0.2

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx ng build web --configuration production --deploy-url /

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/angular-dist/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
