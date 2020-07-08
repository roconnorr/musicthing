#
# Builder stage.
#
FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci && npm run build

#
# Production stage.
# Copy build and install packages
# Use stretch for prebuilt sqlite binary
#
FROM node:lts-stretch

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## Copy build files
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "/app/dist/server.js"]
