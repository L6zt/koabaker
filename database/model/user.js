	const Sequelize = require('sequelize')
	module.exports = (sequelize, DataTypes) => {
		return sequelize.define('user', {
			uuid: {
				type: Sequelize.INTEGER(8).UNSIGNED,
				primaryKey: true,
				unique: true,
				autoIncrement: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(8),
				validate: {
					is: /^[a-z]+$/i
				}
			},
			password: Sequelize.STRING(64),
			role: {
				type: Sequelize.INTEGER(2),
				validate: {
					is: /\d{1,2}$/
				}
			}
		},{
			timestamps: false,
			paranoid: false,
			underscored: false,
			freezeTableName: true
		})
	}