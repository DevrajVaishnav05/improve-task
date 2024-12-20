const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).render("login");
    }
    try {
        const verifyUser = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findOne({ _id: verifyUser._id });
        if (!user) {
            return res.status(401).render("login");
        }
        req.user = user;
        req.token = token;
        // console.log(verifyUser._id); 
        // console.log(user); 

        next();

    } catch (error) {
        res.status(404).send({ error: "Authentication failed", message: error.message });
    }
};

module.exports = auth;
