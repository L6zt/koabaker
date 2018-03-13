const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('p_event_result', {
		uuid: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			primaryKey: true,
		},
		comment: {
			type: Sequelize.TEXT
		},
		// 提交人 id
		user_id: {
			type: Sequelize.INTEGER(8).UNSIGNED,
		},
		// 事件 id
		event_id: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			references: {
				model: 'event',
				key: 'uuid'
			}
		},
		create_time: {
			type: Sequelize.DATE,
			defaultValue: DataTypes.NOW
		},
		status: {
			type: Sequelize.INTEGER(1).UNSIGNED,
			default: 0
		}
	},{
		indexes: [
			{
				unique: true,
				fields: ['uuid']
			}
		],
		timestamps: false,
		paranoid: false,
		underscored: false,
		freezeTableName: true
	})
}