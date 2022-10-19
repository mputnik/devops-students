# Builds the three (react, api, proxy) docker images, while setting up the docker network and opening the mongodb container.
sudo docker network create --driver=bridge dnet
cd ../react-website/
sudo docker build -t react .
cd ../server/
sudo docker build -t api .
cd ../proxy/
sudo docker build -t proxy .
cd ..
sudo docker run -d --network=dnet -p 27017:27017 --name database mongo:latest