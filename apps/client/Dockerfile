FROM node:18-slim as builder

WORKDIR /app

COPY package*.json ./

RUN npm i --omit=dev

COPY . ./

RUN npm run build

FROM nginx:1.23-alpine

# ENV PORT=8080

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]