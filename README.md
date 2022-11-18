### Little Brothers : Med Trans Project
# Express API
This project is sponsered by the Humane Interface and Design Enterprise (HIDE) at Michigan Technological University (MTU). This project is student led,

This service uses an express server and Nodejs to connect our frontend to our backend. All the routes and controllers go in here.

# Developers
Here we list out some useful information for any new developer getting started with the project.
## Getting Started
To run the project: First clone the repo, and then run 
```bash
npm install 
```
to start the project in [Windows] development mode, run the following command:
```
npm run server-dev
```

# Routes
For convenience, here is a list of all active routes. Note that all routes are prefixed with the hostname, followed by a '`/api`'

## Postman
For developers, see the [Postman Workspace](https://michigan-technological-university-student-plan.postman.co/workspace/77548b2e-e53a-4b99-81c5-ab5a2fff1920/collection/23674592-2fa55a40-082e-491d-afd2-3543e13249d6) for examples. Also note that all 'Get One' routes take in a id as a query param, and all Post routes simply take a body object containing the fields necessary. 

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