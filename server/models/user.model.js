const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: String,
        test: String,
    },
    {
        timestemps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
