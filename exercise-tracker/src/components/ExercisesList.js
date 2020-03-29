import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function Exercise({ exercise, deleteExercise }) {
    return (
        <tr>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit/" + exercise._id}>edit</Link> |
                <a
                    href="#"
                    onClick={() => {
                        deleteExercise(exercise._id);
                    }}
                >
                    delete
                </a>
            </td>
        </tr>
    );
}

function ExerciseList() {
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:5000/exercises/");
                setExercises(res.data);
            } catch (err) {
                console.log("Hello", err);
            }
        };
        fetchData();
    }, []);

    const deleteExercise = async id => {
        try {
            const res = await axios.delete(
                "http://localhost:5000/exercises/" + id
            );
            setExercises(exercises.filter(exercise => exercise._id !== id));
            // _id is created by MongoDB
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => {
                        return (
                            <Exercise
                                exercise={exercise}
                                deleteExercise={deleteExercise}
                                key={exercise._id}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExerciseList;
