const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user-routes");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const bodyPaser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyPaser.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.use('/api/calendar', require("./controller/calender-Controller"));
mongoose.connect("mongodb+srv://admin:ItXe8aXFXNl2XFuR@cluster0.9am4m2c.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    // useUnifiedTopology: true,
    //     useNewUrlParser: true

   

    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");

})
    .catch((err) => console.log(err));


//ItXe8aXFXNl2XFuR