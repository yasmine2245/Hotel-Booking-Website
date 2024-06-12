import React, { useState, createContext } from 'react';

export const HotelsContext = createContext();

export const HotelsContextProvider = (props) => {
    const [ rooms, setRooms ] = useState([]);
    const [ employees, setEmployees ] = useState([]);
    const [ customers, setCustomers ] = useState([]);
    const [ bookings, setBookings ] = useState([]);
    const [ hotels, setHotels ] = useState([]);
    const [ selectedRoom, setSelectedRoom ] = useState([]);
    const [ selectedHotel, setSelectedHotel ] = useState([]);
    const [ selectedEmployee, setSelectedEmployee ] = useState([]);
    const [ selectedCustomer, setSelectedCustomer ] = useState([]);
    const [ selectedBooking, setSelectedBooking ] = useState([]);
    const [ user_role, setUserRole ] = useState(0);
    const [ infoType, setInfoType ] = useState("");
    const [ inputs, setInputs ] = useState({
        checkin: null,
        checkout: null,
        maxPrice: null,
        city: null,
        minCapacity: null,
        chain: null,
        rating: null,
        maxRooms: null,
    });

    return (
        <HotelsContext.Provider value={{
            rooms: rooms, 
            setRooms: setRooms,
            employees: employees,
            setEmployees: setEmployees,
            customers: customers, 
            setCustomers: setCustomers,
            bookings: bookings, 
            setBookings: setBookings,
            hotels: hotels, 
            setHotels: setHotels,
            selectedRoom: selectedRoom,
            setSelectedRoom, setSelectedRoom,
            selectedHotel: selectedHotel,
            setSelectedHotel: setSelectedHotel,
            selectedEmployee: selectedEmployee,
            setSelectedEmployee: setSelectedEmployee,
            selectedCustomer: selectedCustomer,
            setSelectedCustomer: setSelectedCustomer,
            selectedBooking: selectedBooking,
            setSelectedBooking: setSelectedBooking,
            inputs: inputs,
            setInputs: setInputs,
            user_role: user_role,
            setUserRole: setUserRole,
            infoType: infoType,
            setInfoType, setInfoType,
        }}>
            {props.children} 
        </HotelsContext.Provider>
    );
};