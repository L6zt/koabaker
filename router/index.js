	const koaRouter = require('koa-router')
	const {sequelize, user} = require('../database/index')
	const router = koaRouter()
	router.get('/', async ctx => {
		const request = await user.create({
			name: ctx.query.name || '',
			password: ctx.query.password || '',
			role: ctx.query.role || 0
		}).then(data => {
			return data
		}).catch(e => {
			console.log(e)
			return e
		})
		ctx.body = JSON.stringify(request)
	})
	
	module.exports = router