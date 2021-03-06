const router = require("express").Router();
const User = require("../models/user.model");

router.get("/", (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(403).send("This is an error"));
});

router.post("/add", (req, res, next) => {
    //TODO: catch the error if create a username that has been in the db
    const username = req.body.username;

    const newUser = new User({ username });

    newUser
        .save()
        .then(exercise => res.json(exercise))
        .catch(err => res.status(403).send("This is an error"));

    //instead can write
    //User.create({ req.body.username }).then(exercise => res.send(exercise)).catch(next)
});

module.exports = router;
