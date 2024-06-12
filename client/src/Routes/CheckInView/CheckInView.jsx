import React, { useContext, useState } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";

const CheckInView = () => {
    const { selectedRoom } = useContext(HotelsContext);
    const { inputs } = useContext(HotelsContext);
    const { selectedBooking, setSelectedBooking } = useContext(HotelsContext);

    const navigate = useNavigate();

    const handleCheckin = async (event) => {
        event.preventDefault();
        let response;
        const fetchData = async () => {
            try {
                console.log("Renting Details:", selectedBooking);
                response = await HotelSearch.post(`/rentings`, selectedBooking);
                navigate("/confirmation");
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedBooking((prevSelectedBooking) => ({
            ...prevSelectedBooking,
            [name]: value,
        }));
    };


    return (
        <div className="container shadow rounded-3 p-5">
            <h2>CheckIn</h2>
            <p>Room: {selectedRoom.roomnumber}</p>
            <div className="col-auto">
                <form onSubmit={handleCheckin}>
                    <div className="row">
                        <div className="col">
                            <label className="form-label" htmlFor="checkin">Employee ID:</label>
                            <input
                                type="number"
                                id="eid"
                                name="eid"
                                value={inputs.eid}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col text-end">
                            <label className="form-label" htmlFor="checkin">Credit Card Number:</label>
                            <input
                                type="number"
                                id="ccn"
                                name="ccn"
                                value={inputs.ccn}
                                onChange={handleChange}
                            /><br/>
                            <label className="form-label" htmlFor="checkin">Expiry Date:</label>
                            <input
                                type="number"
                                id="ed"
                                name="ed"
                                value={inputs.ed}
                                onChange={handleChange}
                            /><br/>
                            <label className="form-label" htmlFor="checkin">CCV:</label>
                            <input
                                type="number"
                                id="ccv"
                                name="ccv"
                                value={inputs.ccv}
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

export default CheckInView;
