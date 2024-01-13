FROM  node:20.10.0-alpine

WORKDIR /usr/src/app
RUN apk update && apk upgrade && \
apk add bash gcc g++ python3

COPY package*.json ./

run npm i --production

COPY  . .

run npm run build

run npm i -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]