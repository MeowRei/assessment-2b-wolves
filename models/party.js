const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
	name: String,
	location: String,
	time: Date,
	createAt: {type: mongoose.Types.ObjectId, ref: 'User'},
});


module.exports = mongoose.model("Party", partySchema);