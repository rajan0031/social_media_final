const mongoose = require("mongoose");

const directMessage = new mongoose.Schema({

    from: {
        type: String,
    },

    to: {
        type: String,
    },
    message: {
        type: String,
    },

});

const Message = mongoose.model("Message", directMessage);
module.exports = Message;