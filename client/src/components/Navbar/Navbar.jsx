import React, { useContext } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { Link } from "react-router-dom";

const Navbar = () => {

    const { user_role } = useContext(HotelsContext);

    console.log("User_role in Navbar:", user_role);

    return (
        <nav className="navbar navbar-expand-sm bg-light px-4 shadow h5">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item px-2">
                        <Link to="/welcome" className="nav-link">Home</Link>
                    </li>
                </ul>
            </div>
            <div className="container-fluid justify-content-end g-5">
                <ul className="navbar-nav">
                    {user_role >= 0 && (
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <Link to="/booknow" className="nav-link">Book Now!</Link>                            
                            </li>
                            <li className="nav-item px-2">
                                <Link to="/mybookings" className="nav-link">My Bookings</Link>                            
                            </li>
                        </ul>
                    )}
                    {user_role >= 1 && (
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <Link to="/rooms" className="nav-link">Rooms</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link to="/bookings" className="nav-link">Bookings</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link to="/customers" className="nav-link">Customers</Link>
                            </li>
                        </ul>               
                    )}
                    {user_role >= 2 && (
                        <ul className="navbar-nav">
                            <li className="nav-item px-2">
                                <Link to="/employees" className="nav-link">Employees</Link>
                            </li>
                            <li className="nav-item px-2">
                                <Link to="/hotels" className="nav-link">Hotels</Link>
                            </li>  
                        </ul>          
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;