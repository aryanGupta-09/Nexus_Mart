const db = require("../config/sequelize");

const OrderItem = require("./order_item");
const Customer = require("./customer");

const Order = db.define('Order', {
    placed_date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    arrival_date: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    num_items:{
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    total_amount: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
}
);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Customer.hasMany(Order);
Order.belongsTo(Customer);

db.sync().then(() => {
    console.log('Order table created/accessed successfully!');
}).catch((error) => {
    console.error('Unable to create table Order: ', error);
});

module.exports = Order;