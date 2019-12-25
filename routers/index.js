const express = require ('express')
const router = express.Router ()
const { newUserCheck } = require ('../middleware/auth')
const Party = require ('../models/party')

router.get ('/', async (req, res) => {
	const post = await Party.find ({}).populate ('createAt').sort ({ time: 1 })
	res.render ('index', {
		post,
	})
})

router.get ('/index/new', newUserCheck, async (req, res) => {
	res.render ('post')
})

router.get ('/logout', async (req, res, next) => {
	if (req.session.user) {
		try {
			await req.session.destroy ()
			res.clearCookie ('user_sid')
			res.redirect ('/')
		} catch (error) {
			next (error)
		}
	} else {
		res.redirect ('/login')
	}
})

module.exports = router
