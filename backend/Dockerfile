FROM node:lts-alpine

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3005

CMD ["npm", "run", "dev"]