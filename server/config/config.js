// Load environment variables into a struct so we can actually use them
// these will be set via the local .env file
module.exports = {
    app: process.env.APP,
    port: parseInt(process.env.PORT, 10),
    session_secret: process.env.SESSION_SECRET,
    log_level: process.env.LOG_LEVEL || 'info',

    // DB
    db_host: process.env.DB_HOST,
    db_port: parseInt(process.env.DB_PORT, 10),
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    db_logging: process.env.DB_LOGGING === 'true',

    // JWT Info
    jwt_encryption: process.env.JWT_ENCRYPTION,
    jwt_expiration: process.env.JWT_EXPIRATION,
}
