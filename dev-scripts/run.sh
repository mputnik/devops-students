# Runs the three docker images in containers
sudo docker run -d --name react_cont --network=dnet --mount type=bind,source="$(pwd)"/../react-website/public/themes-dist,target=/home/app/public/themes-dist --mount type=bind,source="$(pwd)"/../react-website/public/wet-boew-dist,target=/home/app/public/wet-boew-dist react
sudo docker run -d --name api_cont --network=dnet api

# Since react needs some time to start up, sleep for 1 mins
sleep 60s

sudo docker run --name proxy_cont --network=dnet -p 4000:4000 proxy