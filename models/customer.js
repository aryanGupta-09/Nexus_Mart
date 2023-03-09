const db = require("../config/sequelize");

const Customer = db.define('Customer', {
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
        }
    }
);

db.sync().then(() => {
    console.log('Customer table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Customer: ', error);
 }); 

module.exports = Customer;