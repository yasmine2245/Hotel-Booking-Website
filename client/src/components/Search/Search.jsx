import React, { Fragment, useState } from "react";

const Search = () => {

    const [description, setDescription] = useState("Add Hotel");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {description};
            const response = await fetch("http://localhost:5000/hotels", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            console.log(response);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <div className = "container">
                <h1 className="text-center mt-5">Hotel Tracker</h1>
                <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                    <input 
                        type="text" 
                        className="form-control"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="btn btn-success">ADD</button>
                </form>
            </div>
        </Fragment>
    )
}

export default Search;