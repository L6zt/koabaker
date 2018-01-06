const Sequelize = require('sequelize')
const {Op} = Sequelize
const {sequelize, Event, User,PeventResult, SeventResult} = require('../database/index')
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
	let str = 'select p.uuid as uuid, s.name as p_name, p.s_name as s_name, p.solve_id as solve_id,' +
		' p.post_id as post_id, p.s_status as s_status, p.p_status as p_status, p.create_time as create_time from user as s join ' +
		'(select s.name as s_name, e.uuid as uuid, e.create_time as create_time,  e.solveid as solve_id ,e.sstatus as s_status, e. pstatus as p_status, e.postid as post_id from user as s ' +
		'right join event as e on s.uuid = e.solveid) as p on s.uuid = p.post_id'
	postid && (str = `${str} where p.post_id  = ${postid}`)
	return sequelize.query( str,{type: sequelize.QueryTypes.SELECT})
		.then(data => {
			return data
		})
}
const getUserMsg = (uuid) => {
	return User.findOne({
		attributes: ['name', 'uuid'],
		where: {
			uuid
		}
	}).then(data => data)
}
const getThisEvent = (uuid) => {
	return Event.findOne({
		where: {
			uuid
		}
	}).then(data => data)
}
const getEventAllComment = (uuid) => {
	return sequelize.query('select * from (select * from p_event_result where uuid = :uuid union select * from s_event_result where uuid = :uuid) as al order by al.create_time asc',
		{replacements: {uuid}, type: sequelize.QueryTypes.SELECT})
		.then(data => data)
}
const mgEventComment = ({uuid, comment}) => {
	return PeventResult.upsert({
		uuid,
		comment
	}).then(data => data)
}
const slEventComment = ({uuid, comment}) => {
	return SeventResult.upsert({
		uuid,
		comment
	}).then(data => data)
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
	router.post('/event/getEventDetail', userAuth(2), async ctx => {
		const {uuid} = ctx.request.body
		const {user: {name, role}} = ctx.session
		if (checkArg([uuid])) {
			try {
				const event = await getThisEvent(uuid)
				const {postid, solveid} =  event
				const postMsg = await getUserMsg(postid)
				const solveMsg = await getUserMsg(solveid)
				const comments  = await getEventAllComment(uuid)
				if (name !== postMsg.name && role !== 1) {
					throw new Error('权限不足')
				}
				ctx.body = success({event, postMsg, solveMsg, comments})
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	router.post('/event/mg/event', userAuth(8), async ctx => {
		const {uuid, comment} = ctx.request.body
		const {user: {name}} = ctx.session
		if (checkArg([uuid, comment])) {
			try {
				const result = await mgEventComment({uuid, comment})
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	router.post('/event/sl/event', userAuth(8), async ctx => {
		const {uuid, comment} = ctx.request.body
		const {user: {name}} = ctx.session
		if (checkArg([uuid, comment])) {
			try {
				const result = await slEventComment({uuid, comment})
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