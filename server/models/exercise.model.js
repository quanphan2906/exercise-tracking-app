const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const ExerciseSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: { type: Date, required: true }
    },
    {
        timestamps: true
    }
);

const Exercise = model("exercises", ExerciseSchema);

module.exports = Exercise;
