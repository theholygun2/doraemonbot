const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const Courses = require('./models/Courses.js')(sequelize, Sequelize.DataTypes);

Users.hasMany(Courses,{
	foreignKey: 'user_id'
})
Courses.belongsTo(Users,{
	foreignKey: 'user_id'
});

Reflect.defineProperty(Users.prototype, 'addCours', {
	value: async (newCours) => {
		const userCours = await Courses.findOne({
			where: { user_id: this.user_id, name: newCours.name },
		});
		if (userCours) {
			userCours = newCours
			return userCours.save();
		}
		return Courses.create({ user_id: this.user_id, name: newCours.name, link: newCours.link });
	},
});


Reflect.defineProperty(Users.prototype, 'getCourses', {
	value: () => {
		return Courses.findAll({});
	},
});

Reflect.defineProperty(Users.prototype, 'testMethod', {
	value: (Courses) => {
		Courses.findAll({
			where: { user_id: this.user_id }
		})
		return 
	},
});

module.exports = { Users, Courses };