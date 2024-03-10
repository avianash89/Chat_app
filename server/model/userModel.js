const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        require: true,
        min: 8,
    },
    isAvaterImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: "",
    },
});


const User = mongoose.model("User", userSchema);

module.exports = User;