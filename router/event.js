const Sequelize = require('sequelize')
const {Op} = Sequelize
const {sequelize, Event, User,PeventResult, SeventResult} = require('../database/index')
const {success, fail} = require('../response')
const {checkArg, isNum, uniqKey} = require('../utils/index')
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
// 鉴权函数是否公用
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
///
const createEvent = ({title, solveid, content, uuid}) => {
	return Event.create({
		title, solveid, content, postid: uuid
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
// 逻辑 --- 事件查找 （role 1 2 3） 人物信息 m s ; 对应 事件; 只能查看自己的对应的 （事件 role 1 除外）
// 操作 m s 对 event 事件操作 commit event 提出事件 处理事件 m 对事件有结束 权限 （1）
// 难点 怎么做到 1...2...3 好的联表查询 分页  count(*) ...
// 拆分 获取 事件 列表 获取用户信息 
// const getList = (postid) => {
// 	let str = 'select p.uuid as uuid, s.name as p_name, p.s_name as s_name, p.solve_id as solve_id,' +
// 		' p.post_id as post_id, p.s_status as s_status, p.p_status as p_status, p.create_time as create_time from user as s join ' +
// 		'(select s.name as s_name, e.uuid as uuid, e.create_time as create_time,  e.solveid as solve_id ,e.sstatus as s_status, e. pstatus as p_status, e.postid as post_id from user as s ' +
// 		'right join event as e on s.uuid = e.solveid) as p on s.uuid = p.post_id'
// 	postid && (str = `${str} where p.post_id  = ${postid}`)
// 	return sequelize.query( str,{type: sequelize.QueryTypes.SELECT})
// 		.then(data => {
// 			return data
// 		})
// }
const allEventList = ({ pageIndex, pageSize}) => {
	console.log(pageIndex, pageSize)
	return Event.findAndCountAll({
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	})
}
const mgEventList = ({postid, pageIndex, pageSize}) => {
	return Event.findAndCountAll({
		where: {
			postid
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	})
}
const slEventList = ({solveid, pageIndex, pageSize}) => {
	return Event.findAndCountAll({
		where: {
			solveid
		},
		offset: (pageIndex - 1) * pageSize,
		limit: pageSize,
		order: [['uuid', 'DESC']]
	})
}
// 查找信息
const getUserMsg = (uuid) => {
	return User.findOne({
		attributes: ['name', 'uuid', 'role', 'pic'],
		where: {
			uuid
		}
	}).then(data => data)
}
// 获取列表
const getUserListMsg = (arg) => {
	return User.findAll({
		attributes: ['name', 'role', 'uuid', 'pic'],
		where: {
			uuid: {
				[Op.in]: arg
			}
		}
	}).then(data => data)
}

// 查看事件是否存在
const getThisEvent = ({uuid, postid, solveid}) => {
	const where = {uuid}
	if (postid) {
		Object.assign(where, {postid})
	} else {
		Object.assign(where, {solveid})
	}
	
	return Event.findOne({
		where
	}).then(data => data)
}
// 查看 该事件所有 对话
const getEventAllComment = (event_id) => {
	return sequelize.query('select * from (select * from p_event_result where event_id = :event_id union select * from s_event_result where event_id = :event_id) as al order by al.create_time asc;',
		{replacements: {event_id}, type: sequelize.QueryTypes.SELECT})
		.then(data => data)
}

const mgEventComment = ({event_id, comment, user_id}) => {
	return PeventResult.upsert({
		event_id,
		comment,
		user_id
	}).then(data => data)
}

const slEventComment = ({event_id, comment, user_id}) => {
	return SeventResult.upsert({
		event_id,
		comment,
		user_id
	}).then(data => data)
}
const mgEventHanleStatus = ({uuid, postid, status})  => {
	return Event.update({
		pstatus: status
	}, {
		where: {
			uuid,
			postid
		}
	})
}
const slEventHanleStatus = ({uuid, sloveid, status})  => {
	return Event.update({
		sstatus: status
	},{
			where: {
				uuid,
				solveid
			}
		}
	)
}
const eventRouter = (router) => {
	// router.use('/auth',userAuth)
	// 事件生成
	router.post('/event/create', userAuth(2) ,async ctx => {
		const {title, solveid, content} = ctx.request.body
		const {user: {uuid}} = ctx.session
		if (checkArg([title, solveid, content])) {
			try {
				const result = await  createEvent({title, solveid, content, uuid})
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	// 事件删除
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
	router.post('/event/getList', userAuth(3), async ctx => {
		const {user: {uuid: ownid, role}} = ctx.session
		let {pageIndex, pageSize, postid, solveid} = ctx.request.body
		let result
		if (checkArg([pageSize, pageIndex]) && isNum(pageIndex) && isNum(pageSize)) {
			pageSize = parseInt(pageSize)
			pageIndex = parseInt(pageIndex)
		} else {
			ctx.body = fail({flag: 222})
			return
		}
		try {
			switch (role) {
				case 1: {
						let rows, sidList, pidList, sUser, pUser
						result = await allEventList({pageIndex, pageSize})
						rows = result.rows
						if (rows) {
							sidList = uniqKey({target: rows, key: 'solveid'})
							pidList = uniqKey({target: rows, key: 'postid'})
							if (sidList) {
								// 用户列表
								sUser = await getUserListMsg(sidList.map(item => parseInt(item)))
							}
							if (pidList) {
								pUser = await getUserListMsg(pidList.map(item => parseInt(item)))
							}
							ctx.body = success({
									sUser: sUser || [],
									pUser: pUser || [],
									eventList: result
							})
							return
						}
						return
				}
				case 2: {
					let rows, sidList, pidList, sUser, pUser
					if (checkArg([postid])) {
						 result = await mgEventList({postid, pageIndex, pageSize})
						 rows = result.rows
						 if (rows) {
						 	sidList = uniqKey({target: rows, key: 'solveid'})
							pidList = uniqKey({target: rows, key: 'postid'})
						 }
						 if (sidList) {
						 	sUser = await getUserListMsg(sidList)
						 }
						if (pidList) {
							pUser = await getUserListMsg(pidList.map(item => parseInt(item)))
						}
						ctx.body = success({
								sUser: sUser || [],
								pUser,
								eventList: result
						})
						return
					} else {
						ctx.body = fail({flag: 222})
						return
					}
				}
				default : {
					let rows, pidList, pUser, sidList, sUser
					if (checkArg([solveid])) {
						result = await slEventList({solveid, pageIndex, pageSize})
						rows = result.rows
						if (rows) {
							sidList = uniqKey({target: rows, key: 'solveid'})
							pidList = uniqKey({target: rows, key: 'postid'})
						}
						if (sidList) {
							sUser = await getUserListMsg(sidList)
						}
						if (pidList) {
							pUser = await getUserListMsg(pidList.map(item => parseInt(item)))
						}
						ctx.body = success({
								sUser: sUser || [],
								pUser: pUser ||[],
								eventList: result
						})
						return
					} else {
						ctx.body = fail({flag: 222})
						return
					}
				}
			}
		} catch (e) {
			ctx.body = fail({errMsg: e})
		}
	})
	// 事件详情
	router.post('/event/getEventComment', userAuth(3), async ctx => {
		let {uuid} = ctx.request.body
		const {user: {name, role, uuid: ownid}} = ctx.session
		let comments, userIdList, userList
		uuid = parseInt(uuid)
		if (checkArg([uuid]) && !isNaN(uuid)) {
			try {
				switch (role) {
					case 1: {
						comments  = await getEventAllComment(uuid)
						break
					}
					case 2: {
						const isHas = await getThisEvent({uuid, postid: ownid})
						if (!isHas) {
							ctx.body = fail({errMsg: '无查看权限'})
							return
						}
						comments = await getEventAllComment(uuid)
						break
					}
					default : {
						const isHas = await getThisEvent({uuid, solveid: ownid})
						if (!isHas) {
							ctx.body = fail({errMsg: '无查看权限'})
							return
						}
						comments  = await getEventAllComment(uuid)
						break
					}
				}
				if (comments && comments.length) {
					userIdList = uniqKey({target: comments, key: 'user_id'})
					userList = await getUserListMsg(userIdList)
				}
				ctx.body = success({commentList: comments || [], userList: userList || []})
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	router.post('/event/post/comment', userAuth(3), async ctx => {
		let {uuid, comment} = ctx.request.body
		const {user: {role, uuid: ownid}} = ctx.session
		let result
		uuid = parseInt(uuid)
		if (checkArg([uuid, comment]) && !isNaN(uuid)) {
			try {
				switch (role) {
					case 1: {
					}
					case 2: {
						result = await mgEventComment({event_id: uuid, comment, user_id: ownid})
						break;
					}
					case 3: {
						result = await slEventComment({event_id: uuid, comment, user_id: ownid})
						break;
					}
				}
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	router.post('/event/change/mg/status', userAuth(8), async ctx => {
		const {uuid, status} = ctx.request.body
		const {uuid: postid} = ctx.session.user
		if (checkArg([uuid, status])) {
			try {
				const result = await mgEventHanleStatus({uuid, status, postid})
				ctx.body = success(result)
			} catch (e) {
				ctx.body = fail({errMsg: e})
			}
		} else {
			ctx.body = fail({flag: 222})
		}
	})
	// router.post('/event/change/sl/status', userAuth(8), async ctx => {
	// 	const {uuid, status} = ctx.request.body
	// 	const {uuid: solveid} = ctx.session.user
	// 	if (checkArg([uuid, status])) {
	// 		try {
	// 			const result = await slEventHanleStatus({uuid, status, solveid})
	// 			ctx.body = success(result)
	// 		} catch (e) {
	// 			ctx.body = fail({errMsg: e})
	// 		}
	// 	} else {
	// 		ctx.body = fail({flag: 222})
	// 	}
	// })
}
module.exports = eventRouter
