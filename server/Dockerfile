FROM node:16.17.1-buster-slim

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm install

EXPOSE 8080

CMD ["node","main.js"]