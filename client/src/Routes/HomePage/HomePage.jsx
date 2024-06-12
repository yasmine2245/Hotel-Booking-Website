import React, { Fragment, useState, useContext } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";



const HomePage = () => {
    const navigate = useNavigate();
    const { user_role, setUserRole } = useContext(HotelsContext);

    let role = user_role;

    const handleRoleAssignment = (value) => {
        setUserRole(value);
        navigate("/booknow");
        console.log("User clicked:" + value);
    }

    return (
        <div className="container">
            <div className="row"></div>
            <div className="row xs-6"></div>
                <div className="col d-flex flex-column text-center">
                    <div className="h1 p-5 center">Please Select Your Role</div>
                </div>
            <div className="row"></div> 
            <div className="row py-5">
                <div className="col d-flex flex-column justify-content-center">
                <div className="btn btn-success p-5" onClick={() => handleRoleAssignment(0)}> 
                        <div className="h2">Customer</div> 
                    </div>
                </div>
                <div className="col d-flex flex-column justify-content-center">
                    <div className="btn btn-primary p-5" onClick={() => handleRoleAssignment(1)}> 
                        <div className="h2">Employee</div>
                    </div>  
                </div>
                <div className="col d-flex flex-column justify-content-center">
                    <div className="btn btn-danger p-5" onClick={() => handleRoleAssignment(2)}> 
                        <div className="h2">Admin</div> 
                    </div>                
                </div> 

            </div>
        </div>
    )
}

export default HomePage;