module.exports = (sequelize, DataTypes) => {
	return sequelize.define('courses', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        user_id: {
			type: DataTypes.STRING,
		}
	}, {
		timestamps: false,
	});
};

