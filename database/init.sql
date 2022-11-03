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

CREATE TABLE dbo.clients(
  clientId bigint,
  firstName nvarchar,
  lastName nvarchar,
  fullName nvarchar,
  address nvarchar,
  phoneNumber nvarchar,
  mobility nvarchar,
  notes nvarchar,
  numOfCancels int,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(clientId)
);
CREATE TABLE dbo.drivers(
  driverId bigint,
  firstName nvarchar,
  lastName nvarchar,
  fullName nvarchar,
  insuranceId nvarchar,
  notes nvarchar,
  phoneNumber nvarchar,
  address nvarchar,
  createdAt datetime,
  updatedAt datetime,
  PRIMARY KEY(driverId)
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