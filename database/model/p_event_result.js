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
		postid: {
			type: Sequelize.INTEGER(8).UNSIGNED,
			allowNull: false,
			references: {
				model: 'user',
				key: 'uuid'
			}
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