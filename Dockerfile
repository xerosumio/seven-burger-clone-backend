FROM node:18.16.1-slim AS builder
WORKDIR /app
COPY . /app/
RUN npm i
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html