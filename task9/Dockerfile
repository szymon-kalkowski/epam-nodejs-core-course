FROM node:slim

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY src/ .

RUN npm run build

CMD ["node", "dist/index.js"]

EXPOSE 8000