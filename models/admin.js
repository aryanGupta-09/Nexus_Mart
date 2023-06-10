const db = require("../config/sequelize");

const Admin = db.define('Admin', {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
    }
);

Admin.findOrCreate({
    where: {
        name: 'admin1',
        email: 'admin1@nm.com',
        password: 'admin1',
        phone_number: '1234567890'
    }
}).then(([admin, created]) => {
    if (created) {
        console.log('admin1 created successfully!');
    } else {
        console.log('admin1 already exists');
    }
}).catch((error) => {
    console.error('Unable to create admin1: ', error);
});

db.sync().then(() => {
    console.log('Admin table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Admin: ', error);
 });

module.exports = Admin;