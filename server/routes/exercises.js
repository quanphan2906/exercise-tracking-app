const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.get("/", (req, res, next) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(next);
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
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.send(exercise))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.send("Exercise deleted"))
        .catch(next);
});

router.put("/update/:id", (req, res, next) => {
    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedExercise => res.send(updatedExercise))
        .catch(next);
});

module.exports = router;
