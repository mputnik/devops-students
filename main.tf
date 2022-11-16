resource "docker_network" "dnet" {
  name = "dockernet"
  attachable = true
}

#===============modules===================

module "server" {
  source = "./server"
  dnet_name = docker_network.dnet.name
}

module "react-website" {
  source = "./react-website"
  dnet_name = docker_network.dnet.name
}

module "proxy" {
  source = "./proxy"
  dnet_name = docker_network.dnet.name
}
