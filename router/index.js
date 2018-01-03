	const koaRouter = require('koa-router')
	const {loadRouterMoudles} = require('../utils/index')
	const router = koaRouter()
	const authRouter = require('./auth')
	const notFoundRouter = require('./notFound')
	const userRouter = require('./user')
	// login in api
	loadRouterMoudles(router, [authRouter, userRouter, notFoundRouter])
	module.exports = router