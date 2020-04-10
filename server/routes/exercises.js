const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.get("/", (req, res, next) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(403).send("This is an error"));
});

router.post("/add", (req, res, next) => {
    const newExercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    });

    newExercise
        .save()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(403).send("This is an error"));
});

router.get("/:id", (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.send(exercise))
        .catch(err => res.status(403).send("This is an error"));
});

router.delete("/:id", (req, res, next) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.send("Exercise deleted"))
        .catch(err => res.status(403).send("This is an error"));
});

router.put("/update/:id", (req, res, next) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedExercise => res.send(updatedExercise))
        .catch(err => res.status(403).send("This is an error"));
});

module.exports = router;
