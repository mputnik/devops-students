terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "2.23.0"
      #docker network maybe goes here
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}