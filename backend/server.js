const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("morgan");
const mainRoute = require("./routes/index.js")
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB")

    } catch (error) {
        console.error("Error: ", error)
    }
}


app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello Express.js");
});



app.use("/", mainRoute);

app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda calisiyor`);
})
