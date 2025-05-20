FROM node:18
WORKDIR /

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

COPY auth/tsconfig.build.json ./tsconfig.build.json
COPY auth/tsconfig.json ./tsconfig.json
COPY auth ./auth

RUN npm install
RUN npm run build auth

CMD ["node", "dist/auth/main"]
