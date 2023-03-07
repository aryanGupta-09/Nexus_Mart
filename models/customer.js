const db = require("../config/sequelize");

const Customer = db.define('Customer', {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: db.Sequelize.STRING,
            allowNull: false
        }
    }
);

db.sync({force: true}).then(() => {
    console.log('Customer table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table Customer: ', error);
 }); 

module.exports = Customer;