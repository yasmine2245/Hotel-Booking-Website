import React, { useEffect, useContext } from "react";
import HotelSearch from "../../apis/HotelSearch";
import { HotelsContext } from "../../context/HotelsContext";
import { useNavigate } from "react-router-dom";

const BookNowView = ( ) => {

    const {rooms, setRooms} = useContext(HotelsContext);
    const {inputs, setInputs} = useContext(HotelsContext);
    const {setSelectedRoom} = useContext(HotelsContext);
    const {setInfoType} = useContext(HotelsContext);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelSearch.post("/rooms", inputs);
                console.log(response.data.data);
                setRooms(response.data.data.rooms);
                console.log("Rooms:", rooms); 
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    }, [inputs]);

    const handleChange = (event) => { 
        const name = event.target.name; 
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
    }

    const handleRoomClick = (room) => {
        setSelectedRoom(room)
        setInfoType("room")
        navigate(`/${room.roomid}/info`);
    }

    function extractCityName(address) {
        const parts = address.split(','); 
        const city = parts[parts.length - 1].trim(); 
        return(city); 
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
        <div className="container row justify-content-center">
            <div className="col-sm-5 shadow p-2 rounded-3">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="mb-2 mt-3 col text-center">
                            <div className="h3">Find Your Getaway!</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Check-In:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                placeholder="YYYY-MM-DD" 
                                name="checkin"
                                value={inputs.checkin || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Check-Out:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                placeholder="YYYY-MM-DD" 
                                name="checkout"
                                value={inputs.checkout || ""}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Price per Night:</label>
                            <input 
                                type="range" 
                                className="form-range" 
                                name="maxPrice"
                                min="0"
                                max="999"
                                value={inputs.maxPrice || "999"}
                                onChange={handleChange}
                            />
                            <div>
                                <label> Max: $ {inputs.maxPrice}</label>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">City: </label>
                            <select 
                                className="form-select" 
                                name="city"
                                value={inputs.city || ""}
                                onChange={handleChange} 
                            >
                                <option value={""}>Any</option>
                                <option>CityA</option>
                                <option>CityB</option>
                                <option>CityC</option>
                                <option>CityD</option>
                                <option>CityE</option>
                                <option>CityF</option>
                                <option>CityG</option>
                                <option>CityH</option>
                            </select>   
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Min. Capacity</label>
                            <input 
                                type="range" 
                                className="form-range" 
                                name="minCapacity"
                                min="1"
                                max="5"
                                value={inputs.minCapacity || "1"}
                                onChange={handleChange}
                            />
                            <div>
                                <label> Min: {inputs.minCapacity}</label>
                            </div>
                        </div>
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Hotel Chain:</label>
                            <select 
                                className="form-select" 
                                name="chain"
                                value={inputs.chain || ""}
                                onChange={handleChange}
                            >
                                <option value={""}>Any</option>
                                <option>Simple Stay</option>
                                <option>Grand Suites</option>
                                <option>Paradise Hotels</option>
                                <option>Tranquil Inns</option>
                                <option>Serene Retreats</option>
                            </select> 
                        </div>  
                    </div>                      
                    <div className="row">
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Hotel Rating:</label>
                            <select 
                                className="form-select" 
                                name="rating"
                                value={inputs.rating || "1"}
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
                        <div className="mb-3 mt-3 col">
                            <label className="form-label">Max Hotel Size:</label>
                            <input 
                                type="range" 
                                className="form-range" 
                                name="maxRooms"
                                min="0"
                                max="100"
                                value={inputs.maxRooms || "100"}
                                onChange={handleChange}
                            />
                        </div>
                        
                    </div>
                    <div className="row p-3">
                        <div className="col-auto justify-content-center p-2">
                            <input className type="submit" />
                        </div>
                    </div>
                </form> 
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-6 align-content-start p-2 shadow rounded-2" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                <table className="table table-hover">
                    <thead className="bg-secondary" style={{ position: "sticky", top: 0 }}>
                        <tr>
                            <td>Hotel</td>
                            <td>Capacity</td>
                            <td>Views</td>
                            <td>Price</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => {
                            return(
                                <tr onClick={()=>{handleRoomClick(room)}} style={{cursor: "pointer"}}>
                                    <td className="align-middle">
                                        <div>
                                            <div>{room.hotelname}</div>
                                            <div>{extractCityName(room.hoteladdress)}</div>
                                            <div>{starsOutOfFive(room.category)}</div>
                                        </div>
                                    </td>
                                    <td className="align-middle">{room.capacity}</td>
                                    <td className="align-middle">
                                        <div>
                                            <div>{room.seaview ? "Sea view" : ""}</div>
                                            <div>{room.mountainview ? "Mountain view" : ""}</div>
                                            <div>{room.extendable ? "Extendable" : ""}</div>
                                        </div>
                                    </td>
                                    <td className="h6 align-middle">${room.pricepernight}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BookNowView;

/*




<div className={styles.searchcontainer}>
            <div className={styles.header}>Book Now!</div>
            <div className={styles.inputs}>
                <div className={styles.inputsrow}>
                    <InputFrame 
                        label={"Start Date: "} 
                        defaultValue={"YYYY-MM-DD"} 
                        type={"date"}
                        onChange={(value) => handleChange("checkIn", value)}
                    />
                    <InputFrame 
                        label={"End Date:"} 
                        defaultValue={"YYYY-MM-DD"}
                        type={"date"}
                        onChange={(value) => handleChange("checkOut", value)}
                    />
                </div>
                <div className={styles.inputsrow}>
                    <InputFrame 
                        label={"Minimum Room Capacity:"}
                        defaultValue={searchParams.minCapacity}
                        type={'text'}
                        onChange={(value) => handleChange("minimumCapacity", parseInt(value))}
                        stripAlpha={true}
                    />
                    <InputFrame 
                        label={"Max. Price Per Night (CAD):"} 
                        defaultValue={searchParams.maxPrice}
                        type={'text'}
                        onChange={(value) => handleChange("maxPricePerNight", value)}
                        stripAlpha={true}
                    />
                </div>
                <div className={styles.inputsrow}>
                    <DropdownMenu 
                        label={"City:"} 
                        options={[
                            "CityA", 
                            "CityB",
                            "CityC",
                            "CityD",
                            "CityE",
                            "CityF",
                            "CityG",
                            "CityH",
                        ]}
                        selectedOption={searchParams.city}
                        onSelect={(value) => handleChange("city", value)}
                    />
                    <DropdownMenu 
                        label={"Hotel Chain:"} 
                        options={[
                            "Simple Stay", 
                            "Grand Suites", 
                            "Paradise Hotels", 
                            "Tranquil Inns", 
                            "Serene Retreats"
                        ]}
                        selectedOption={searchParams.chain}
                        onSelect={(value) => handleChange("chainName", value)}
                    />
                </div>
                <div className={styles.inputsrow}>
                    <DropdownMenu 
                        label={"Minimum Star Rating:"} 
                        options={[
                            "★", 
                            "★★", 
                            "★★★", 
                            "★★★★", 
                            "★★★★★"
                        ]}
                        selectedOption={searchParams.rating}
                        onSelect={(value) => handleChange("minimumRating", value)}
                    />
                    <InputFrame 
                        label={"Max. Rooms in Hotel:"} 
                        defaultValue={searchParams.maxRooms}
                        type={'text'}
                        onChange={(value) => handleChange("maxRoomsInHotel", value)}
                        stripAlpha={true}
                    />
                </div>
            </div>
            <div className={styles.button} onClick={onSearchSubmit}>
                <div className={styles.text}>
                    Go!
                </div>
            </div>
        </div>
*/