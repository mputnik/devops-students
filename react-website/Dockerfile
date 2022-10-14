FROM node:16.17.1-buster-slim

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN mkdir -p /home/app/themes-dist
RUN mkdir -p /home/app/wet-boew-dist

RUN npm install

EXPOSE 8080

#json array format
CMD ["npm","run","start"]