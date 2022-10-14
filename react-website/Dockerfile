FROM node:16.17.1-buster

RUN mkdir -p /home/app

WORKDIR /home/app

#ADD --keep-git-dir=true https://github.com/wet-boew/themes-dist/tree/GCWeb /home/app/public

COPY . /home/app

RUN npm install

EXPOSE 8080

#json array format
CMD ["npm","run","start"]