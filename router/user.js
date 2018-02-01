const Sequelize =  require('sequelize')
const {sequelize, User} = require('../database/index')
const {Op} = Sequelize
const {success, fail} = require('../response')
const {checkArg, isNum} = require('../utils/index')
const md5 = require('blueimp-md5')
// 中间件 鉴权
const userAuth = (role) => {
	return  async (ctx, next) => {
		const {user} = ctx.session
		if(user === null || user === undefined) {
			ctx.body = fail({flag: 999, errMsg:'未登陆，请登陆'})
		} else  {
			if (parseInt(user.role) <= role) {
				await next()
			}
			else {
				ctx.body = (fail({flag: 0, errMsg: '权限不足'}))
			}}
	}
}
// 获取用户信息
const checkExist = (name) => {
	return User.findOne({
		where: {
			name
		}
	}).then(data => {
		if (data === null) {
			return data
		}
		return Promise.reject({flag: 909,errMsg:'该用户已存在'})
	})
}
// 获取下级用户
const getAllUser = (pageIndex, pageSize, role) => {
	return User.findAndCountAll({
			attributes: ['name', 'role', 'uuid'],
			where: {
				role: {
					[Op.gt]: [role]
				}
			},
		    offset: (pageIndex - 1) * pageSize,
		    limit: pageSize,
		    order: [['uuid', 'DESC']]
		})
		.then(data => {
			 return data
		})
}
// 查找维修员工
const getWorkUser = (pageIndex, pageSize) => {
	return User.findAndCountAll({
		attributes: ['name', 'role', 'uuid'],
		where: {
			role: {
				[Op.notIn]: [1, 2]
			}
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	}).then(data => {
		return data
	})
}
// 查找管理员工
const getManagerUser = (pageIndex, pageSize) => {
	return User.findAndCountAll({
		attributes: ['name', 'role', 'uuid'],
		where: {
			role: 2
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	}).then(data => {
		return data
	})
}
const deleteUser = (name) => {
	return User.destroy({
		where: {
			name
		}
	}).then(data => {
		return data
	})
}
const createUser = (name, password, role) => {
	// 强制 role > 2 create upsert
	parseInt(role) < 2 && (role = 2)
	return User.upsert({
			name,
			password: md5(password),
			role
	}).then(data => {
		return data
	})
}
const userRouter = (router) => {
	// 生成用户
	router.post('/user/create', userAuth(1), async ctx => {
		const {name, password, role} = ctx.request.body
		if (checkArg([name, password, role])) {
			try {
				console.log(typeof role)
				const check = await checkExist(name, password, role)
				const result = await createUser(name, password, role)
				ctx.body = success(result)
			}
			catch (e) {
				if (e && e.flag === 909) {
					ctx.body = fail({
						errMsg: e.errMsg
					})
				} else {
					ctx.body = fail({errMsg: e})
				}
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	// 获取全部用户
	router.post('/user/getAllList',  userAuth(1),async ctx => {
		const {pageIndex, pageSize} = ctx.request.body
		const {user: {role}} = ctx.session
		if (checkArg([pageIndex, pageSize]) && isNum(pageIndex) && isNum(pageIndex)) {
			try {
				const allUser = await getAllUser(parseInt(pageIndex), parseInt(pageSize), role)
				ctx.body = success(allUser)
			}
			catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else  {
			ctx.body = fail({flag: 222})
		}
	})
	// 获取管理人员
	router.post('/user/getManagerUser', userAuth(1), async ctx => {
		const {pageIndex, pageSize} = ctx.request.body
		if (checkArg([pageIndex, pageSize]) && isNum(pageIndex) && isNum(pageIndex)) {
			try {
				const result = await getManagerUser(parseInt(pageIndex),parseInt(pageSize))
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		}
	})
	// 获取维修员工
	router.post('/user/getWorkList', userAuth(2), async ctx => {
		const {pageIndex, pageSize} = ctx.request.body
		if (checkArg([pageIndex, pageSize]) && isNum(pageIndex) && isNum(pageIndex)) {
			try {
				const result = await getWorkUser(parseInt(pageIndex),parseInt(pageSize))
				ctx.body = success(result)
			} catch (e) {
				ctx.body  = fail({errMsg: e})
			}
		}
	})
	// 删除用户
	router.post('/user/delete', userAuth(1), async ctx => {
		const {name} = ctx.request.body
		if (checkArg([name])) {
			try {
				const result = await deleteUser(name)
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
}
module.exports = userRouter