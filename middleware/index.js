module.exports = function (app) {
	const express = require ('express')
	const morgan = require ('morgan')
	const cookieParser = require ('cookie-parser')
	const session = require ('express-session')
	const path = require ('path')
	const FileStore = require ('session-file-store') (session)
	const { cookiesCleaner } = require ('./auth')
	const dbConnection = require ('./db-connect')
	const hbs = require ('hbs')
	const fileStoreOptions = {
		path: path.join (__dirname, '..', 'sessions'),
	}
	
	app.use (morgan ('dev'))
	
	app.use (express.urlencoded ({ extended: true }))
	app.use (express.json ())
	app.use (cookieParser ())
	app.use (
		session ({
			store: new FileStore (fileStoreOptions),
			key: 'user_sid',
			secret: 'keyboard party',
			resave: false,
			saveUninitialized: false,
			cookie: {
				expires: 600000,
			},
		}),
	)

	app.use (function (req, res, next) {
		res.locals = {
			loggedin: !!req.session.user,
			login: req.session.user || ""
		}
		next ()
	})
	
	app.use (cookiesCleaner)
	app.use (express.static (path.join (__dirname, '..', 'public')))
	app.set ('views', path.join (__dirname, '..', 'views'))
	app.set ('view engine', 'hbs')
	
}
