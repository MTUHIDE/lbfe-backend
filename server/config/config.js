// Load environment variables into a struct so we can actually use them
// these will be set via the local .env file
module.exports = {
    app: process.env.APP || 'dev',
    port: parseInt(process.env.PORT, 10) || '9010',
    session_secret: process.env.SESSION_SECRET || 'Megaworm',
    log_level: process.env.LOG_LEVEL || 'info',

    // DB
    db_host: process.env.DB_HOST || 'localhost',
    db_port: parseInt(process.env.DB_PORT, 10) || '1433',
    db_name: process.env.DB_NAME || 'testing',
    db_user: process.env.DB_USER || 'SA',
    db_password: process.env.DB_PASSWORD || 'Test@123',
    db_logging: process.env.DB_LOGGING === 'true',

    // JWT Info
    jwt_encryption: process.env.JWT_ENCRYPTION,
    jwt_expiration: process.env.JWT_EXPIRATION,
}
