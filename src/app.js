const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser'); 
require("./db/connection");
const userRouter = require("./routers/user.router");

const static_path = path.join(__dirname, "../public");

app.use(cookieParser()); //  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.use(userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
