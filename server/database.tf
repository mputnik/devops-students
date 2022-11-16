#find latest mongodb image
resource "docker_image" "mongodb" {
    name = "mongo:latest"
}

#start database container
resource "docker_container" "mongodb" {
    name = "database"
    image = docker_image.mongodb.image_id

  networks_advanced {
        name = var.dnet_name
    }

  volumes {
        host_path = "${path.cwd}/server/data"
        container_path = "/data/db"
    }
}