const db = require("../config/sequelize");

const Customer = require('./customer');
const CartItem = require('./cart_item');

Customer.hasMany(CartItem);
CartItem.belongsTo(Customer);

db.sync().then(() => {
    console.log('Shopping-cart relation created!');
 }).catch((error) => {
    console.error('Unable to create Shopping-cart relation: ', error);
 }); 