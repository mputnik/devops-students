variable "dnet_name" {
    type = string
    default = ""
    description = "The name of the docker network the proxy will attach to."
}

resource "docker_image" "proxy" {
    name = "proxy"

    build {
        path = "./proxy"
        tag = ["proxy:latest"]
    }
}

resource "docker_container" "proxy_cont" {
    name  = "proxy_cont"
    image = docker_image.proxy.image_id

    networks_advanced {
        name = var.dnet_name
    }

    ports {
        internal = 4000
        external = 4000
    }
}