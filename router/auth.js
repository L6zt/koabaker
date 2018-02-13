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
			attributes: ['name', 'role', 'uuid', 'pic', 'nick_name'],
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
			}).then(data => {
				return data
			})
		
	}
	const authRouter = (router) => {
		// router.use('/auth',userAuth)
		router.post('/auth/getUserMsg', userAuth, async (ctx) => {
			const {user: {role, uuid, name, pic, nick_name}} = ctx.session
			ctx.body = success({role, uuid, name, pic, nick_name})
		})
		router.post('/auth/login', async ctx => {
			const {name, password, code} = ctx.request.body
			const {code: nCode} = ctx.session || {}
			if (checkArg([name, password, code])) {
				// code === nCode 验证码
				console.log(code, nCode)
				if (code !== nCode) {
					if (!nCode) {
						ctx.body = fail({fail: 0, errMsg: '验证码过期,请重新刷新验证码'})
						return
					}
					ctx.body = fail({fail: 0, errMsg: '验证码错误,请重新刷新验证码'})
					ctx.session && (ctx.session.code = null)
					return
				}
				try {
					const result = await getLoginMsg(name, password)
					if (result === null) {
						ctx.body = fail({flag: 0, errMsg: '用户名或密码错误'})
						// ctx.session.code = null
						return
					} else {
						result.role && (ctx.session.user = {name, role: result.role, uuid: result.uuid, pic: result.pic, nick_name: result.nick_name})
					}
					ctx.session && (ctx.session.code = null)
					// 前端登陆鉴权
					ctx.cookies.set('auth_koa', md5(`${ctx.session.user.name}_koa_`), {maxAge: 86400000, signed: false, httpOnly: false})
					ctx.body = success(result)
				}
				catch (e) {
					// ctx.session && (ctx.session.code = null)
					ctx.body = fail({
						errMsg: e
					})
				}
			} else {
				ctx.body = fail({flag: 222})
			}
			
		})
		router.post('/auth/changePwd', userAuth, async ctx => {
			const {user: {name}} = ctx.session
			const {oPwd, nPwd} = ctx.request.body
			if (checkArg([oPwd, nPwd])) {
					const result = await changePwd(name, oPwd, nPwd)
					ctx.session = null
					ctx.cookies.set('auth_koa', null, {maxAge: 0, signed: false, httpOnly: false, expires: new Date()})
					ctx.body = success({data: '修改成功, 请重新登陆'})
			} else  {
					ctx.body = fail({flag: 222})
				}
		})
		router.post('/auth/modifyUserMsg', userAuth, async ctx => {
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
			ctx.cookies.set('auth_koa', null, {maxAge: 0, signed: false, httpOnly: false, expires: new Date()})
			ctx.body = success('已退出')
		})
		
	}
	module.exports = authRouter