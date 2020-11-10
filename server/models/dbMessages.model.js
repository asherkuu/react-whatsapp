const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whatsappSchema = new Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
});

const MessageContent = mongoose.model("MessageContent", whatsappSchema);
module.exports = MessageContent;
