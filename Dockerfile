FROM node:23.7

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install

COPY . .

#EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]
