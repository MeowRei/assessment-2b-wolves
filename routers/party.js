const express = require ('express')
const router = express.Router ()
const { newUserCheck } = require ('../middleware/auth')
const Party = require ('../models/party')

router.get ('/:id', async (req, res) => {
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

router.delete ('/:id/delete', newUserCheck, async (req, res, next) => {
	const { _id } = req.body
	const post = await Party.findById (req.params.id).populate ('createAt')
	if (req.session.user._id === post.createAt._id.toString ()) {
		await Party.deleteOne ({ _id })
		await res.json ({ 'result': true })
	} else {
		await res.json ({ 'result': false })
	}
})

router.get ('/:id/edit', newUserCheck, async (req, res, next) => {
	const post = await Party.findById (req.params.id).populate ('createAt')
	const { _id, name, location, time, createAt } = post
	if (req.session.user._id === post.createAt._id.toString ()) {
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

router.post ('/edit', newUserCheck, async (req, res) => {
	const { name, location, time, id } = req.body
	await Party.updateOne ({ _id: id }, {
		$set: {
			name,
			location,
			time,
		},
	}).then (() => res.redirect (`/party/${id}`))
	
})

router.post ('/:id/go', newUserCheck, async (req, res, next) => {
	const { bring } = req.body
	const user = req.session.user.username
	const post = await Party.findOneAndUpdate({_id:req.params.id},{$set:{subscription: {user:bring}}})
	console.log(bring)
	console.log(user)
})

module.exports = router
