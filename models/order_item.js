const db = require("../config/sequelize");

const Product = require('./product');

const OrderItem = db.define('OrderItem', {
    quantity: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}
);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

db.sync().then(() => {
    console.log('Order-item table created!');
}).catch((error) => {
    console.error('Unable to create table Order-item: ', error);
}); 
module.exports = OrderItem;