import React, { useContext, useEffect } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";


const MyBookingsView = () => {

    const { setSelectedBooking } = useContext(HotelsContext);
    const { setInfoType } = useContext(HotelsContext);
    const { bookings, setBookings } = useContext(HotelsContext);
    const { selectedCustomer, setSelectedCustomer } = useContext(HotelsContext);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelSearch.get(`/bookings/${selectedCustomer.customerid}`, );
                setBookings(response.data.data.bookings);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    },[selectedCustomer]);

    const handleClick = (b) => {
        setSelectedBooking(b)
        setInfoType("booking")
        navigate(`/${b.bookingid}/info`);
    }

    const handleChange = (event) => { 
        const name = event.target.name; 
        const value = event.target.value;
        setSelectedCustomer(values => ({...values, [name]: value})) 
    }
    
    return (
        <div className="container row">
            <div className="col-auto">
                <form onSubmit={handleSubmit}>
                    <label className="form-label">Enter your customer ID: </label>
                    <input className="form-control" type="number" name="customerid" value={selectedCustomer.customerid} onChange={handleChange} />
                </form>
            </div>
            <div className="col-9">
                <table className="table table-hover">
                    <thead className="bg-secondary" style={{ position: "sticky", top: 0 }}>
                        <tr>
                            <td>Booking ID</td>
                            <td>Check-In</td>
                            <td>Check-Out</td>
                            <td>Customer Name</td>
                            <td>Hotel Name</td>
                            <td>Room Number</td>
                            <td>Booking Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => {
                            return(
                                <tr onClick={()=>{handleClick(b)}} style={{cursor: "pointer"}}>
                                    <td>{b.bookingid}</td>
                                    <td>{b.checkindate}</td>
                                    <td>{b.checkoutdate}</td>
                                    <td>{b.fullname}</td>
                                    <td>{b.hotelname}</td>
                                    <td>{b.roomnumber}</td>
                                    <td>{b.bookingdate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyBookingsView;
