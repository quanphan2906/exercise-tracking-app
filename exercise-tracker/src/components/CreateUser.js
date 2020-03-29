import React from "react";
import { useState } from "react";
import axios from "axios";

function CreateUser(props) {
    const [username, setUsername] = useState("");

    const handleChange = e => {
        setUsername(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const userObj = { username };

        axios
            .post("http://localhost:5000/users/add", userObj)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        props.history.push("/");
    };

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Create User"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
