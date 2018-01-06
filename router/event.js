const Sequelize = require('sequelize')
const {Op} = Sequelize
const {sequelize, Event, User} = require('../database/index')
const {success, fail} = require('../response')
const {checkArg} = require('../utils/index')
// 获取用户信息
// User.hasMany( Event, {
// 	foreignKey: 'postid',
// 	targetKey: 'uuid',
// 	as: 'post'
// })
// User.hasMany( Event, {
// 	foreignKey: 'solveid',
// 	targetKey: 'uuid',
// 	as: 'solve'
// })
// Event.belongsTo(User)
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
const createEvent = ({title, url, content, uuid}) => {
	return Event.create({
		title, url, content, postid: uuid
	}).then(data => {
		return data
	})
}
const deleteEvent = ({uuid, postid}) => {
	return Event.destroy({
		where: {
			uuid,
			postid
		}
	}).then(data => {
		return data
	})
}
/*
 select user.name as pname, p.sname as sname, p.solveid as solveid,
 p.postid as postid from user join (select user.name as sname, event.solveid as solveid ,
 event.postid as postid from user right join event on user.uuid = event.solveid) as p on user.uuid = p.postid;
*/
// const getList = (postid) => {
//
// 	return User.findAll({
// 		order: [
// 			['name', 'ASC'],
// 			[{model: Event, as: 'post'}, 'create_time', 'DESC']
// 		],
// 		include: [
// 			{
// 				model: Event,
// 				as: 'post'
// 			}
// 		]
// 	})
// }
const getList = (postid) => {
	let str = 'select p.uuid as uuid, user.name as pname, p.sname as sname, p.solveid as solveid,' +
		' p.postid as postid, p.sstatus as sstatus, p.pstatus as pstatus, p.create_time as create_time from user join (select user.name as sname, event.uuid as uuid, event.create_time as create_time,  event.solveid as solveid ,event.sstatus as sstatus, event. pstatus as pstatus,event.postid as postid from user ' +
		'right join event on user.uuid = event.solveid) as p on user.uuid = p.postid'
	postid && (str = `${str} where p.postid  = ${postid}`)
	return sequelize.query( str,{type: sequelize.QueryTypes.SELECT})
		.then(data => {
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
	router.post('/event/delete',userAuth(2), async ctx => {
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

	// 事件列表  状态 未派遣 进行中 已完成
	router.post('/event/getList', userAuth(2), async ctx => {
		const {user: {uuid: postid}} = ctx.session
			try {
				let result
				ctx.session.user.role === 1 ?  result = await getList() : result = await getList(postid)
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
	})
	
}
module.exports = eventRouter