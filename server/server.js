const express = require("express");
const mongoose = require("mongoose");
const Charity = require("./models/charity.model");
const cors = require("cors");

const app = express();


const charityRoute = require("./routes/charity.route");

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/CharityData/charities", charityRoute);

// mongoose server connection
mongoose
  .connect(
    "mongodb+srv://zhangjohnca:EgCd9o4MqGh2P4FC@backend.2wrxqyz.mongodb.net/Charity-API?retryWrites=true&w=majority&appName=Backend"
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });
