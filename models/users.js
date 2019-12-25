const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	email: {type: String, unique: true},
	password: String,
	isAdmin: Boolean
});


module.exports = mongoose.model("User", userSchema);