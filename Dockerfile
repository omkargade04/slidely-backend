FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["node", "/dist/index.js"]

