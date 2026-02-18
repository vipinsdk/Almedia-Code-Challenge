# Almedia Backend Coding Challenge
Design and implement a job responsible for extracting offers from various external offer networks (providers) via HTTP requests. Although the response payload is different for each provider, the core challenge is to validate, transform, and store all offers into a single database table. If validation does not pass for one offer, the system must skip that individual offer, print a warning and continue processing the remaining offers from that provider.

# Directory Structure
```
.
├── node_server/                # Mock Provider Server
│   ├── Dockerfile              # Lightweight Alpine-Node image
│   ├── app.js                  # Express server logic & endpoints
│   ├── offer1_payload.js       # Mock data for Provider 1 
│   ├── offer2_payload.js       # Mock data for Provider 2 
│   ├── package.json            # Mock server dependencies (Express)
│   └── package-lock.json
├── src/                        
|   ├── common/                 # Interface for the entity class
│   ├── config/                 # Environment & App configuration
│   ├── database/               # TypeORM Data Source & Entities
│   ├── providers/              # BaseProvider and offer specific providers
│   ├── services/               # Provider fetching & transformation
│   ├── util/                   # Logger utility
│   └── app.ts                  # Entry point
├── .env                        # Local environment variables
├── .dockerignore               # Prevents local node_modules in builds
├── .gitignore                  # Files excluded from github
├── docker-compose.yml          # Orchestrates DB and Mock Server
├── Dockerfile                  # Dockerfile that build the application
├── package.json                # application dependencies
└── tsconfig.json               # TypeScript configuration
```
# Setting the environment for testing
### This code is based on the following tech stack: Typescript (Backend) --> PostgreSQL (Database)

## Typescript Installation
### NOTE: Prequisite for installing the typescript and project dependencies is to have a local installation of Node.js<br />Find out the information for installing Node.js [Here](https://nodejs.org/en/download)

### Install Typescript and project dependencies
```
#Run this command in the Root dir containing package.json
npm install
```

### Docker image installation
For a easier installation and testing we can build a docker image for the application (Run the command in the ROOT_DIR)
```
docker build -t almedia-code-challenge-app .
```

## Mock Node.js server
In the real world, the offers would be fetched from the actual APIs from different providers. In this code challenge I have created a mock server that will server the offer data (given and added offers with valid and invalid responses). This approach align with the actual implementation of the code that fetches the data from the actual APIs using a HTTP module like axios. 
NOTE: The implementation for this server is kept bare minimum (to server the responses only)

#### Building the node.js server
The node.js mock server can be built as a Docker image for easy installation. The server gets built when running the `docker compose up` with `--build` option. 

## PostgreSQL Database
For the ease of testing, I have made of use PostgreSQL docker image that runs postgres in a container. The following is the docker command to run postgres with configurable username, password, database name and port number: 5432 (default)
```
docker run --name almedia-postgres \
           -e POSTGRES_USER=postgres \
           -e POSTGRES_PASSWORD=admin \
           -e POSTGRES_DB=offers_db \
           -p 5432:5432 \
           -d postgres:latest
```

We can now connect to this postgres instance via pgAdmin application on desktop to check if it is up and running and the database is created as mentioned in the docker run command. <br />
This postgres instance acts as our database where the offers from different providers will be saved after fetching from their individual APIs, validating and transform to the format mentioned from the entity class from the code challenge. 

## Docker Compose
The docker compose utility can be used to run multiple sevices together based on a required order and network configuration. Here, in this challenge I have decided to run the node.js (Mock) server and Postgres (DB) using docker compose, this ensures both the datasource (nodejs server) and database (postgres) are available for our application to fetch, validate, transform and store the data to DB. <br /> To run the docker compose, use the following command
```
#First time with --build option to build the nodejs server
docker compose up --build

#Later, it can run without --build option
docker compose up
```


