-- Create Base Tables

DROP TABLE dbo.appointments;
CREATE TABLE dbo.appointments (
  appointmentId int NOT NULL IDENTITY PRIMARY KEY,
  startDate VARCHAR(70),
  endDate VARCHAR(70),
  notes VARCHAR(255),
  title VARCHAR(150),
  pickupAddress VARCHAR(255),
  destinationAddress VARCHAR(255),
  driverId int,
  clientId int,
  createdAt VARCHAR(70),
  updatedAt VARCHAR(70),
  isCancelled TINYINT,
  isArchived TINYINT,
  isAllDay TINYINT,
);

DROP TABLE dbo.clients;
CREATE TABLE dbo.clients(
  clientId int NOT NULL IDENTITY PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  fullName VARCHAR(255),
  address VARCHAR(255),
  phoneNumber VARCHAR(255),
  mobility VARCHAR(255),
  notes VARCHAR(255),
  numOfCancels int,
  createdAt VARCHAR(70),
  updatedAt VARCHAR(70)
  );

  DROP TABLE dbo.drivers;

CREATE TABLE dbo.drivers(
  driverId int NOT NULL IDENTITY PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  fullName VARCHAR(255),
  insuranceId VARCHAR(255),
  notes VARCHAR(255),
  phoneNumber VARCHAR(255),
  address VARCHAR(255),
  createdAt VARCHAR(70),
  updatedAt VARCHAR(70)
);
-- Add Foreign Key Constraints
INSERT INTO
  [Appointments] (
    [appointmentId],
    [startDate],
    [endDate],
    [notes],
    [title],
    [pickupAddress],
    [destinationAddress],
    [createdAt],
    [updatedAt],
    [driverId],
    [clientId],
    [isCancelled],
    [isArchived],
    [isAllDay]
  ) 
VALUES(
    1
    , '2022-11-03 14:47:35.361'
    ,'2022-11-03 14:47:35.361'
    ,'Testy Boi'
    ,'Megaworm'
    ,'123 Street Boi'
    ,'Walmart Inc.'
    ,'2022-11-03 14:47:35.361'
    ,'2022-11-03 14:47:35.361'
    ,1
    ,1
    ,0
    ,0
    ,0
  );