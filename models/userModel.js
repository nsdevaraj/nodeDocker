const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Post must have it"],
        unique:true,
    },
    password:{
        type: String,
        required: [true, "Post must have pwd"]
    }

})

const User = mongoose.model("User", userSchema)
module.exports = User