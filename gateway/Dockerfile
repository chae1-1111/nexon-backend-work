FROM node:18
WORKDIR /

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY gateway/tsconfig.build.json ./tsconfig.build.json
COPY gateway/tsconfig.json ./tsconfig.json
COPY gateway ./gateway

RUN npm install
RUN npm run build gateway

CMD ["node", "dist/gateway/main"]
