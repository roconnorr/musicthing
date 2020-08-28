A frontend and backend for a self hosted streaming music server built with TypeScript, React, NodeJS and SQLite.

# Setup

Create a folder called `testmusic` in the root directory, or pass a custom directory for the server to scan with the `--dir` option.

# Development environment

## Development with docker

`docker-compose up`

### Running in production with docker

`docker-compose -f docker-compose-prod.yml up`

## Development without docker

### Backend

`npm run start` to compile and run  
`npm run start:dev` for automatic reloading  
Run with `--help` to display CLI options

### Frontend

`npm start`
