variable "outcomes-service-port"{
  default = 53002
}

variable "outcomes-service-name"{
  default = "outcomes-service:latest"
}

resource "docker_image" "outcomes-service" {
  name = "${var.outcomes-service-name}"
}

resource "docker_network" "outcomes-network"{
  name = "outcomes-service-network"
}

resource "docker_container" "outcomes-service" {
  name = "outcomes-service"
  image = "${docker_image.outcomes-service.name}"
  ports {
	internal = 8080
	external = "${var.outcomes-service-port}"
  }
  networks_advanced {
    name = "${docker_network.outcomes-network.name}"
  }
}
