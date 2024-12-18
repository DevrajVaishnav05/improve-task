const express = require("express");
const bcrypt = require("bcrypt")
const UserModel = require("../models/user-model")
const router = new express.Router();


router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/register", (req, res) => {
    res.render("register");
})

router.post(
    "/register",

    async (req, res) => {
        try {
            const { name, email, gender, number, password, cpassword } = req.body;

            if (password == cpassword) {
                await UserModel.create({
                    name,
                    email,
                    gender,
                    number,
                    password,
                });
                res.status(201).render("index");
            }else{
                res.send("password is  match");
            }
         
        } catch (error) {
            res.status(500).send({
                error: "An error occurred during registration. Please try again.",
            });
        }
    }
);



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid email or password.");
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).render("index");
        } else {
            return res.status(400).send("Invalid email or password.");
        }
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


module.exports = router;

