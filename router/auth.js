	const {sequelize, User} = require('../database/index')
	const {success, fail} = require('../response')
	const {checkArg} = require('../utils/index')
	const md5 = require('blueimp-md5')
	const userAuth = async (ctx, next) => {
	 // undefined null
		if(!ctx.session.user) {
			ctx.body = fail({flag: 999})
		} else  {
			await next()
		}
	}
	// 获取用户信息
	const getLoginMsg = (name, password) => {
		return User.findOne({
			attributes: ['name', 'role', 'uuid'],
			where: {
				name: name,
				password: md5(password)
			}
		}).then(data => {
			return data
		})
	}
	const changePwd = (name, oPwd, nPwd) => {
		return User.update({
			password: md5(nPwd)
		}, {
			where: {
				name,
				password: md5(oPwd)
			}
		}).then(data => {
			return data
		})
	}
	const modifyUserMsg = (name, uObj) => {
		return User.update(
			uObj,
			{
				where: {
					name
				}
			}.then(data => {
				return data
			})
		)
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
					if (result === null) {
						ctx.body = fail({flag: 0, errMsg: '用户名或密码错误'})
						return
					}
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
		router.post('/auth/changePwd', userAuth, async ctx => {
			const {code: sCode, user: {name, role}} = ctx.session
			const {code, oPwd, nPwd} = ctx.request.body
			if (checkArg([code, oPwd, nPwd])) {
				if (sCode === code) {
					const result = await changePwd(name, oPwd, nPwd)
					ctx.body = success({data: '修改成功, 请重新登陆'})
					ctx.session = null
				} else  {
					ctx.body = fail({flag: 0, errMsg: '验证码错误'})
				}
			} else  {
				ctx.body = fail({flag: 222})
			}
		})
		router.post('/auth/modifyUserMsg', userAuth,async ctx => {
			const {user: {name, role}} = ctx.session
			const {nick_name, pic} = ctx.request.body
			if (nick_name || pic) {
				let result
				if (nick_name && pic) {
					result = await  modifyUserMsg(name, {nick_name, pic})
				} else  if (nick_name) {
					result = await  modifyUserMsg(name, {nick_name})
				} else  {
					result = await  modifyUserMsg(name, {pic})
				}
				ctx.body = success(result)
			} else  {
				ctx.body = fail({flag: 222})
			}
		})
		router.post('/auth/quit', async ctx => {
			ctx.session = null
			ctx.body = success('已退出')
		})
		
	}
	module.exports = authRouter