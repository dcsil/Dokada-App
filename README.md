# Getting Started with Dokada

## Setup
### Debian based Linux systems
Run the bootstrap script provided in the root directory, the set up will be done automatically

### Other Operating Systems
1. Install [NodeJS and npm](https://nodejs.org/en/download/)
2. Install a recent version of [Python3 and pip3](https://www.python.org/downloads/)
3. run "pip3 install -r requirements.txt" in the root directory to install all dependencies
4. Install a [MongoDB client](https://www.mongodb.com/docs/manual/installation/) that is compatible with your system

## Run
Execute "npm build" in root to build the frontend
Execute "flask run" in the root directory, the server will be hosted locally

## Testing and CI
The testing are divided into backend and front end currently, they can both be run in the root directory
To run front end tests: npm test
To run back end tests: pytest

The CI is set up in github actions and contain tests for both part. Jest-test.yml tests the front end and api-functional-test.yml
tests the backend

   


