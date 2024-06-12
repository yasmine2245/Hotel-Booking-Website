import React, { useContext, useState } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";

const BookAction = () => {
    const { selectedRoom } = useContext(HotelsContext);
    const { inputs } = useContext(HotelsContext);
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState({
        customerid:"",
        roomid:"",
        checkin: "",
        checkout: "",
        bookingdate: "",
    });

    const todaysDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return (`${year}-${month}-${day}`);
    }

    const addTodaysDate = () => {
        const name = "bookingdate";
        const value = todaysDate();
        setBookingDetails((prevBookingDetails) => ({
            ...prevBookingDetails,
            [name]: value,
        }));
    };

    const handleBooking = async (event) => {
        event.preventDefault();
        let response;
        addTodaysDate();
        const fetchData = async () => {
            try {
                console.log("Booking Details:", bookingDetails);
                console.log("Selected Room:", selectedRoom);
                response = await HotelSearch.post(`/bookings`, bookingDetails);
                navigate("/confirmation");
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails((prevBookingDetails) => ({
            ...prevBookingDetails,
            [name]: value,
        }));
    };


    return (
        <div className="container shadow rounded-3 p-5">
            <h2>Book Now</h2>
            <p>Room: {selectedRoom.roomnumber}</p>
            <div className="col-auto">
                <form onSubmit={handleBooking}>
                    <div className="row">
                        <div className="col">
                            <label className="form-label" htmlFor="checkin">Check-In Date:</label>
                            <input
                                type="date"
                                id="checkin"
                                name="checkin"
                                value={inputs.checkin}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label" htmlFor="checkin">Check-Out Date:</label>
                            <input
                                type="date"
                                id="checkout"
                                name="checkout"
                                value={inputs.checkout}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="form-label" htmlFor="checkin">CustomerID:</label>
                            <input
                                type="number"
                                id="customerid"
                                name="customerid"
                                value={bookingDetails.customerid}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col">
                            <label className="form-label" htmlFor="checkin">RoomID: </label>
                            <input
                                type="number"
                                id="roomid"
                                name="roomid"
                                value={inputs.roomid}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit">Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default BookAction;
