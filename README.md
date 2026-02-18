# Almedia Backend Coding Challenge
Design and implement a job responsible for extracting offers from various external offer networks (providers) via HTTP requests. Although the response payload is different for each provider, the core challenge is to validate, transform, and store all offers into a single database table. If validation does not pass for one offer, the system must skip that individual offer, print a warning and continue processing the remaining offers from that provider.

# Directory Structure
```
.
├── node_server/               
│   ├── Dockerfile              
│   ├── app.js                  
│   ├── offer1_payload.js       
│   ├── offer2_payload.js     
│   ├── package.json            
│   └── package-lock.json
├── src/                        
|   ├── common/                
│   ├── config/                
│   ├── database/             
│   ├── providers/             
│   ├── services/               
│   ├── util/                   
│   └── app.ts                 
├── .env                       
├── .dockerignore              
├── .gitignore                 
├── docker-compose.yml        
├── Dockerfile                  
├── package.json                
└── tsconfig.json         
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
In the real world, the offers would be fetched from the actual APIs from different providers. In this code challenge I have created a mock server that will server the offer data (given and added offers with valid and invalid responses). This approach align with the actual implementation of the code that fetches the data from the actual APIs using a HTTP module like axios. <br />
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

## Application Run
The application can be executed via the docker image or locally using typscript
```
# To run locally
npx tsx --env-file=.env src/app.ts

# Docker image
docker run -it --rm \
  --network almedia-code-challenge_default \
  -e DB_HOST=db \
  -e DB_PORT=5432 \
  -e DB_USER=postgres \
  -e DB_PASS=admin \
  -e DB_NAME=offers_db \
  -e OFFER1_URL=http://node-server:3000/offers1 \
  -e OFFER2_URL=http://node-server:3000/offers2 \
  almedia-code-challenge-app
```

## Design Decisions
The code is based on service-oriented implementation but the actual logic for handling the provider is based on the Factory Method pattern. 

### 1. The Product Interface
In a Factory pattern, we have a common interface `Provider` for the objects the factory creates.
In this code the `Provider` abstract class (and the IOffer interface) acts as the blueprint. 
Every Provider (e.g., Offer1Provider, Offer2Provider) should implement the `fetch()` and `mapToOfferDB()` methods. 

### 2. The Individual Providers
Every offer Provider (Offer1Provider, Offer2Provider) have their own data in different formats and these providers should implement the `fetch()` function to get the API data from the external source, and `mapToOfferDB()` function to handle provider-specific mapping of the data to the Offer Entity class (Database Object). The `validate()` function remains common for all the providers and validates the input data for type checking, missing fields or incorrect data and rejects the offer if the validation fails.

### 3. Validation and Transformation
I have performed the validation based on the Entity Class fields that will be saved to the database. For this task, I have used `postgreSQL` as my database. As postgreSQL does not support the datatype `tinyint`, so I have replaced with `smallint` in the Offer Entity class. 

#### a. Transformation 
The incoming data from individual offer providers are mapped to the Offer Entity class in `mapToOfferDB()` function based on the structure and fields present in the APIs response.

#### b. Validation
For validation, I have used the `class-validator` package. This package contains multiple built-in validation decorators like `@IsNotEmpty(), @IsUrl(), ..` that can be added to the individual variables declared in the Offer Entity class. It provides a `validate()` function using which we can validate the Offer data before it gets saved to the database. 

### 4. Advantages
With this approach, we can decouple the core logic of saving the offers to the database with `saveOffers()` function in a service-oriented code that calls the `fetch()` and `mapToOfferDB()` for all the providers listed in the providers array. 

In the future, if a new provider (OfferProvider3) arrives, then it must implement the above functions based on the API response received from the their specific external source and the rest of the core logic remains the same. 

This way, we can extend this code to any number of external providers (For eg: 20+) without changing the entire code and just plug the new provider to the OfferService. 

## Test Coverage
For this code, I have used the `vitest` testing package, it is similar to the jest (nodejs) package. I have added basic test cases that tests the code against different scenarios and we can still improve the code by adding more test cases and different edge case scenarios to make the code more robust and flexible. 

The tests and code coverage report can be generated by running the following command 
```
npx vitest run --coverage
```

# Contributors
Vippin Kumar - vipin12jain@gmail.com



