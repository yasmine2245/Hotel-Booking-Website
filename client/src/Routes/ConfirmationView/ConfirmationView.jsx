import React from 'react'
import { useNavigate } from "react-router-dom";

export default function ConfirmationView() {
    const navigate = useNavigate();
    return (
        <div className='container col-auto shadow rounded-3'>
            <div>Thanks for Booking with Us!</div>
            <div className="btn btn-primary" onClick={()=>{
                navigate('/welcome');
            }}>Home</div>
        </div>
    )
}
