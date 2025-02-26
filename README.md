### Little Brothers : Med Trans Project
# Express API
This project is sponsered by the Humane Interface and Design Enterprise (HIDE) at Michigan Technological University (MTU). This project is student led. 

For new developers, please read this entire Readme before getting started. It contains useful tips for getting started, as well as comments on specifics of certain functionalites. 

This service (the '`API`') uses an express server and Nodejs to connect our frontend Vuejs app to our backend MSSQL server. 

This service is also equiped with a <strong>DB Manager</strong> that handles the logic of verifying the state of the connected database for you. 

# Developers
Here we list out some useful information for any new developer getting started with the project. If you haven't already, see the [Getting Started Guide](https://houghtonlittlebrothers.sharepoint.com/:w:/r/sites/mtulbfemedtransproject/Shared%20Documents/Developer%20Space/Getting%20Stated%20Guide.docx?d=w2909ee9daa3a42238df616b11042623b&csf=1&web=1&e=kcNI3a)

# To run the app in docker do:

```
docker compose up --build
```


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
Note: that all routes (apart from status) are prefixed with the hostname, followed by '`/api`'. 

To add routes, simply add a file into the '`/routes`' directory. We follow the naming convention of '`tableName.routes.js`' where tableName refers to the corresponding table within the database. 

## Postman
For developers, see the little-brothers [Postman Workspace](https://michigan-technological-university-student-plan.postman.co/workspace/77548b2e-e53a-4b99-81c5-ab5a2fff1920/collection/23674592-2fa55a40-082e-491d-afd2-3543e13249d6) for examples. Also note that all 'Get One' routes take in an id as a query param (`?id=1`) appended to the end, and all Post routes simply take a body object containing the fields necessary. 


##Prefix for all
Prefix: '`/api`'
example: '`/api/elders/create`'

## Appointments
Prefix: '`/appointment`'

- Get One       - '`/`'
- Get All'      - '`/list`' --> also takes an optional startDate + endDate as query params. Otherwise defaults to Jan 01, and Dec 31 of the current year respectively
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`'

## Drivers
Prefix: '`/drivers`'

- Get One       - '`/`'
- Get All'      - '`/list`'
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`'

## Clients
Prefix:'`/elders`'

- Get One       - '`/`'
- Get All'      - '`/list`'
- Post Create   - '`/create`'
- Post Update   - '`/edit`'
- Post Delete   - '`/delete`' 


## Sequelize
Sequelize is an ORM that we use to connect to our database. With the current setup, it makes things incredibly simple. To add a table, add a file to the '`/models`' dircetory with the corresponding tablename (NOTE: case sensitive). Fill out the row specifications, and the DB Manager will ensure it gets populated and is verified in every environment. 

## DB Manager
The general gist: this is a custom built setup that compares the schema of the connected DB to the models in the '`./server/models`' folder. If there is a mismatch, it spits out a warning, and in local dev mode can even drop the table and force you to restart the service so sequelize can auto create + reseed the table for you. (NOTE: This is a manually enabled feature, you have to uncomment code to make it work. In most cases it is easier to resolve issues manually, but if you have absolutley no idea how to work with SQL, this is an option). In any other environment, it will only display warnings for mismatches. 

##
WARNING: This is a message to protect you.

DO NOT UNDER ANY CIRCUMSTANCE MODIFY THE BEHAVIOR OF THIS MANAGER TO BE USED TO ALLOW FOR THE DROPING AND RESEEDING OF TABLES ON ANY DATABASE OTHER THAN THE ONE RUNNING ON YOUR LOCAL MACHINE. BE VERY CAREFUL IF YOU CHOOSE TO MESS WITH THIS SERVICE OR THE ENV VARIABLES CONTROLLING IT. <strong>YOU CAN (AND WILL) DESTROY DATA THAT WILL COST YOU YOUR CAREER.</strong> It should go without saying, but outside of your personal machine, the data you mess with affects real people. If you tamper with data that isn't yours, you can cause injury or harm on others. If you are caught doing so you will be kicked out of HIDE, Michigan Technological University and may face real legal charges.
##

SO. In Summary, please be careful. Under no circumstances are you permitted to run your local machine against the Little Brothers server with these variables turned on. As added security, not everyone on the team will have access to deploy code to the server.

As a precaution: the code that controls the dropping of tables will be commented out AT ALL TIMES in the repo. You can uncomment it for personal use if you want to, but do not ever push to the repo. If you, or if you see anyone accidentally push this to the repo, <strong> FIX IT. </strong>
