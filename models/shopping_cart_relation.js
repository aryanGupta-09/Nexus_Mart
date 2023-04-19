const db = require("../config/sequelize");

const Customer = require('./customer');
const Product = require('./product');

Customer.hasMany(Product);
Product.belongsTo(Customer);

db.sync().then(() => {
    console.log('Shopping-cart relation created!');
 }).catch((error) => {
    console.error('Unable to create Shopping-cart relation: ', error);
 }); 