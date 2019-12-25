const mongoose = require ('mongoose')
mongoose.connect ('mongodb://localhost:27017/PP',
	{ useNewUrlParser: true, useUnifiedTopology: true })

module.exports = mongoose.connection
