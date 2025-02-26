-- Create the database
CREATE DATABASE lbfe_dev;
GO

-- Select database names for verification
SELECT Name from sys.databases;
GO

-- Use master for server-level operations
USE [master];
GO

-- Create server login if it doesn't exist
IF NOT EXISTS (SELECT * FROM sys.sql_logins WHERE name = 'lbfeDeveloper')
BEGIN
    CREATE LOGIN [lbfeDeveloper] WITH PASSWORD = 'sid@!1234', CHECK_POLICY = OFF;
    ALTER SERVER ROLE [sysadmin] ADD MEMBER [lbfeDeveloper];
END
GO

-- Connect to your new database to create database user
USE [lbfe_dev];
GO

-- Create database user mapped to the login
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'lbfeDeveloper')
BEGIN
    CREATE USER [lbfeDeveloper] FOR LOGIN [lbfeDeveloper];
    ALTER ROLE [db_owner] ADD MEMBER [lbfeDeveloper];
END
GO