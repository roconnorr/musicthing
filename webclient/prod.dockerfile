FROM node:lts-alpine AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install deps
COPY package*.json ./
RUN npm ci

# copy source and build
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
