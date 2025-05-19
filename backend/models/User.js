const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: "user", enum: ["user", "admin"] },
    },
    {
        timestamps: true
    }
);


const User = mongoose.model("User", UserSchema);
module.exports = User;

