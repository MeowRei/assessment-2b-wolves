const express = require ('express')
const router = express.Router ()
const barest = require ('bcryptjs')
const { sessionChecker } = require ('../middleware/auth')
const User = require ('../models/users')
const saltRounds = barest.genSaltSync (10)

router.route ('/').get (sessionChecker, (req, res) => {
	res.render ('registration')
}).post (async (req, res, next) => {
	const { username, email, password } = req.body
	const checkUsername = await User.findOne ({ username })
	const checkEmail = await User.findOne ({ email })
	console.log(checkUsername)
	console.log(checkEmail)
	if ((checkUsername === null) && (checkEmail===null)) {
		const user = new User({
			username,
			email,
			password: await barest.hash(password, saltRounds),
			isAdmin: false
		});
		await user.save();
		req.session.user = user;
		res.json({'result':true})
	} else {
		res.json({'result':false})
	}

})

module.exports = router
