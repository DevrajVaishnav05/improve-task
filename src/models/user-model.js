const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
