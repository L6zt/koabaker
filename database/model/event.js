const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('event', {
		uuid: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			primaryKey: true,
		},
		title: {
			type: Sequelize.STRING(255),
		},
		content: {
			type: Sequelize.TEXT
		},
		postid: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			allowNull: false,
			references: {
				model: 'user',
				key: 'uuid'
			}
		},
		solveid: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			allowNull: false,
			references: {
				model: 'user',
				key: 'uuid'
			}
		},
		pstatus: {
			type: Sequelize.INTEGER(1).UNSIGNED,
			default: 0
		},
		sstatus: {
			type: Sequelize.INTEGER(1).UNSIGNED,
			default: 0
		},
		create_time: {
			type: Sequelize.DATE,
			defaultValue: DataTypes.NOW
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