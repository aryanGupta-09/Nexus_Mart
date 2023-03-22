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

db.sync().then(() => {
    console.log('Admin table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Admin: ', error);
 });

module.exports = Admin;