FROM node:16.17.1-buster-slim

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm install

#json array format
CMD ["npm","start"]