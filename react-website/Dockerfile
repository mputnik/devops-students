FROM node:16.17.1-buster-slim

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . /home/app

RUN npm install

# With `npm start`, there is no need to expose a port, as react-scripts pushes the app to a port (default 3000) of the container itself.
# EXPOSE 8080/tcp

#json array format
CMD ["npm","start"]