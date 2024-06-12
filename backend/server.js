require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const db = require ("./db");

const app = express();


//------------------MIDDLEWARE-------------------\\
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());


/*------------------ROUTES-----------------------\\
CRUD Operation  |   Method  |   URL            |
--------------------------------------------------
Retrieve All    |   GET     |   /api/v1/[class]
Retrieve One    |   GET     |   /api/v1/[class]/:id
Create          |   POST    |   /api/v1/[class]
Update          |   PUT     |   /api/v1/[class]/:id
Delete          |   DELETE  |   /api/v1/[class]/:id
/*------------------------------------------------*/


//TODO: Update all returns to specify request.data.data.DTName


//Get all hotels
app.get("/api/v1/hotels", async (req, res) => {
    try{
        const q = `
            SELECT
                H.HotelID,
                H.HotelName,
                H.Category,
                H.HotelAddress,
                H.NumRooms,
                H.ContactEmail,
                H.ContactPhone,
                HC.ChainName
            FROM
                Hotels H
            JOIN
                HotelChains HC ON H.ChainID = HC.ChainID
            ORDER BY
                H.HotelID;
        `
        const result = await db.query(q);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                hotels: result.rows
            }
        })
        console.log("get all hotels");
    } catch (err) {
        console.error(err.message);
    }
});

//Get ONE hotels by ID
app.get("/api/v1/hotels/:id", async (req, res) => {
    try{
        const q = `
        SELECT
            H.HotelID,
            H.HotelName,
            H.Category,
            H.HotelAddress,
            H.NumRooms,
            H.ContactEmail,
            H.ContactPhone,
            HC.ChainName
        FROM
            Hotels H
        JOIN
            HotelChains HC ON H.ChainID = HC.ChainID
        WHERE
            H.HotelID = $1;
        `;
        const result = await db.query(q, [req.params.id]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                hotel: result.rows
            }
        })
        console.log("get one hotels");
    } catch (err) {
        console.error(err.message);
    }
});

//Create a hotel
app.post("/api/v1/hotels/", async (req, res) => {
    try {
        const q = `
        INSERT INTO Hotels (ChainID, HotelName, Category, HotelAddress, NumRooms, ContactEmail, ContactPhone)
        VALUES
        ($1,  $2, $3, $4, $5, $6, $7, $8) returning *
        `;

        const result = await db.query(q, [
            req.body.chain,
            req.body.hotelName, 
            req.body.categpry,
            req.body.address, 
            req.body.numRooms, 
            req.body.email, 
            req.body.phone,
            req.params.id
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                hotel: result.rows
            }
        })
        console.log("room created");
    } catch (err) {
        console.error(err.message);
    }
});

// Update a Hotel
// We can use ID param because we are only updating a hotel that we know the id of
app.put("/api/v1/hotels/:id", async (req, res) => {
    try {
        // First, retrieve the ChainID based on the provided chainname
        const chainQuery = `
            SELECT ChainID 
            FROM HotelChains 
            WHERE ChainName = $1
        `;
        const chainResult = await db.query(chainQuery, [req.body.chainname]);

        // Check if a matching chain was found
        if (chainResult.rows.length === 0) {
            return res.status(404).json({ error: "Chain not found" });
        }

        const chainId = chainResult.rows[0].chainid;

        // Now update the hotel with the new values
        const updateQuery = `
            UPDATE Hotels 
            SET ChainID = $1,
                HotelName = $2,
                Category = $3,
                HotelAddress = $4,
                NumRooms = $5,
                ContactEmail = $6,
                ContactPhone = $7
            WHERE HotelID = $8
            RETURNING *
        `;

        const result = await db.query(updateQuery, [
            chainId,
            req.body.hotelname,
            req.body.category,
            req.body.hoteladdress,
            req.body.numrooms,
            req.body.contactemail,
            req.body.contactphone,
            req.params.id // Hotel ID from the URL parameter
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                hotel: result.rows
            }
        });
        console.log("Hotel updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message }); // Handle error responses
    }
});

// Delete a hotel by ID
app.delete("/api/v1/hotels/:id", async (req, res) => {
    try {
        const deleteRoomsQuery = `
            DELETE FROM rooms
            WHERE HotelID = $1
        `;
        await db.query(deleteRoomsQuery, [req.params.id]);

        const deleteHotelQuery = `
            DELETE FROM hotels
            WHERE HotelID = $1
        `;
        await db.query(deleteHotelQuery, [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("Hotel and associated rooms deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});


//Get all room
app.get("/api/v1/rooms", async (req, res) => {
    try{
        const query = `
        SELECT
            R.RoomID,
            R.RoomNumber,
            R.PricePerNight,
            R.Capacity,
            R.Seaview,
            R.MountainView,
            R.Extendable,
            R.MaintenanceNotes,
            H.HotelName,
            H.Category,
            H.HotelAddress
        FROM
            Rooms R
        JOIN
            Hotels H ON R.HotelID = H.HotelID
        ORDER BY
            R.RoomID;
        `
        const result = await db.query(query);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                rooms: result.rows
            }
        })
        console.log("get all rooms");
    } catch (err) {
        console.error(err.message);
    }
});

//Get all rooms with requirements
app.post("/api/v1/rooms", async (req, res) => {
    try{
        const query=`
        SELECT
            R.RoomID,
            R.RoomNumber,
            R.PricePerNight,
            R.Capacity,
            R.Seaview,
            R.MountainView,
            R.Extendable,
            R.MaintenanceNotes,
            H.HotelName,
            H.Category,
            H.HotelAddress
        FROM
            Rooms R
        JOIN
            Hotels H ON R.HotelID = H.HotelID
        JOIN
            HotelChains HC ON H.ChainID = HC.ChainID
        LEFT JOIN
            Bookings B ON R.RoomID = B.RoomID
        WHERE
            ($1 BETWEEN COALESCE(B.CheckinDate, $1) AND COALESCE(B.CheckoutDate, $1)) OR
            ($2 BETWEEN COALESCE(B.CheckinDate, $2) AND COALESCE(B.CheckoutDate, $2)) OR
            (COALESCE(B.CheckinDate, $1) BETWEEN $1 AND $2) OR
            (COALESCE(B.CheckoutDate, $2) BETWEEN $1 AND $2) OR
            (B.BookingID IS NULL)
            AND R.PricePerNight <= COALESCE($3, R.PricePerNight)
            AND H.HotelAddress LIKE '%' || COALESCE($4, H.HotelAddress) || '%'
            AND R.Capacity >= COALESCE($5, R.Capacity)
            AND HC.ChainName LIKE COALESCE('%' || $6 || '%', HC.ChainName)
            AND H.Category >= COALESCE($7, H.Category)
            AND H.NumRooms <= COALESCE($8, H.NumRooms);
        `;
        const result = await db.query(query, [
            req.body.checkin,
            req.body.checkout,
            req.body.maxPrice,
            req.body.city,
            req.body.minCapacity,
            req.body.chain,
            req.body.rating,
            req.body.maxRooms
        ]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                rooms: result.rows
            }
        })
        console.log("get all rooms");
    } catch (err) {
        console.error(err.message);
    }
});

//Get ONE room by ID
app.get("/api/v1/rooms/:id", async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM rooms WHERE roomid = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                rooms: result.rows
            }
        })
        console.log("get one rooms");
    } catch (err) {
        console.error(err.message);
    }
});

//Create a room
app.post("/api/v1/rooms/create", async (req, res) => {
    try {
        const q = `
        INSERT INTO Rooms (HotelID, RoomNumber, PricePerNight, Capacity, Seaview, MountainView, Extendable, MaintenanceNotes)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8) returning *
        `;

        const result = await db.query(q, [
            req.body.hotelID,
            req.body.roomNumber, 
            req.body.price,
            req.body.capacity, 
            req.body.seaview, 
            req.body.mountainview, 
            req.body.extendable,
            req.body.notes,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                rooms: result.rows
            }
        })
        console.log("room created");
    } catch (err) {
        console.error(err.message);
    }
});

//Update a Room
//We can use ID param because we are only updating a hotel that we know the id of
app.put("/api/v1/rooms/:id", async (req, res) => {
    try {
        // Retrieve HotelID based on hotelname
        const getHotelIdQuery = `
            SELECT HotelID 
            FROM hotels 
            WHERE HotelName = $1
        `;
        const hotelResult = await db.query(getHotelIdQuery, [req.body.hotelname]);

        if (hotelResult.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Hotel not found",
            });
        }

        const hotelId = hotelResult.rows[0].hotelid;

        // Update the room using the retrieved HotelID
        const updateRoomQuery = `
            UPDATE rooms 
            SET HotelID=$1, RoomNumber=$2, PricePerNight=$3, Capacity=$4, Seaview=$5, MountainView=$6, Extendable=$7, MaintenanceNotes=$8
            WHERE roomID=$9
            RETURNING *
        `;
        const result = await db.query(updateRoomQuery, [
            hotelId,
            req.body.roomnumber, 
            req.body.pricepernight,
            req.body.capacity, 
            req.body.seaview, 
            req.body.mountainview, 
            req.body.extendable,
            req.body.maintenancenotes,
            req.params.id
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                room: result.rows
            }
        });
        console.log("Room updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});

// Delete a room by ID
app.delete("/api/v1/rooms/:id", async (req, res) => {
    try {
        const deleteRentingsQuery = `
            DELETE FROM rentings
            WHERE RoomID = $1
        `;
        await db.query(deleteRentingsQuery, [req.params.id]);

        const deleteBookingsQuery = `
            DELETE FROM bookings
            WHERE RoomID = $1
        `;
        await db.query(deleteBookingsQuery, [req.params.id]);

        const deleteRoomAmenitiesQuery = `
            DELETE FROM roomamenities
            WHERE RoomID = $1
        `;
        await db.query(deleteRoomAmenitiesQuery, [req.params.id]);

        const deleteRoomQuery = `
            DELETE FROM rooms
            WHERE RoomID = $1
        `;
        await db.query(deleteRoomQuery, [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("Room and associated rentings and amenities deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

//Get all customer
app.get("/api/v1/customers", async (req, res) => {
    try{
        const result = await db.query("select * from customers order by customerID");
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customers: result.rows
            }
        })
        console.log("get all customers");
    } catch (err) {
        console.error(err.message);
    }
});

//Get ONE customer by ID
app.get("/api/v1/customers/:id", async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM customers WHERE customerID = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customer: result.rows
            }
        })
        console.log("get one customer");
    } catch (err) {
        console.error(err.message);
    }
});

//Create a customer
app.post("/api/v1/customers", async (req, res) => {
    try {
        const q = `
        INSERT INTO Customers (FullName, Address, IDType, RegistrationDate)
        VALUES
        ($1, $2, $3, $4) returning *
        `;

        const result = await db.query(q, [
            req.body.fullname,
            req.body.address,
            req.body.idtype,
            req.body.registrationDate,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customer: result.rows
            }
        })
        console.log("customer created");
    } catch (err) {
        console.error(err.message);
    }
});

//Update a customer
//We can use ID param because we are only updating a hotel that we know the id of
app.put("/api/v1/customers/:id", async (req, res) => {
    try {
        const q = `
        UPDATE customers SET FullName=$1, Address=$2, IDType=$3, RegistrationDate=$4
        where customerID=$5 returning *
        `;

        const result = await db.query(q, [
            req.body.fullname,
            req.body.address,
            req.body.idtype,
            req.body.registrationDate,
            req.params.id,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customer: result.rows
            }
        })
        console.log("customer updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a customer by ID
app.delete("/api/v1/customers/:id", async (req, res) => {
    try {
        const deleteBookingsQuery = `
            DELETE FROM bookings
            WHERE CustomerID = $1
        `;
        await db.query(deleteBookingsQuery, [req.params.id]);

        const deleteCustomerQuery = `
            DELETE FROM customers
            WHERE CustomerID = $1
        `;
        await db.query(deleteCustomerQuery, [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("Customer and associated bookings deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

//Get all employee
app.get("/api/v1/employees", async (req, res) => {
    try{
        const q = `
        SELECT
            E.EID,
            E.FullName,
            E.Address,
            E.SSN,
            E.Role,
            H.HotelName
        FROM
            Employee E
        JOIN
            Hotels H ON E.HotelID = H.HotelID
        ORDER BY
            E.EID;
        `
        const result = await db.query(q);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                employees: result.rows
            }
        })
        console.log("get all employees");
    } catch (err) {
        console.error(err.message);
    }
});

//Get ONE employee by ID
app.get("/api/v1/employees/:id", async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM employee WHERE EID = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                room: result.rows
            }
        })
        console.log("get one employee");
    } catch (err) {
        console.error(err.message);
    }
});

//Create a employee
app.post("/api/v1/employees", async (req, res) => {
    try {
        const q = `
        INSERT INTO employee (HotelID, FullName, Address, SSN, Role)
        VALUES
        ($1, $2, $3, $4, $5) returning *
        `;

        const result = await db.query(q, [
            req.body.hotelID,
            req.body.fullname,
            req.body.address,
            req.body.ssn,
            req.body.role,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                employee: result.rows
            }
        })
        console.log("employee created");
    } catch (err) {
        console.error(err.message);
    }
});

//Update a employee
//We can use ID param because we are only updating a hotel that we know the id of
app.put("/api/v1/employees/:id", async (req, res) => {
    try {

        // First, retrieve the HotelID based on the provided chainname
        const hotelQ = `
            SELECT HotelID 
            FROM Hotels 
            WHERE HotelName = $1
        `;
        const hotelRes = await db.query(hotelQ, [req.body.hotelname]);

        // Check if a matching chain was found
        if (hotelRes.rows.length === 0) {
            return res.status(404).json({ error: "Chain not found" });
        }

        const hotelID = hotelRes.rows[0].hotelid;

        const q = `
        UPDATE employee SET HotelID=$1, FullName=$2, Address=$3, SSN=$4, Role=$5 
        WHERE
            EID=$6
        returning *;
        `;

        const result = await db.query(q, [
            hotelID,
            req.body.fullname,
            req.body.address,
            req.body.ssn,
            req.body.role,
            req.params.id,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                employee: result.rows
            }
        })
        console.log("employee updated");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an employee by ID
app.delete("/api/v1/employees/:id", async (req, res) => {
    try {
        const deleteEmployeeQuery = `
            DELETE FROM employees
            WHERE EID = $1
        `;
        await db.query(deleteEmployeeQuery, [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("Employee deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

//Get all bookings
app.get("/api/v1/bookings", async (req, res) => {
    try{
        const q = `
        SELECT 
            B.BookingID,
            B.CustomerID,
            B.RoomID,
            B.CheckinDate,
            B.CheckoutDate,
            B.BookingDate,
            R.RoomNumber,
            H.HotelName,
            C.FullName
        FROM 
            Bookings B
        JOIN 
            Rooms R ON B.RoomID = R.RoomID
        JOIN 
            Hotels H ON R.HotelID = H.HotelID
        JOIN
            Customers C ON B.CustomerID = C.CustomerID;
        `;
        const result = await db.query(q);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                bookings: result.rows
            }
        })
        console.log("get all bookings");
    } catch (err) {
        console.error(err.message);
    }
});

//Get bookings by customerID
app.get("/api/v1/bookings/:id", async (req, res) => {
    try{
        const q = `
        SELECT
            B.BookingID,
            B.CustomerID,
            B.RoomID,
            B.CheckinDate,
            B.CheckoutDate,
            B.BookingDate,
            R.RoomNumber,
            H.HotelName,
            C.FullName
        FROM
            Bookings B
        JOIN
            Rooms R ON R.RoomID = B.RoomID
        JOIN 
            Hotels H ON H.HotelID = R.HotelID
        JOIN 
            Customers C ON C.CustomerID = B.CustomerID
        WHERE
            B.CustomerID = $1
        `;
        const result = await db.query(q, [req.params.id]);
        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                bookings: result.rows
            }
        })
        console.log("get some booking");
    } catch (err) {
        console.error(err.message);
    }
});

//Create a booking
app.post("/api/v1/bookings", async (req, res) => {
    try {
        const q = `
        INSERT INTO Bookings (CustomerID, RoomID, CheckinDate, CheckoutDate, BookingDate) 
        VALUES 
            ($1, $2, $3, $4, $5) returning *;
        `;

        const result = await db.query(q, [
            req.body.customerid,
            req.body.roomid,
            req.body.checkin,
            req.body.checkout,
            req.body.bookingdate
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customer: result.rows
            }
        })
        console.log("customer created");
    } catch (err) {
        console.error(err.message);
    }
});

//Update a boooking
//We can use ID param because we are only updating a hotel that we know the id of
app.put("/api/v1/booking/:id", async (req, res) => {
    try {
        const q = `
        UPDATE Bookings 
        SET CustomerID=$1, RoomID=$2, CheckinDate=$3, CheckoutDate=$4
        WHERE BookingID=$5 
        RETURNING *
        `;

        const result = await db.query(q, [
            req.body.customerID,
            req.body.roomID,
            req.body.checkinDate,
            req.body.checkoutDate,
            req.params.id,
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                booking: result.rows
            }
        });
        console.log("Booking updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
});

// Delete a booking by ID
app.delete("/api/v1/bookings/:id", async (req, res) => {
    try {
        const deleteBookingQuery = `
            DELETE FROM bookings
            WHERE BookingID = $1
        `;
        await db.query(deleteBookingQuery, [req.params.id]);

        res.status(204).json({
            status: "success",
        });
        console.log("Booking deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

//Create a renting
app.post("/api/v1/rentings", async (req, res) => {
    try {
        const q = `
        INSERT INTO Rentings (CustomerID, RoomID, EmployeeID, CheckinDate, CheckoutDate, BookingDate)
        VALUES 
            ($1, $2, $3, $4, $5, $6) returning *;
        `;

        const result = await db.query(q, [
            req.body.customerid,
            req.body.roomid,
            req.body.eid,
            req.body.checkindate,
            req.body.checkoutdate,
            req.body.bookingdate
        ]);

        res.status(200).json({
            status: "success",
            results: result.rows.length,
            data: {
                customer: result.rows
            }
        })
        console.log("renting created");
    } catch (err) {
        console.error(err.message);
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});