FROM node:18-alpine

WORKDIR /app/worker

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 4000

CMD [ "yarn", "start" ]