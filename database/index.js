	const Sequelize = require('sequelize')
	const sequelize = new Sequelize('koa', '***', '***', {
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
	})
	const User = sequelize.import(`${__dirname}/model/user`)
	const Event = sequelize.import(`${__dirname}/model/event`)
	const PeventResult = sequelize.import(`${__dirname}/model/p_event_result`)
	const SeventResult = sequelize.import(`${__dirname}/model/s_event_result`)
	module.exports = {
		sequelize,
		User,
		Event,
		PeventResult,
		SeventResult
	}
	