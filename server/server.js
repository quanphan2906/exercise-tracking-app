const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB is established successfully");
});

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
    res.status(404).send("This is an error");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
