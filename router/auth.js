	const {sequelize, user} = require('../database/index')
	const {success, fail} = require('../response')
	const {checkArg} = require('../utils/index')
	const md5 = require('blueimp-md5')
	const userAuth = (ctx, next) => {
		if(ctx.session.user === null) {
			next()
		} else  {
			ctx.body = success('已登陆')
		}
	}
	// 获取用户信息
	const getLoginMsg = (name, password) => {
		return user.findOne({
			attributes: ['name', 'role'],
			where: {
				name: name,
				password: md5(password)
			}
		}).then(data => {
			return data
		})
	}
	const authRouter = (router) => {
		// router.use('/auth',userAuth)
		router.post('/auth/login', async ctx => {
			const {name, password} = ctx.request.body
			if (checkArg([name, password])) {
				try {
					const result = await getLoginMsg(name, password)
					result && result.role && (ctx.session.user = {name, role: result.role, uuid: result.uuid})
					!result && (ctx.session = null)
					ctx.body = success(result)
				}
				catch (e) {
					ctx.body = fail({
						errMsg: e
					})
				}
			} else {
				ctx.body = fail({flag: 222})
			}
			
		})
		router.post('/auth/quit', async ctx => {
			ctx.session = null
			ctx.body = success('已退出')
		})
		
	}
	module.exports = authRouter