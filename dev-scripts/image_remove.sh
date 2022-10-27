# Removes/deletes the three docker images, while closing the docker network and stopping + removing the mongodb container.
sudo docker image rm react
sudo docker image rm api
sudo docker image rm proxy
sudo docker stop database && sudo docker rm database
sudo docker network rm dnet