import React, { useContext, useEffect } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";
import HotelSearch from "../../apis/HotelSearch";


const EmployeesView = () => {

    const { setSelectedEmployee } = useContext(HotelsContext);
    const { setInfoType } = useContext(HotelsContext);
    const { employees, setEmployees } = useContext(HotelsContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelSearch.get("/employees");
                setEmployees(response.data.data.employees);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    },[setSelectedEmployee]);

    const handleClick = (emp) => {
        setSelectedEmployee(emp)
        setInfoType("employee")
        navigate(`/${emp.eid}/info`);
    }

    return (
        <div>
            <table className="table table-hover">
                <thead className="bg-secondary" style={{ position: "sticky", top: 0 }}>
                    <tr>
                        <td>EID</td>
                        <td>Name</td>
                        <td>Role</td>
                        <td>Hotel</td>
                        <td>Address</td>
                        <td>SSN</td>
                        
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => {
                        return(
                            <tr onClick={()=>{handleClick(emp)}} style={{cursor: "pointer"}}>
                                <td>{emp.eid}</td>
                                <td>{emp.fullname}</td>
                                <td>{emp.role}</td>
                                <td>{emp.hotelname}</td>
                                <td>{emp.address}</td>
                                <td>{emp.ssn}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesView;
