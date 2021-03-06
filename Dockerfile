# stigbd/heroes-gui

# Stage 0, based on Node.js, to build and compile Angular
FROM node as node
WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

ARG env=dev

RUN npm run build -- --aot=false --environment $env

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx

COPY --from=node /app/dist/ /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
