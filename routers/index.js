const express = require ('express')
const router = express.Router ()
const { newUserCheck } = require ('../middleware/auth')
const Party = require ('../models/party')

router.get ('/', async (req, res) => {
	const post = await Party.find ({}).populate ('createAt').sort({time:1})
	res.render ('index', {
		post,
	})
})

router.get ('/index/new', newUserCheck, async (req, res) => {
	res.render ('post')
})

router.get ('/party/:id', async (req, res) => {
	let post = await Party.findById (req.params.id).populate ('createAt')
	const { _id, name, location, time, createAt } = post
	res.render ('show', {
		_id,
		name,
		location,
		time,
		createAt: createAt.username,
	})
})

router.get ('/party/:id/edit',newUserCheck, async (req, res, next) => {
	const post = await Party.findById (req.params.id).populate ('createAt')
	const { _id, name, location, time, createAt } = post
	if (req.session.user._id === post.createAt._id.toString()) {
		res.render ('edit', {
			name,
			location,
			time,
			createAt,
			_id,
		})
	} else {
		res.redirect ('/')
	}
})

router.post ('/party/edit', newUserCheck, async (req, res) => {
	const { name, location, time, id } = req.body
	await Party.updateOne ({ _id: id }, {
		$set: {
			name,
			location,
			time,
		},
	}).then (() => res.redirect (`/party/${id}`))
	
})

router.delete ('/party/:id/delete', newUserCheck, async (req, res, next) => {
	const { _id } = req.body
	const post = await Party.findById (req.params.id).populate ('createAt')
	if (req.session.user._id === post.createAt._id.toString()) {
		await Party.deleteOne ({ _id })
		await res.json({'result':'1'})
	} else {
		res.redirect ('/')
	}
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
