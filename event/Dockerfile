FROM node:18
WORKDIR /

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY event/tsconfig.build.json ./tsconfig.build.json
COPY event/tsconfig.json ./tsconfig.json
COPY event ./event

RUN npm install
RUN npm run build event

CMD ["node", "dist/event/main"]
