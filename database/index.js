	const Sequelize = require('sequelize')
	const sequelize = new Sequelize('koa', 'root', '97019jiao', {
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
	module.exports = {
		sequelize,
		User,
		Event
	}
	