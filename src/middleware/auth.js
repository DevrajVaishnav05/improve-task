const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const auth = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).render("login");
    }
    try {
        const verifyUser = jwt.verify(token, process.env.JWT_KEY);
        req.user = verifyUser;
        next();
    } catch (error) {
        res.status(404).send({ error: "Authentication failed", message: error.message });
    }
};

module.exports = auth;
