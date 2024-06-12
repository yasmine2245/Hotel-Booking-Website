import React, { useContext, useEffect} from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";




const InfoView = () => {

  const { selectedRoom, setSelectedRoom} = useContext(HotelsContext);
  const { selectedHotel, setSelectedHotel} = useContext(HotelsContext);
  const { selectedEmployee, setSelectedEmployee} = useContext(HotelsContext);
  const { selectedCustomer, setSelectedCustomer} = useContext(HotelsContext);
  const { selectedBooking, setSelectedBooking} = useContext(HotelsContext);
  const { inputs, setInputs } = useContext(HotelsContext);
  const { user_role, setUserRole } = useContext(HotelsContext);
  const { infoType, setInfoType } = useContext(HotelsContext);

  const navigate = useNavigate();

  let primaryText, secondaryText, tertiaryText = "";

  const setButtonText = () => {
    switch(infoType){
      case "room":
        primaryText = "Book Now!";
        secondaryText = "Edit";
        tertiaryText = "Close";
        break;
      case "hotel":
        primaryText = null;
        secondaryText = "Edit";
        tertiaryText = "Close";
        break;
      case "employee":
        primaryText = null;
        secondaryText = "Edit";
        tertiaryText = "Close";
        break;
      case "customer":
        primaryText = "See Bookings";
        secondaryText = "Edit";
        tertiaryText = "Close";
        break;
      case "booking":
        primaryText = "Check-In";
        secondaryText = "Edit";
        tertiaryText = "Close";
        break;
    }
  }

  setButtonText();

  const handleClose = (event) => {
    event.preventDefault();
    if(user_role != 0){
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
    } else {
    navigate("/booknow");
    }
  }

  const handlePrimary = () => {
    switch(infoType){
      case "room":
        navigate(`/${selectedRoom.roomid}/booknow`);
        break;
      case "booking":
        navigate(`/${selectedBooking.bookingid}/checkin`);
    }
    
  }

  const handleSecondary = () => {
    navigate(`/${selectedRoom.roomid}/update`);
  }

  const handleTertiary = (event) => {
    event.preventDefault();
    handleClose(event);
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
    }
    const solidStars = '★'.repeat(n);
    const emptyStars = '☆'.repeat(5 - n);
    const stars = solidStars + emptyStars;
    return stars;
  }

  return (
    <div className="container col-auto shadow p-5 rounded-3">
      <div className="text-end">
        <button type="button" className="btn-close" onClick={handleClose}></button>
      </div>
      <div className="row text-center">
        <div className="col-auto shadow rounded text-center border py-3 mx-5" id="mainInfo">
            {infoType === "room" && (
              <div className="text-center">
                <div className="h6">Room</div>
                <div className="h3">{selectedRoom.roomnumber}</div>
              </div>
            )}
            {infoType === "hotel" && (
              <div className="text-center">
                <div className="h3">{selectedHotel.hotelname}</div>
                <div className="h6">{starsOutOfFive(selectedHotel.category)}</div>
              </div>
            )}
            {infoType === "employee" && (
              <div className="text-center">
                <div className="h3">{selectedEmployee.fullname}</div>
                <div className="h6">EID: {selectedEmployee.eid}</div>
              </div>
            )}
            {infoType === "customer" && (
              <div className="text-center">
                <div className="h3">{selectedCustomer.fullname}</div>
                <div className="h6">Customer ID: {selectedCustomer.customerid}</div>
              </div>
            )}
            {infoType === "booking" && (
              <div className="text-center">
                <div className="h6">Room</div>
                <div className="h3">{selectedBooking.roomnumber}</div>
                <div className="h6">{selectedBooking.fullname}</div>
              </div>
            )}
          </div>



        <div className="col" id="desc2">
          {infoType === "room" && (
            <div className="text-start">
              <div className="h6">{selectedRoom.hotelname}</div>
              <div>{extractCityName(selectedRoom.hoteladdress)}</div>
              <div>{starsOutOfFive(selectedRoom.category)}</div>
            </div>
          )}
          {infoType === "hotel" && (
            <div className="text-start">
              <div>Chain Name: {selectedHotel.chainname}</div>
              <div>Number of Rooms: {selectedHotel.numrooms}</div>
            </div>
          )}
          {infoType === "employee" && (
            <div className="text-start">
              <div>{selectedEmployee.hotelname}</div>
              <div>{selectedEmployee.role}</div>
            </div>
          )}
          {infoType === "customer" && (
            <div className="text-start">
              <div>Address: {selectedCustomer.address}</div>
              
            </div>
          )}
          {infoType === "booking" && (
            <div className="text-start">
              <div> Check In: {selectedBooking.checkindate}</div>
              <div> Check Out: {selectedBooking.checkoutdate}</div>
            </div>
          )}
        </div>



        <div className="col">
          {infoType === "room" && (
            <div className="text-start">
              <div>{selectedRoom.seaview ? "Sea view 🌊" : ""}</div>
              <div>{selectedRoom.mountainview ? "Mountain view ⛰️" : ""}</div>
              <div>{selectedRoom.extendable ? "Extendable" : ""}</div>
            </div>
          )}
          {infoType === "hotel" && (
            <div className="text-start">
              <div>{selectedHotel.hoteladdress}</div>
              <div>{selectedHotel.contactphone}</div>
              <div>{selectedHotel.contactemail}</div>
            </div>
          )}
          {infoType === "employee" && (
            <div className="text-start">
              <div>{selectedEmployee.address}</div>
              <div>{selectedEmployee.ssn}</div>
            </div>
          )}
          {infoType === "customer" && (
            <div className="text-start">
              <div> {selectedCustomer.idtype}</div>
              <div> {selectedCustomer.registrationdate}</div>
            </div>
          )}
          {infoType === "booking" && (
            <div className="text-start">
              <div>Hotel Name: {selectedBooking.hotelname}</div>
              <div>Booking Date: {selectedBooking.bookingdate}</div>
            </div>
          )}
        </div>


        <div className="col text-right">
        {infoType === "room" && (
            <div className="text-start">
              <div>Maintenance Notes: {selectedRoom.maintenancenotes ? selectedRoom.maintenancenotes  : ""}</div>
            </div>
          )}
          {infoType === "hotel" && (
            <div></div>
          )}
          {infoType === "employee" && (
            <div className="text-start">
              <div></div>
              <div></div>
            </div>
          )}
          {infoType === "customer" && (
            <div className="text-start">
              
            </div>
          )}
          {infoType === "booking" && (
            <div className="text-start">
              <div>BookingID: {selectedBooking.bookingid}</div>
              <div>CustomerID: {selectedBooking.customerid}</div>
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
          {user_role >= 1 && infoType != "booking" && (
            <button className="btn-success" onClick={handleSecondary}>{secondaryText}</button>
          )}
        </div>
        <div className="col">
          {primaryText != null && (
            <button className="btn-success" onClick={handlePrimary}>{primaryText}</button>
          )}
        </div>
        <div className="col">
          {user_role >= 1 && (
            <button className="btn-success" onClick={handleTertiary}>{tertiaryText}</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default InfoView;

