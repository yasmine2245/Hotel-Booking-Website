-- QUERIES

--query to retrieve all rooms with a sea view
SELECT *
FROM Rooms
WHERE Seaview = 'true';

--query to retrieve all rooms with a mountain view
SELECT *
FROM Rooms
WHERE MountainView = 'true';

--query to find total number of rooms in each hotel
SELECT HotelID, COUNT(*) AS NumRooms
FROM Rooms
GROUP BY HotelID;

--query to find hotels where the average price per night is above overall average
SELECT h.HotelName, AVG(r.PricePerNight) AS AvgPricePerNight
FROM Hotels h
Join Rooms r ON h.hotelID = r.HotelID
GROUP BY h.hotelName
HAVING AVG(r.PricePerNight) > (
		SELECT AVG(PricePerNight)
		FROM Rooms
);

--query to find the average price per night for each hotel chain
SELECT hc.ChainName, AVG(r.PricePerNight) AS AvgPricePerNight
FROM HotelChains hc
JOIN Hotels h ON hc.ChainID = h.ChainID
JOIN Rooms r ON h.HotelID = r.HotelID
GROUP BY hc.ChainName;

--query to find rooms where the capacity is 3 or more(example: for families)
SELECT *
FROM Rooms
WHERE capacity >= 3;

--query to find all hotels of same chain
SELECT hc.ChainID, hc.ChainName, COUNT(h.HotelID) AS NumHotels
FROM HotelChains hc
LEFT JOIN Hotels h ON hc.ChainID = h.ChainID
GROUP BY hc.ChainID, hc.ChainName;

--query to find roomid and corresponding custoer id
SELECT r.RoomID, c.CustomerID
FROM Rooms r
INNER JOIN Rentings c ON r.RoomID = c.RoomID;



-- TRIGGERS

--trigger to ensure only one manager per hotel
CREATE TRIGGER OnlyOneManagerPerHotel
BEFORE INSERT ON Employee
FOR EACH ROW
BEGIN
    DECLARE manager_count INT;
    SELECT COUNT(*) INTO manager_count FROM Employee WHERE Role ='Manager' AND HotelID = NEW.HotelID;
    IF manager_count>0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only one manager is allowed per hotel';
    END IF;
END;

--trigger to ensure customers access availability through employes
CREATE TRIGGER CheckBookingEmployee
BEFORE INSERT ON Booking
FOR EACH ROW
BEGIN
    DECLARE employee_role VARCHAR(100);
    SELECT Role INTO employee_role FROM Employee WHERE EID = NEW.EmployeeID;
    IF employee_role IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Only employees can make bookings';
    END IF;
END;

--Foreign key constraints

--Booking table
ALTER TABLE Booking
ADD CONSTRAINT fk_room_id
FOREIGN KEY (RoomID)
REFERENCES Room(RoomID)
ON UPDATE CASCADE
ON DELETE CASCADE;

--Employee table
ALTER Table Employee
ADD CONSTRAINT fk_hotel_id
FOREIGN KEY (HotelID)
REFERENCES Hotel(HotelID)
ON UPDATE CASCADE
ON DELETE CASCADE;

--Room table
ALTER TABLE Room
ADD CONSTRAINT fk_hotel_id
FOREIGN KEY (HotelID)
REFERENCES Hotel(HotelID)
ON UPDATE CASCADE
ON DELETE CASCADE;

--Hotel tabel
ALTER TABLE Hotel
ADD CONSTRAINT fk_chain_id
FOREIGN KEY (ChainID)
REFERENCES Chain(ChainID)
ON UPDATE CASCADE
ON DELETE CASCADE;

--INDEXES

--index on seaview column in Rooms table
-- Justification: will accelerate queries that retrieve all rooms with sea view and improves performance of query
CREATE INDEX idx_seaview ON Rooms(SeaView); 

--index on mountainview column in Rooms table
-- Justification: will accelerate queries that retrieve all rooms with mountain view and improves performance of query
CREATE INDEX idx_seaview ON Rooms(MountainView); 

--index on Rooms table for capacity
--Justification : beneficial for queries that involve filtering rooms based on capacity, it accelerates searches with specific capacity and improves performance of booking.
CREATE INDEX idx_capacity ON Rooms(Capacity);

--index on hotels for chainID
--Justification: Facilitates queries that join or filter hotels based on chain and speeds up operations like finding all hotels belonging to the same chain or retrieving info about them.
CREATE INDEX idx_chain_id ON Hotels(ChainID);

--index on Rentings table for customerid and roomid
--Justification: useful for queries involving rentings by a specific customer for a specific room, it also speeda up the searches for all rentings associatied with a room.
CREATE INDEX idx_rentings_customer_room ON Rentings(CustomerID, RoomId);

--Views

--View 1: number of available rooms per area
CREATE VIEW AvailableRoomsPerArea AS
SELECT r.HotelID, h.HotelName, r.RoomID, r.RoomNumber, r.Capacity, 
       CASE 
           WHEN b.RoomID IS NULL THEN 'Available'
           ELSE 'Booked'
       END AS Availability
FROM Rooms r
JOIN Hotels h ON r.HotelID = h.HotelID
LEFT JOIN Bookings b ON r.RoomID = b.RoomID;

--VIEW 2: aggregated capacity of all rooms of a specific hotel
CREATE VIEW TotalRoomCapacityPerHotel AS
SELECT h.HotelID, h.HotelName, SUM(r.Capacity) AS TotalCapacity
FROM Hotels h
JOIN Rooms r ON h.HotelID = r.HotelID
GROUP BY h.HotelID, h.HotelName;





