import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditExercise(props) {
    const [exercise, setExercise] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:5000/users");
                if (res.data.length > 0) {
                    let users = res.data.map(user => user.username);
                    setExercise(exercise => {
                        return {
                            ...exercise,
                            users
                        };
                    });
                }
            } catch (err) {
                console.log(err);
            }
        };

        const fetchExercise = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/exerci" + props.match.params.id
                );
                setExercise(exercise => {
                    return {
                        ...exercise,
                        username: res.data.username,
                        description: res.data.description,
                        duration: res.data.duration,
                        date: new Date(res.data.data)
                    };
                });
            } catch (error) {
                console.log(error.response.data);
            }
        };

        fetchUsers();
        fetchExercise();
    }, [props.match.params.id]);

    const handleChange = e => {
        setExercise({
            ...exercise,
            [e.target.id]: e.target.value
        });
    };

    const handleDateChange = date => {
        setExercise({
            ...exercise,
            date: date
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const exerciseObj = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        };

        axios
            .post(
                "http://localhost:5000/exercises/update" +
                    props.match.params.id,
                exerciseObj
            )
            .then(res => console.log(res))
            .catch(err => console.log(err));

        props.history.push("/");
    };

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        id="username"
                        value={exercise.username}
                        onChange={handleChange}
                    >
                        {exercise.users.map(function(user) {
                            return (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        required
                        id="description"
                        className="form-control"
                        value={exercise.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        id="duration"
                        className="form-control"
                        value={exercise.duration}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={exercise.date}
                            onChange={handleDateChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Edit Exercise Log"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}

export default EditExercise;
