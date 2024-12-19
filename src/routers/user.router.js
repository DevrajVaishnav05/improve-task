const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user-model")
const router = new express.Router();
const JWT_SECRET = process.env.JWT_KEY || "testkey";
const auth = require("../middleware/auth")


router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register");
})
router.get("/secret", auth, (req, res) => {
    res.render("secret");
})
router.post("/register", async (req, res) => {
    try {
        const { name, email, gender, number, password, cpassword } = req.body;

        if (!name || !email || !gender || !number || !password || !cpassword) {
            return res.status(400).send("All fields are required.");
        }

        // Check if passwords match
        if (password !== cpassword) {
            return res.status(400).send("Passwords do not match.");
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email is already registered.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            gender,
            number,
            password: hashedPassword,
        });

        // Generate JWT
        const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+30000)
        }).render("index");


        // res.status(201).send({
        //     message: "User registered successfully.",
        //     token,
        // });
    } catch (error) {
        res.status(500).send({
            error: "An error occurred during registration. Please try again.",
        });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password are required.");
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send("Invalid email or password.");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+30000)
        }).render("index");
       
         // res.render("index");
        // res.status(200).send({
        //     message: "Login successful.",
        //     token,
        // });
    } catch (error) {
        res.status(500).send({
            error: "An error occurred during login. Please try again.",
        });
    }
});



// --->> bcrypt setup and use <<----
// const password = async (password) => {
//         newpassword = await bcrypt.hash(password,10);
//         console.log(newpassword)
//             const passwordmatch = await bcrypt.compare(password,newpassword);
//             console.log(passwordmatch);
// }
// password("devraj123")
// $2b$10$4FfBbzhiubAS5HYJ8RyP4e.isxq/JfyYZEKB0dOf7wsLxWvdF4ocC

// --->>  JWT setup  <<---
// const createToken  = async ()=>{
//        const token = await jwt.sign({_id:"devraj"},"fsdfkasklfklasfkl");
//        console.log(token);
//        var decoded = jwt.verify(token, 'fsdfkasklfklasfkl');
//        console.log(decoded);
       
// }
// createToken()

module.exports = router;

