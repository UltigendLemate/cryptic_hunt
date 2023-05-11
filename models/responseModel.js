const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
	answer: {
		type: String,
		maxlength: 200,
	},
	answeredAt:{
		type: Date,
		default: Date.now,
	},
	username: {
		type: String,
	},
	level: {
		type: Number,
	},
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
