const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressWinston = require('express-winston')
const fs = require('fs')
const helmet = require('helmet')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const Sequelize = require('sequelize')

// initialize sequelize with session store
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const CONFIG = require('./config/config')   // Load structs to pass to express
const logger = require('./logger/logger')
const models = require('./models')          // Custom database objects for use with sequelize

logger.info(`Environment: ${CONFIG.app}`)   // Post Environment for the 'logs/server.log'

const app = express()   // Start express -> save reference to app
app.use(helmet())

// Instantiate view engine -- NOTE we don't use the frontend component of this very much (at all)
// It's only useful if we wanted to have better looking API status pages when on VPN connection
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('view engine', 'ejs')
app.set('trust proxy', true)

app.use(bodyParser.json({ limit: '75mb' }))
app.use(bodyParser.urlencoded({ limit: '75mb', extended: true, parameterLimit: 50000 }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// DATABASE
models.driverScheduler
    .authenticate()
    .then(() => {
        logger.info(`Connected to database:${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`)
    })
    .catch((error) => {
        logger.error('Unable to connect to SQL database', { error })
    })

// Seperate pool from models.dbconfig
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: 'mssql',
    port: CONFIG.db_port,
    logging: CONFIG.db_logging,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        encrypt: true,
        packetSize: 32768,
        options: {
            validateBulkLoadParameters: true,
        },
    },
})

// Passport
const myStore = new SequelizeStore({
    db: sequelize,
    expiration: 24 * 60 * 60 * 1000, // The maximum age (in milliseconds) of a valid session.
    tableName: 'Sessions',
})
app.use(
    session({
        secret: CONFIG.session_secret,
        name: 'lbfe-driverscheduler-api',
        store: myStore,
        resave: false,
        proxy: false,
        cookie: {
            httpOnly: false,
            path: '/',
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
        saveUninitialized: false,
    }),
)

app.use(passport.initialize())
app.use(passport.session()) // persistent login

// const corsOptions = {
//     origin(origin, callback) { // TODO - Change the domain once we get one setup
//         if (!origin || origin.match(/\.lbfe-driverscheduler\.com$/) || CONFIG.disable_cors) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions))

// Request logger goes before router
app.use(
    expressWinston.logger({
        transports: logger.transports,
        format: logger.format,
        meta: false,
        expressFormat: true,
    }),
)
app.options('*', cors())

// Build Router, tagged with an 'api' incase we need to run multiple versions of the API in the future
const directoryPath = path.join(__dirname, './routes');
fs.readdirSync(directoryPath).forEach((route) => {
    app.use('/api', require(`./routes/${route}`))
})

// For checking the state of the API
app.use("/status", (req, res) => {
    return res.status(200).json({ status: 'Active', message: "API is running" })
})

// Default message for invalid routes
app.use((req, res) => {
    return res.status(404).json({ status: 'Not found', message: "API endpoint provided doesn't exist" })
})

// Error logger goes after router
app.use(
    expressWinston.errorLogger({
        transports: logger.transports,
        format: logger.format,
    }),
)

// Currently always set to disabled
if (CONFIG.enable_user_notifications === 'true') {
    logger.info(`User Notifications are enabled`)
} else {
    logger.error(`User Notifications are disabled`)
}

const server = app.listen(CONFIG.port, '0.0.0.0', () => {
    logger.info(`Listening on port: ${CONFIG.port}`)
})

module.exports = server
