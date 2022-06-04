const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('server', {
		// The following specification of the 'id' attribute could be omitted
		// since it is the default.
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				// We require usernames to have length of at least 3, and
				// only use letters, numbers and underscores.
				is: /^\w{3,}$/
			}
		},
	});
};