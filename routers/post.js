const express = require ('express')
const { newUserCheck } = require ('../middleware/auth')
const router = express.Router ()
const Party = require ('../models/party')

router.post ('/party/new', newUserCheck, async (req, res) => {
	const { name, location, time } = req.body
	try {
		const post = new Party ({
			name,
			location,
			time,
			createAt:req.session.user,
			subscription:{},
		})
		await post.save ()
		await res.redirect ('/')
	} catch (e) {
		console.log (e)
	}
})



module.exports = router
