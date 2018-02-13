	require('./init')
	const { URL } = require('url')
	const Koa = require('koa')
	const serve = require('koa-better-serve')
	const session = require('koa-session')
	const body = require('koa-body')
	const app = new Koa()
	const router = require('./router')
	app.keys = ['some secret hurr']
	const CONFIG = {
		key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
		/** (number || 'session') maxAge in ms (default is 1 days) */
		/** 'session' will result in a cookie that expires when session/browser is closed */
		/** Warning: If a session cookie is stolen, this cookie will never expire */
		maxAge: 86400000,
		overwrite: true, /** (boolean) can overwrite or not (default true) */
		httpOnly: true, /** (boolean) httpOnly or not (default true) */
		signed: true, /** (boolean) signed or not (default true) */
		rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
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
	app.listen(3000)
	
