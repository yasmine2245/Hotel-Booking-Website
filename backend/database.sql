CREATE DATABASE hotelapp;

\c hotelapp

CREATE TABLE HotelChains (
    ChainID SERIAL PRIMARY KEY,
    ChainName VARCHAR(255),
    HQAddress VARCHAR(255),
    NumHotels INT,
    ContactEmail VARCHAR(255),
    ContactPhone VARCHAR(20)
);

CREATE TABLE Hotels (
    HotelID SERIAL PRIMARY KEY,
    ChainID INT,
    HotelName VARCHAR(255),
    Category INT,
    HotelAddress VARCHAR(255),
    NumRooms INT,
    ContactEmail VARCHAR(255),
    ContactPhone VARCHAR(20),
    FOREIGN KEY (ChainID) REFERENCES HotelChains(ChainID)
);

CREATE TABLE Employee (
    EID SERIAL PRIMARY KEY,
    HotelID INT,
    FullName VARCHAR(255),
    Address VARCHAR(255),
    SSN VARCHAR(11),
    Role VARCHAR(100),
    FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID)
);

CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    FullName VARCHAR(255),
    Address VARCHAR(255),
    IDType VARCHAR(50),
    RegistrationDate DATE
);

CREATE TABLE Rooms (
    RoomID SERIAL PRIMARY KEY,
    HotelID INT,
    RoomNumber INT,
    PricePerNight DECIMAL(10, 2),
    Capacity INT,
    Seaview BOOLEAN,
    MountainView BOOLEAN,
    Extendable BOOLEAN,
    MaintenanceNotes TEXT,
    FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID)
);

CREATE TABLE Bookings (
    BookingID SERIAL PRIMARY KEY,
    CustomerID INT,
    RoomID INT,
    CheckinDate DATE,
    CheckoutDate DATE,
    BookingDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID)
);

CREATE TABLE Rentings (
    RentingID SERIAL PRIMARY KEY,
    CustomerID INT,
    RoomID INT,
    EmployeeID INT,
    CheckinDate DATE,
    CheckoutDate DATE,
    BookingDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EID)
);

CREATE TABLE Amenities (
    AmenityID SERIAL PRIMARY KEY,
    AmenityName VARCHAR(255)
);

CREATE TABLE RoomAmenities (
    RoomID INT,
    AmenityID INT,
    PRIMARY KEY (RoomID, AmenityID),
    FOREIGN KEY (RoomID) REFERENCES Rooms(RoomID),
    FOREIGN KEY (AmenityID) REFERENCES Amenities(AmenityID)
);


-- INSERT DUMMY DATA

-- Inserting hotel chains
INSERT INTO HotelChains (ChainName, HQAddress, NumHotels, ContactEmail, ContactPhone) 
VALUES
('Simple Stay', '123 Main St, CityA', 8, 'info@simplestay1.com', '123-456-7890'),
('Grand Suites', '123 Main St, CityA', 8, 'info@simplestay1.com', '123-456-7890'),
('Paradise Hotels', '123 Main St, CityA', 8, 'info@simplestay1.com', '123-456-7890'),
('Tranquil Inns', '123 Main St, CityA', 8, 'info@simplestay1.com', '123-456-7890'),
('Serene Retreats', '123 Main St, CityA', 8, 'info@simplestay1.com', '123-456-7890');

-- Inserting hotels for Simple Stay chain
INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
VALUES
(1, 'Simple Stay 1', 1, '123 Main St, CityA', 7, 'info@simplestay1.com', '123-456-7890'),
(1, 'Simple Stay 2', 2, '456 Elm St, CityB', 8, 'info@simplestay2.com', '234-567-8901'),
(1, 'Simple Stay 3', 3, '789 Oak St, CityC', 9, 'info@simplestay3.com', '345-678-9012'),
(1, 'Simple Stay 4', 4, '321 Pine St, CityD', 6, 'info@simplestay4.com', '456-789-0123'),
(1, 'Simple Stay 5', 5, '654 Maple St, CityE', 5, 'info@simplestay5.com', '567-890-1234'),
(1, 'Simple Stay 6', 1, '987 Cedar St, CityF', 10, 'info@simplestay6.com', '678-901-2345'),
(1, 'Simple Stay 7', 2, '123 Birch St, CityG', 7, 'info@simplestay7.com', '789-012-3456'),
(1, 'Simple Stay 8', 3, '456 Walnut St, CityH', 8, 'info@simplestay8.com', '890-123-4567');

-- Inserting hotels for Grand Suites chain
INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
VALUES
(2, 'Grand Suites 1', 4, '123 Main St, CityA', 9, 'info@grandsuites1.com', '123-456-7890'),
(2, 'Grand Suites 2', 5, '456 Elm St, CityB', 6, 'info@grandsuites2.com', '234-567-8901'),
(2, 'Grand Suites 3', 1, '789 Oak St, CityC', 7, 'info@grandsuites3.com', '345-678-9012'),
(2, 'Grand Suites 4', 2, '321 Pine St, CityD', 8, 'info@grandsuites4.com', '456-789-0123'),
(2, 'Grand Suites 5', 3, '654 Maple St, CityE', 10, 'info@grandsuites5.com', '567-890-1234'),
(2, 'Grand Suites 6', 4, '987 Cedar St, CityF', 5, 'info@grandsuites6.com', '678-901-2345'),
(2, 'Grand Suites 7', 5, '123 Birch St, CityG', 9, 'info@grandsuites7.com', '789-012-3456'),
(2, 'Grand Suites 8', 1, '456 Walnut St, CityH', 7, 'info@grandsuites8.com', '890-123-4567');

-- Inserting hotels for Paradise Hotels chain
INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
VALUES
(3, 'Paradise Hotels 1', 2, '123 Main St, CityA', 5, 'info@paradisehotels1.com', '123-456-7890'),
(3, 'Paradise Hotels 2', 3, '456 Elm St, CityB', 8, 'info@paradisehotels2.com', '234-567-8901'),
(3, 'Paradise Hotels 3', 4, '789 Oak St, CityC', 6, 'info@paradisehotels3.com', '345-678-9012'),
(3, 'Paradise Hotels 4', 5, '321 Pine St, CityD', 7, 'info@paradisehotels4.com', '456-789-0123'),
(3, 'Paradise Hotels 5', 1, '654 Maple St, CityE', 10, 'info@paradisehotels5.com', '567-890-1234'),
(3, 'Paradise Hotels 6', 2, '987 Cedar St, CityF', 9, 'info@paradisehotels6.com', '678-901-2345'),
(3, 'Paradise Hotels 7', 3, '123 Birch St, CityG', 7, 'info@paradisehotels7.com', '789-012-3456'),
(3, 'Paradise Hotels 8', 4, '456 Walnut St, CityH', 6, 'info@paradisehotels8.com', '890-123-4567');

-- Inserting hotels for Tranquil Inns chain
INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
VALUES
(4, 'Tranquil Inns 1', 5, '123 Main St, CityA', 8, 'info@tranquilinns1.com', '123-456-7890'),
(4, 'Tranquil Inns 2', 1, '456 Elm St, CityB', 9, 'info@tranquilinns2.com', '234-567-8901'),
(4, 'Tranquil Inns 3', 2, '789 Oak St, CityC', 7, 'info@tranquilinns3.com', '345-678-9012'),
(4, 'Tranquil Inns 4', 3, '321 Pine St, CityD', 6, 'info@tranquilinns4.com', '456-789-0123'),
(4, 'Tranquil Inns 5', 4, '654 Maple St, CityE', 10, 'info@tranquilinns5.com', '567-890-1234'),
(4, 'Tranquil Inns 6', 5, '987 Cedar St, CityF', 8, 'info@tranquilinns6.com', '678-901-2345'),
(4, 'Tranquil Inns 7', 1, '123 Birch St, CityG', 5, 'info@tranquilinns7.com', '789-012-3456'),
(4, 'Tranquil Inns 8', 2, '456 Walnut St, CityH', 7, 'info@tranquilinns8.com', '890-123-4567');

-- Inserting hotels for Serene Retreats chain
INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
VALUES
(5, 'Serene Retreats 1', 3, '123 Main St, CityA', 8, 'info@sereneretreats1.com', '123-456-7890'),
(5, 'Serene Retreats 2', 4, '456 Elm St, CityB', 9, 'info@sereneretreats2.com', '234-567-8901'),
(5, 'Serene Retreats 3', 5, '789 Oak St, CityC', 7, 'info@sereneretreats3.com', '345-678-9012'),
(5, 'Serene Retreats 4', 1, '321 Pine St, CityD', 6, 'info@sereneretreats4.com', '456-789-0123'),
(5, 'Serene Retreats 5', 2, '654 Maple St, CityE', 10, 'info@sereneretreats5.com', '567-890-1234'),
(5, 'Serene Retreats 6', 3, '987 Cedar St, CityF', 8, 'info@sereneretreats6.com', '678-901-2345'),
(5, 'Serene Retreats 7', 4, '123 Birch St, CityG', 5, 'info@sereneretreats7.com', '789-012-3456'),
(5, 'Serene Retreats 8', 5, '456 Walnut St, CityH', 7, 'info@sereneretreats8.com', '890-123-4567');

--Inserting ROOMS

-- Inserting rooms for Simple Stay 1
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(1, '101', 100.00, 2, true, false, true, 'N/A'),
(1, '102', 120.00, 4, true, true, false, 'N/A'),
(1, '103', 150.00, 3, false, true, true, 'N/A'),
(1, '104', 80.00, 1, false, false, true, 'N/A'),
(1, '105', 200.00, 5, true, true, true, 'N/A');

-- Inserting rooms for Simple Stay 2
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(2, '101', 110.00, 3, false, false, true, 'N/A'),
(2, '102', 130.00, 5, true, false, true, 'N/A'),
(2, '103', 140.00, 2, true, true, false, 'N/A'),
(2, '104', 90.00, 4, false, true, true, 'N/A'),
(2, '105', 180.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Simple Stay 3
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(3, '101', 120.00, 4, true, false, true, 'N/A'),
(3, '102', 130.00, 2, true, true, false, 'N/A'),
(3, '103', 160.00, 5, false, true, true, 'N/A'),
(3, '104', 100.00, 3, false, false, true, 'N/A'),
(3, '105', 220.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Simple Stay 4
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(4, '101', 130.00, 5, false, true, true, 'N/A'),
(4, '102', 140.00, 3, true, true, false, 'N/A'),
(4, '103', 150.00, 2, true, false, true, 'N/A'),
(4, '104', 110.00, 4, false, false, true, 'N/A'),
(4, '105', 240.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Simple Stay 5
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(5, '101', 140.00, 3, true, true, true, 'N/A'),
(5, '102', 150.00, 5, false, true, true, 'N/A'),
(5, '103', 170.00, 2, true, false, true, 'N/A'),
(5, '104', 120.00, 4, true, false, false, 'N/A'),
(5, '105', 260.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 1
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(9, '101', 150.00, 4, true, false, true, 'N/A'),
(9, '102', 170.00, 2, true, true, false, 'N/A'),
(9, '103', 180.00, 5, false, true, true, 'N/A'),
(9, '104', 130.00, 3, false, false, true, 'N/A'),
(9, '105', 280.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 2
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(10, '101', 160.00, 3, true, true, true, 'N/A'),
(10, '102', 180.00, 5, false, true, true, 'N/A'),
(10, '103', 190.00, 2, true, false, false, 'N/A'),
(10, '104', 140.00, 4, true, false, true, 'N/A'),
(10, '105', 300.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 3
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(11, '101', 170.00, 2, false, false, true, 'N/A'),
(11, '102', 190.00, 4, true, true, false, 'N/A'),
(11, '103', 200.00, 3, true, false, true, 'N/A'),
(11, '104', 150.00, 5, false, true, true, 'N/A'),
(11, '105', 320.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 4
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(12, '101', 180.00, 3, true, false, true, 'N/A'),
(12, '102', 200.00, 5, false, true, true, 'N/A'),
(12, '103', 210.00, 2, true, false, false, 'N/A'),
(12, '104', 160.00, 4, true, true, true, 'N/A'),
(12, '105', 340.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 5
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(13, '101', 190.00, 4, false, true, true, 'N/A'),
(13, '102', 210.00, 2, true, false, false, 'N/A'),
(13, '103', 220.00, 5, true, true, true, 'N/A'),
(13, '104', 170.00, 3, false, false, true, 'N/A'),
(13, '105', 360.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 6
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(14, '101', 200.00, 5, true, true, true, 'N/A'),
(14, '102', 220.00, 3, false, true, true, 'N/A'),
(14, '103', 230.00, 2, true, false, false, 'N/A'),
(14, '104', 180.00, 4, true, false, true, 'N/A'),
(14, '105', 380.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 7
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(15, '101', 210.00, 3, true, true, true, 'N/A'),
(15, '102', 230.00, 5, false, true, true, 'N/A'),
(15, '103', 240.00, 2, true, false, false, 'N/A'),
(15, '104', 190.00, 4, true, false, true, 'N/A'),
(15, '105', 400.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Grand Suites 8
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(16, '101', 220.00, 4, false, true, true, 'N/A'),
(16, '102', 240.00, 2, true, false, false, 'N/A'),
(16, '103', 250.00, 5, true, true, true, 'N/A'),
(16, '104', 200.00, 3, false, false, true, 'N/A'),
(16, '105', 420.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 1
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(17, '101', 230.00, 2, true, false, true, 'N/A'),
(17, '102', 250.00, 4, false, true, true, 'N/A'),
(17, '103', 260.00, 3, true, true, false, 'N/A'),
(17, '104', 210.00, 5, true, false, true, 'N/A'),
(17, '105', 440.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 2
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(18, '101', 240.00, 3, true, true, true, 'N/A'),
(18, '102', 260.00, 5, false, true, true, 'N/A'),
(18, '103', 270.00, 2, true, false, false, 'N/A'),
(18, '104', 220.00, 4, true, false, true, 'N/A'),
(18, '105', 460.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 3
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(19, '101', 250.00, 4, false, true, true, 'N/A'),
(19, '102', 270.00, 2, true, false, false, 'N/A'),
(19, '103', 280.00, 5, true, true, true, 'N/A'),
(19, '104', 230.00, 3, false, false, true, 'N/A'),
(19, '105', 480.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 4
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(20, '101', 260.00, 3, true, false, true, 'N/A'),
(20, '102', 280.00, 5, false, true, true, 'N/A'),
(20, '103', 290.00, 2, true, true, false, 'N/A'),
(20, '104', 240.00, 4, true, false, true, 'N/A'),
(20, '105', 500.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 5
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(21, '101', 270.00, 4, false, true, true, 'N/A'),
(21, '102', 290.00, 2, true, false, false, 'N/A'),
(21, '103', 300.00, 5, true, true, true, 'N/A'),
(21, '104', 250.00, 3, false, false, true, 'N/A'),
(21, '105', 520.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 6
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(22, '101', 280.00, 5, true, true, true, 'N/A'),
(22, '102', 300.00, 3, false, true, true, 'N/A'),
(22, '103', 310.00, 2, true, false, false, 'N/A'),
(22, '104', 260.00, 4, true, false, true, 'N/A'),
(22, '105', 540.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 7
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(23, '101', 290.00, 3, true, true, true, 'N/A'),
(23, '102', 310.00, 5, false, true, true, 'N/A'),
(23, '103', 320.00, 2, true, false, false, 'N/A'),
(23, '104', 270.00, 4, true, false, true, 'N/A'),
(23, '105', 560.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Paradise Hotels 8
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(24, '101', 300.00, 4, false, true, true, 'N/A'),
(24, '102', 320.00, 2, true, false, false, 'N/A'),
(24, '103', 330.00, 5, true, true, true, 'N/A'),
(24, '104', 280.00, 3, false, false, true, 'N/A'),
(24, '105', 580.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 1
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(25, '101', 310.00, 3, true, true, true, 'N/A'),
(25, '102', 330.00, 5, false, true, true, 'N/A'),
(25, '103', 340.00, 2, true, false, false, 'N/A'),
(25, '104', 290.00, 4, true, false, true, 'N/A'),
(25, '105', 600.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 2
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(26, '101', 320.00, 4, false, true, true, 'N/A'),
(26, '102', 340.00, 2, true, false, false, 'N/A'),
(26, '103', 350.00, 5, true, true, true, 'N/A'),
(26, '104', 300.00, 3, false, false, true, 'N/A'),
(26, '105', 620.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 3
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(27, '101', 330.00, 3, true, true, true, 'N/A'),
(27, '102', 350.00, 5, false, true, true, 'N/A'),
(27, '103', 360.00, 2, true, false, false, 'N/A'),
(27, '104', 310.00, 4, true, false, true, 'N/A'),
(27, '105', 640.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 4
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(28, '101', 340.00, 4, false, true, true, 'N/A'),
(28, '102', 360.00, 2, true, false, false, 'N/A'),
(28, '103', 370.00, 5, true, true, true, 'N/A'),
(28, '104', 320.00, 3, false, false, true, 'N/A'),
(28, '105', 660.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 5
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(29, '101', 350.00, 3, true, true, true, 'N/A'),
(29, '102', 370.00, 5, false, true, true, 'N/A'),
(29, '103', 380.00, 2, true, false, false, 'N/A'),
(29, '104', 330.00, 4, true, false, true, 'N/A'),
(29, '105', 680.00, 1, true, true, true, 'N/A');

-- Inserting rooms for Tranquil Inns 6
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(30, '106', 370.00, 1, true, true, true, 'N/A'),
(30, '107', 390.00, 2, true, false, false, 'N/A'),
(30, '108', 400.00, 3, false, true, true, 'N/A'),
(30, '109', 350.00, 4, true, false, true, 'N/A'),
(30, '110', 720.00, 5, false, false, true, 'N/A');

-- Inserting rooms for Tranquil Inns 7
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(31, '101', 380.00, 2, true, true, true, 'N/A'),
(31, '102', 400.00, 4, false, true, true, 'N/A'),
(31, '103', 410.00, 1, true, false, false, 'N/A'),
(31, '104', 360.00, 3, true, false, true, 'N/A'),
(31, '105', 740.00, 5, false, false, true, 'N/A');

-- Inserting rooms for Tranquil Inns 8
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(32, '101', 390.00, 2, true, true, true, 'N/A'),
(32, '102', 410.00, 4, false, true, true, 'N/A'),
(32, '103', 420.00, 1, true, false, false, 'N/A'),
(32, '104', 370.00, 3, true, false, true, 'N/A'),
(32, '105', 760.00, 5, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 1
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(33, '101', 400.00, 1, true, true, true, 'N/A'),
(33, '102', 420.00, 2, false, true, true, 'N/A'),
(33, '103', 430.00, 3, true, false, false, 'N/A'),
(33, '104', 380.00, 4, true, false, true, 'N/A'),
(33, '105', 780.00, 5, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 2
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(34, '101', 410.00, 2, true, true, true, 'N/A'),
(34, '102', 430.00, 4, false, true, true, 'N/A'),
(34, '103', 440.00, 1, true, false, false, 'N/A'),
(34, '104', 390.00, 3, true, false, true, 'N/A'),
(34, '105', 800.00, 5, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 3
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(35, '101', 420.00, 3, true, true, true, 'N/A'),
(35, '102', 440.00, 5, false, true, true, 'N/A'),
(35, '103', 450.00, 1, true, false, false, 'N/A'),
(35, '104', 400.00, 4, true, false, true, 'N/A'),
(35, '105', 820.00, 2, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 4
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(36, '101', 430.00, 4, true, true, true, 'N/A'),
(36, '102', 450.00, 2, false, true, true, 'N/A'),
(36, '103', 460.00, 5, true, false, false, 'N/A'),
(36, '104', 410.00, 3, true, false, true, 'N/A'),
(36, '105', 840.00, 1, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 5
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(37, '101', 440.00, 3, true, true, true, 'N/A'),
(37, '102', 460.00, 5, false, true, true, 'N/A'),
(37, '103', 470.00, 1, true, false, false, 'N/A'),
(37, '104', 420.00, 4, true, false, true, 'N/A'),
(37, '105', 860.00, 2, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 6
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(38, '101', 450.00, 4, true, true, true, 'N/A'),
(38, '102', 470.00, 2, false, true, true, 'N/A'),
(38, '103', 480.00, 5, true, false, false, 'N/A'),
(38, '104', 430.00, 3, true, false, true, 'N/A'),
(38, '105', 880.00, 1, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 7
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(39, '101', 460.00, 3, true, true, true, 'N/A'),
(39, '102', 480.00, 5, false, true, true, 'N/A'),
(39, '103', 490.00, 1, true, false, false, 'N/A'),
(39, '104', 440.00, 4, true, false, true, 'N/A'),
(39, '105', 900.00, 2, false, false, true, 'N/A');

-- Inserting rooms for Serene Retreats 8
INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
VALUES
(40, '101', 470.00, 4, true, true, true, 'N/A'),
(40, '102', 490.00, 2, false, true, true, 'N/A'),
(40, '103', 500.00, 5, true, false, false, 'N/A'),
(40, '104', 450.00, 3, true, false, true, 'N/A'),
(40, '105', 920.00, 1, false, false, true, 'N/A');

-- Insert dummy data into Employee table
INSERT INTO Employee (HotelID, FullName, Address, SSN, Role) 
VALUES 
    (1, 'John Doe', '123 Main St, CityA', '123-45-6789', 'Manager'),
    (2, 'Jane Smith', '234 Maple St, CityA', '987-65-4321', 'Receptionist'),
    (3, 'Bob Johnson', '567 Pine St, CityB', '654-32-1098', 'Housekeeping');

-- Insert dummy data into Customers table
INSERT INTO Customers (FullName, Address, IDType, RegistrationDate) 
VALUES 
    ('Alice Johnson', '456 Elm St, CityB', 'Passport', '2023-01-15'),
    ('Michael Brown', '789 Oak St, CityA', 'Driver License', '2023-02-20'),
    ('Emily Davis', '234 Maple St, CityA', 'ID Card', '2023-03-25');

-- Insert dummy data into Bookings table
INSERT INTO Bookings (CustomerID, RoomID, CheckinDate, CheckoutDate, BookingDate) 
VALUES 
    (1, 1, '2023-04-01', '2023-04-05', '2023-03-01'),
    (2, 2, '2023-05-10', '2023-05-15', '2023-04-15'),
    (3, 3, '2023-06-20', '2023-06-25', '2023-05-25');

INSERT INTO Rentings (CustomerID, RoomID, EmployeeID, CheckinDate, CheckoutDate, BookingDate) 
VALUES 
    (1, 1, 1, '2023-04-01', '2023-04-05', '2023-03-01'),
    (2, 2, 2, '2023-05-10', '2023-05-15', '2023-04-15'),
    (3, 3, 3, '2023-06-20', '2023-06-25', '2023-05-25');

-- Insert dummy data into Amenities table
INSERT INTO Amenities (AmenityName) 
VALUES 
    ('WiFi'),
    ('Swimming Pool'),
    ('Gym');

-- Insert dummy data into RoomAmenities table
INSERT INTO RoomAmenities (RoomID, AmenityID) 
VALUES 
    (1, 1),
    (2, 2),
    (3, 3);

