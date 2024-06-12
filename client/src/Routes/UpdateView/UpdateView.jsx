import React, { useContext, useState } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";



const UpdateView = () => {

    const { selectedRoom, setSelectedRoom } = useContext(HotelsContext);
    const { selectedHotel, setSelectedHotel } = useContext(HotelsContext);
    const { selectedEmployee, setSelectedEmployee } = useContext(HotelsContext);
    const { selectedCustomer, setSelectedCustomer } = useContext(HotelsContext);
    const { selectedBooking, setSelectedBooking } = useContext(HotelsContext);
    const { inputs, setInputs } = useContext(HotelsContext);
    const { user_role, setUserRole } = useContext(HotelsContext);
    const { infoType, setInfoType } = useContext(HotelsContext);
    
    const navigate = useNavigate();

    const handleClose = (event) => {
        event.preventDefault();
        switch(infoType){
            case "room":
                navigate("/rooms");
                break;
            case "hotel":
                navigate("/hotels");
                break;
            case "employee":
                navigate("/employees");
                break;
            case "customer":
                navigate("/customers");
                break;
            case "booking":
                navigate("/bookings");
                break;
        }
    }

    const handleChange = (event) => { 
        const name = event.target.name; 
        const value = event.target.value;
        switch(infoType){
            case "room":
                setSelectedRoom(values => ({...values, [name]: value}));
                break;
            case "hotel":
                setSelectedHotel(values => ({...values, [name]: value}));
                break;
            case "employee":
                setSelectedEmployee(values => ({...values, [name]: value}));
                break;
            case "customer":
                setSelectedCustomer(values => ({...values, [name]: value}));
                break;
            case "booking":
                setSelectedBooking(values => ({...values, [name]: value}));
                break;
        }
    }

    const handleSave = async (event) => {
        event.preventDefault();
        let response;
        const fetchData = async () => {
            try {
                let response;
                switch(infoType){
                    case "room":
                        response = await HotelSearch.put(`/rooms/${selectedRoom.roomid}`, selectedRoom);
                        break;
                    case "hotel":
                        response = await HotelSearch.put(`/hotels/${selectedHotel.hotelid}`, selectedHotel);
                        break;
                    case "employee":
                        response = await HotelSearch.put(`/employees/${selectedEmployee.eid}`, selectedEmployee);
                        break;
                    case "customer":
                        response = await HotelSearch.put(`/customers/${selectedCustomer.customerid}`, selectedCustomer);
                        break;
                    case "booking":
                        response = await HotelSearch.put(`/bookings/${selectedBooking.bookingid}`, selectedBooking);
                        break;
                }
                console.log(response);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData(); 
        handleClose(event);       
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const fetchData = async () => {
            try {
                let response;
                switch(infoType){
                    case "room":
                        response = await HotelSearch.delete(`/rooms/${selectedRoom.roomid}`);
                        setSelectedRoom([]);
                        break;
                    case "hotel":
                        response = await HotelSearch.delete(`/hotels/${selectedHotel.hotelid}`);
                        setSelectedHotel([]);
                        break;
                    case "employee":
                        response = await HotelSearch.delete(`/employees/${selectedEmployee.eid}`);
                        setSelectedEmployee([]);
                        break;
                    case "customer":
                        response = await HotelSearch.delete(`/customers/${selectedCustomer.customerid}`);
                        setSelectedCustomer([]);
                        break;
                    case "booking":
                        response = await HotelSearch.delete(`/bookings/${selectedBooking.bookingid}`);
                        setSelectedBooking([]);
                        break;
                }
                console.log(response);
                handleClose();
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    }

    const extractCityName = (address) => {
        if(address != null){
        const parts = address.split(','); 
        const city = parts[parts.length - 1].trim(); 
        return(city); 
        }
        return (null);
    }

    function starsOutOfFive(n) {
        if (typeof n !== 'number' || isNaN(n) || n < 0 || n > 5) {
            return 'Invalid input. Please provide a number between 0 and 5.';
        }
        const solidStars = '★'.repeat(n);
        const emptyStars = '☆'.repeat(5 - n);
        const stars = solidStars + emptyStars;
        return stars;
    }

    return (
        <form>
            <div className="container col-auto shadow p-5 rounded-3">
                <div className="text-end">
                    <button type="button" className="btn-close" onClick={handleClose}></button>
                </div>
                <div className="row">
                    <div className="col-auto shadow rounded border py-3" id="mainInfo">
                        {infoType === "room" && (
                            <div className="text-align-center">
                                <div className="h6 m-3">Room</div>
                                <input className="form-control" type="number" name="roomnumber" value={selectedRoom.roomnumber} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "hotel" && (
                            <div className="text-align-center">
                                <label className="form-label">Hotel Name:</label>
                                <input className="form-control" type="text" name="hotelname" value={selectedHotel.hotelname} onChange={handleChange} />
                                <label className="form-label">Hotel Category:</label>
                                <select 
                                    className="form-select" 
                                    name="category"
                                    value={selectedHotel.category || "1"}
                                    onChange={handleChange}
                                >
                                    <option value={null}>Any</option>
                                    <option value={1}>★☆☆☆☆</option>
                                    <option value={2}>★★☆☆☆</option>
                                    <option value={3}>★★★☆☆</option>
                                    <option value={4}>★★★★☆</option>
                                    <option value={5}>★★★★★</option>
                                </select>
                                
                            </div>
                        )}
                        {infoType === "employee" && (
                            <div className="text-align-center">
                                <label classname="form-label">Full Name:</label>
                                <input className="form-control" type="text" name="fullname" value={selectedEmployee.fullname} onChange={handleChange} />
                                <label classname="form-label">EID: {selectedEmployee.eid}</label>
                            </div>
                        )}
                        {infoType === "customer" && (
                            <div className="text-align-center">
                                <label classname="form-label">Customer:</label>
                                <input className="form-control" type="text" name="fullname" value={selectedCustomer.fullname} onChange={handleChange} />
                                <label classname="form-label">CustomerID: {selectedCustomer.customerid}</label>
                            </div>
                        )}
                        {infoType === "booking" && (
                            <div className="text-align-center">
                                <label classname="form-label">Room:</label>
                                <input className="form-control" type="number" name="roomnumber" value={selectedBooking.roomnumber} onChange={handleChange} />
                                <label classname="form-label">Customer:</label>
                                <input className="form-control" type="text" name="fullname" value={selectedBooking.fullname} onChange={handleChange} />
                            </div>
                        )}
                    </div>
                    <div className="col" id="desc2">
                        {infoType === "room" && (
                            <div>
                                <label classname="form-label">Hotel Name: {selectedRoom.hotelname} </label><br/>
                                <label classname="form-label">City: {extractCityName(selectedRoom.hoteladdress)} </label><br/>
                                <label classname="form-label">Category: {starsOutOfFive(selectedRoom.category)}</label>
                            </div>
                        )}
                        {infoType === "hotel" && (
                            <div className="text-align-center">
                                <label className="form-label">Chain Name: {selectedHotel.chainname}</label>
                                <label className="form-label">Number of Rooms:</label>
                                <input className="form-control" type="number" name="numrooms" value={selectedHotel.numrooms} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "employee" && (
                            <div className="text-align-center">
                                <label classname="form-label">Hotel Name: {selectedEmployee.hotelname}</label><br/>
                                <label classname="form-label"> Role: </label>
                                <input className="form-control" type="text" name="role" value={selectedEmployee.role} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "customer" && (
                            <div className="text-align-center">
                                <label classname="form-label">Address:</label>
                                <input className="form-control" type="text" name="address" value={selectedCustomer.address} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "booking" && (
                            <div className="text-align-center">
                                <label classname="form-label">Checkin:</label>
                                <input className="form-control" type="date" name="checkindate" value={selectedCustomer.checkindate} onChange={handleChange} />
                                <label classname="form-label">Checkout:</label>
                                <input className="form-control" type="date" name="eid" value={selectedBooking.checkoutdate} onChange={handleChange} />
                            </div>
                        )}
                        
                    </div>
                    <div className="col">
                        {infoType === "room" && (
                            <div>
                                <div className="form-check form-switch">
                                    <label className="form-check-label" htmlFor="seaview">
                                        Sea view 🌊
                                    </label>
                                    <input className="form-check-input" type="checkbox" id="seaview" name="seaview" checked={selectedRoom.seaview} onChange={handleChange} />
                                    
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="mountainview" name="mountainview" checked={selectedRoom.mountainview} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="mountainview">
                                        Mountain view ⛰️
                                    </label>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="extendable" name="extendable" checked={selectedRoom.extendable} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="extendable">
                                        Extendable
                                    </label>
                                </div>
                            </div>
                        )}
                        {infoType === "hotel" && (
                            <div className="text-align-center">
                                <label classname="form-label">Hotel Address: </label>
                                <input className="form-control" type="text" name="hoteladdress" value={selectedHotel.hoteladdress} onChange={handleChange} />
                                <label classname="form-label">Hotel Phone: </label>
                                <input className="form-control" type="text" name="contactphone" value={selectedHotel.contactphone} onChange={handleChange} />
                                <label classname="form-label">Hotel Email: </label>
                                <input className="form-control" type="text" name="contactemail" value={selectedHotel.contactemail} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "employee" && (
                            <div className="text-align-center">
                                <label classname="form-label">Address:</label>
                                <input className="form-control" type="text" name="address" value={selectedEmployee.address} onChange={handleChange} />
                                <label classname="form-label">SSN:</label>
                                <input className="form-control" type="text" name="ssn" value={selectedEmployee.ssn} onChange={handleChange} />
                            </div>
                        )}
                        {infoType === "customer" && (
                            <div className="text-align-center">
                                <label classname="form-label">ID Type:</label>
                                <input className="form-control" type="text" name="idtype" value={selectedCustomer.idtype} onChange={handleChange} />
                                <label classname="form-label">Date of Registration: {selectedEmployee.registrationdate} </label>
                            </div>
                        )}
                        {infoType === "booking" && (
                            <div className="text-align-center">
                                <label classname="form-label">Hotel Name:</label>
                                <input className="form-control" type="text" name="hotelname" value={selectedBooking.hotelname} onChange={handleChange} />
                                <label classname="form-label">Booking Date:</label>
                                <input className="form-control" type="date" name="bookingdate" value={selectedBooking.bookingdate} onChange={handleChange} />
                            </div>
                        )}
                        
                    </div>
                    <div className="col text-right">
                        {infoType === 'room' && (
                            <div>
                                <div>
                                    <label className="form-label">Price Per Night: </label>
                                    <input className="form-control" type="number" name="pricepernight" value={selectedRoom.pricepernight} onChange={handleChange} />
                                    <label className="form-label">Capacity: </label>
                                    <input className="form-control" type="number" name="capacity" value={selectedRoom.capacity} onChange={handleChange} />
                                </div>
                            </div>
                        )}
                        {infoType === 'booking' && (
                            <div>
                                <label className="form-label">BookingID: </label>
                                <input className="form-control" type="number" name="bookingid" value={selectedBooking.bookingid} onChange={handleChange} />
                                <label className="form-label">CustomerID: </label>
                                <input className="form-control" type="number" name="customerid" value={selectedBooking.customerid} onChange={handleChange} />
                            </div>
                        )}
                        
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-3"></div>
                    <div className="col-6"></div>
                    <div className="col-3"></div>
                </div>
                <div className="row align-items-center pt-4 text-center">
                    <div className="col">
                        <button className="btn-success" onClick={handleDelete}>Delete</button>
                    </div>
                    <div className="col">
                        <button className="btn-success" onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
    }

    export default UpdateView;

