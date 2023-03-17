const db = require("../config/sequelize");

const Product = db.define("Product", {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        stock: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        total_price: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        discount: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        image: {
            type: db.Sequelize.BLOB,
            allowNull: false
        },
        products: {
            type: db.Sequelize.JSON,
            allowNull: false
        }
    }
);

db.sync().then(() => {
    console.log('Product table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Product: ', error);
 }); 

module.exports = Product;