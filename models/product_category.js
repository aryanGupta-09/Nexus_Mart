const db = require("../config/sequelize");

const Product_Category = db.define("Product_Category", {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        products: {
            type: db.Sequelize.JSON,
            allowNull: false
        }
    }
);

db.sync().then(() => {
    console.log('Product_Category table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Product_Category: ', error);
 }); 

module.exports = Product_Category;