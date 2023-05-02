# Docker-Practice

This is a repository containing a Dockerfile and docker-compose.yml for the CMS-system application. The Dockerfile and docker-compose.yml files are modified versions of the original files to allow for easier containerization and deployment.

## Prerequisites
1.Docker
2.Docker Compose

## Getting Started
Clone the repository:

- git clone https://github.com/Ans-Saeed/Docker-Practice.git
- cd Docker-Practice

## Build the Docker image:

- docker build -t cms:1.0 .
- Start the containers using docker-compose:
- docker-compose up

This will start the my-app, mongodb, and mongo-express containers.

Open a web browser and navigate to http://localhost:4500 to access the CMS-system application.

## Configuration
The following environment variables can be set in the docker-compose.yml file:

1.MONGO_INITDB_ROOT_USERNAME: the MongoDB root username (default: "admin")
2.MONGO_INITDB_ROOT_PASSWORD: the MongoDB root password (default: "password")
3.ME_CONFIG_MONGODB_ADMINUSERNAME: the Mongo Express admin username (default: "admin")
4.ME_CONFIG_MONGODB_ADMINPASSWORD: the Mongo Express admin password (default: "password")

## License
The code in this repository is licensed under the MIT License.
