# Stage 1: Build the ReactJS application
FROM node:14.15.0-alpine as build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

# Stage 2: Serve the application
FROM nginx:1.19.4-alpine

ENV NODE_ENV production
ENV TZ=Asia/Vientiane

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
