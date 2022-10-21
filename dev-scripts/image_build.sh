# Builds the three (react, api, proxy) docker images, while setting up the docker network and opening the mongodb container.
sudo docker network create --driver=bridge dnet
sudo docker build -t react ../react-website/
sudo docker build -t api ../server/
sudo docker build -t proxy ../proxy/
sudo docker run -d --network=dnet --name database mongo:latest