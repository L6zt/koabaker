	const koaRouter = require('koa-router')
	const  {Op} = require('Sequelize')
	const {sequelize, user} = require('../database/index')
	const router = koaRouter()
	const md5 = require('blueimp-md5')
	const {checkArg} = require('../utils/index')
	const {success, fail} = require('../response')
	// login in api
	router.post('/auth/login', async ctx => {
		const {name, password} = ctx.request.body
		if (checkArg([name, password])) {
			const result = await user.findOne({
				where: {
					name: name,
					password: md5(password)
				}
			}).then(data => {
				return data
			}).catch(data => {
				return data
			})
			ctx.session.user = {name, role: result.role}
			ctx.body = success(result)
		} else {
			 ctx.body = fail({flag: 222})
		}
		
	})
	router.all('/myMsg', async ctx => {
		ctx.body = success(ctx.session)
	})
	router.post('/create/user', async ctx => {
		const {name, password, role} = ctx.request.body
		if (checkArg([name, password, role])) {
			ctx.body = success({name, password, role})
		} else {
			ctx.body = fail({flag: 222})
		}
		
	})
	// not found api
	router.all('*',  async ctx => {
		 ctx.body = fail({flag: 404})
	})
	module.exports = router