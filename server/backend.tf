# Build API image
resource "docker_image" "api" {
  name = "api"

  build {
    path = "./server"
    dockerfile = "Dockerfile"
  }
}

# Create API container
resource "docker_container" "api" {
  image = docker_image.api.image_id
  name  = "api_cont"

  networks_advanced {
    name = var.dnet_name   
  }

  depends_on = [
    docker_container.mongodb
  ]
}

output "out" {
  value       = {}
  depends_on  = [docker_container.api]
}