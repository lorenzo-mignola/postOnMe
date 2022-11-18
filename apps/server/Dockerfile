FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm i -g ts-node

RUN npm i --omit=dev

COPY . ./

ENV DATABASE_URL="file:./prod.db"
RUN npx prisma generate
RUN npx prisma migrate deploy


ENV PORT=3030

EXPOSE 3030

CMD ["ts-node", "./src/main.ts"]