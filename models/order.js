const db = require("../config/sequelize");

const CartItem = require("./cart_item");

const Order = db.define('Order', {
    placed_date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    arrival_date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cust_name: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cust_address: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    total_amount: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}
);

Order.hasMany(CartItem);
CartItem.belongsTo(Order);

db.sync().then(() => {
    console.log('Order table created/accessed successfully!');
}).catch((error) => {
    console.error('Unable to create table Order: ', error);
});

module.exports = Order;