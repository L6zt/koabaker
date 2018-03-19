	require('babel-register')
	require('./init')
	const { URL } = require('url')
	const Koa = require('koa')
	const serve = require('koa-better-serve')
	const session = require('koa-session')
	const body = require('koa-body')
	const app = new Koa()
	const router = require('./router')
	const socket = require('./socket')
	const http = require('http')
	let server
	app.keys = ['some secret hurr']
	const CONFIG = {
		key: 'koa:sess',
		maxAge: 86400000,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
	}
	app.use(session(CONFIG, app))
	app.use(body())
	//app.use(router)
	app.use(async (ctx, next) => {
		if (/^\/stUpload/.test(ctx.request.url)) {
			await serve('./uploads/', '/stUpload')(ctx)
		} else {
			await next()
		}
	})
	app.use(router.routes())
	server = http.createServer(app.callback())
	server.listen(process.env.port)
	socket(server)
	
