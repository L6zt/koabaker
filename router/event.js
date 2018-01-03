const {sequelize, event} = require('../database/index')
const {success, fail} = require('../response')
const {checkArg} = require('../utils/index')
const md5 = require('blueimp-md5')
// 获取用户信息
const userAuth = (role) => {
	return  async (ctx, next) => {
		if(ctx.session.user === null) {
			ctx.body = fail({flag: 999, errMsg:'未登陆，请登陆'})
		} else  {
			if (parseInt(ctx.session.user.role) <= role) {
				await next()
			}
			else {
				ctx.body = (fail({flag: 0, errMsg: '权限不足'}))
			}}
	}
}
const createEvent = ({title, url, content, uuid}) => {
	return event.create({
		title, url, content, postid: uuid
	}).then(data => {
		return data
	})
}
const deleteEvent = ({uuid, postid}) => {
	return event.destroy({
		where: {
			uuid,
			postid
		}
	}).then(data => {
		return data
	})
}
const eventRouter = (router) => {
	// router.use('/auth',userAuth)
	router.post('/event/create', userAuth(1) ,async ctx => {
		const {title, url, content} = ctx.request.body
		const {user: {uuid}} = ctx.session
		if (checkArg([title, url, content])) {
			try {
				const result = await  createEvent({title, url, content, uuid})
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	router.post('/event/delete', async ctx => {
		const {uuid} = ctx.request.body
		const {user: {uuid: postid}} = ctx.session
		if (checkArg([uuid])) {
			try {
				const result = await  deleteEvent({uuid, postid})
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
}
module.exports = eventRouter