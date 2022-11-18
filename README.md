### Little Brothers : Med Trans Project
# Express API
This project is sponsered by the Humane Interface and Design Enterprise (HIDE) at Michigan Technological University (MTU). This project is student led.

This service (the '`API`') uses an express server and Nodejs to connect our frontend Vuejs app to our backend MSSQL server. 

# Developers
Here we list out some useful information for any new developer getting started with the project.
## Getting Started
To run the project: First clone the repo, and then run 
```bash
npm install 
```

## Configuring your Developer Environment
Go to '`/server/config`' and make a copy of the .env file. If you are using Windows, copy the `.env.development.bat.example`, and rename to `.env.developemnt.bat`. If you are on Mac or Linux, copy the`.env.development.example` and rename to `.env.development`. You will have to modify the database credentials to match what you have setup on your local machine. 

## Running the API
To start the project on Windows, run the following command:
```
npm run server-dev
```
...Mac / Linux, run:
```
npm run start
```

# Routes
For convenience, here is a list of all active routes. When running locally, you can check the liveness of the API by going to `http://localhost:9010/status`.
Note: that all routes are prefixed with the hostname, followed by '`/api`'. 

## Postman
For developers, see the little-brothers [Postman Workspace](https://michigan-technological-university-student-plan.postman.co/workspace/77548b2e-e53a-4b99-81c5-ab5a2fff1920/collection/23674592-2fa55a40-082e-491d-afd2-3543e13249d6) for examples. Also note that all 'Get One' routes take in an id as a query param (`?id=1`) appended to the end, and all Post routes simply take a body object containing the fields necessary. 

## Appointments
Prefixed with '`/appointment`'

- Get One       - '`/`'
- Get All'      - '`/list`' --> also takes an optional startDate + endDate as query params. Otherwise defaults to Jan 01, and Dec 31 of the current year respectively
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`'

## Drivers
Prefixed with '`/drivers`'

- Get One       - '`/`'
- Get All'      - '`/list`'
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`'

## Clients
Prefixed with '`/clients`'

- Get One       - '`/`'
- Get All'      - '`/list`'
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`' 