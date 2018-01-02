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
	const user = sequelize.import(`${__dirname}/model/user`)
	const event = sequelize.import(`${__dirname}/model/event`)
	module.exports = {
		sequelize,
		user,
		event
	}
	