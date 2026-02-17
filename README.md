# Almedia Backend Coding Challenge
Design and implement a job responsible for extracting offers from various external offer networks (providers) via HTTP requests. Although the response payload is different for each provider, the core challenge is to validate, transform, and store all offers into a single database table. If validation does not pass for one offer, the system must skip that individual offer, print a warning and continue processing the remaining offers from that provider.

# Setting the environment for Local testing
### This code is based on the following tech stack: Typescript (Backend) --> PostgreSQL (Database)

## Typescript Installation


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
