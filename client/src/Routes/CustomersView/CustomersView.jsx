import React, { useContext, useEffect } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";


const CustomersView = () => {

    const { setSelectedCustomer } = useContext(HotelsContext);
    const { setInfoType } = useContext(HotelsContext);
    const { customers, setCustomers } = useContext(HotelsContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelSearch.get("/customers");
                setCustomers(response.data.data.customers);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    },[]);

    const handleClick = (cus) => {
        setSelectedCustomer(cus)
        setInfoType("customer")
        navigate(`/${cus.customerid}/info`);
    }

    return (
        <div>
            <table className="table table-hover">
                <thead className="bg-secondary" style={{ position: "sticky", top: 0 }}>
                    <tr>
                        <td>Customer ID</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>ID Type</td>
                        <td>Registration Date</td>                        
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => {
                        return(
                            <tr onClick={()=>{handleClick(c)}} style={{cursor: "pointer"}}>
                                <td>{c.customerid}</td>
                                <td>{c.fullname}</td>
                                <td>{c.address}</td>
                                <td>{c.idtype}</td>
                                <td>{c.registrationdate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CustomersView;
