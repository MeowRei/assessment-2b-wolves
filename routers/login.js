const express = require ('express')
const router = express.Router ()
const { sessionChecker } = require ('../middleware/auth')
const barest = require ('bcryptjs')
const User = require ('../models/users')

router.route ('/').
	get (sessionChecker, (req, res) => {
		res.render ('login')
	}).
	post (async (req, res) => {
		const { email, password } = req.body
		const user = await User.findOne ({ email })
		if (user && (await barest.compare (password, user.password))) {
			req.session.user = user
			res.json({'result':true})
		} else {
			res.json({'result':false})
		}
	})

module.exports = router