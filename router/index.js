	const koaRouter = require('koa-router')
	const {loadRouterMoudles} = require('../utils/index')
	const router = koaRouter()
	const auth = require('./auth')
	const notFound = require('./notFound')
	// login in api
	loadRouterMoudles(router, [auth, notFound])
	module.exports = router