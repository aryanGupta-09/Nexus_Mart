const db = require("../config/sequelize");

const Product = require('./product');

const CartItem = db.define('CartItem', {
    quantity: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}
);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

db.sync().then(() => {
    console.log('Cart-item table created!');
}).catch((error) => {
    console.error('Unable to create table Cart-item: ', error);
}); 
module.exports = CartItem;