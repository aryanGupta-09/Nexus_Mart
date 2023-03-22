const db = require("../config/sequelize");

const Product_Category = require('./product_category');
const Product = require('./product');

Product_Category.hasMany(Product);
Product.belongsTo(Product_Category);

db.sync().then(() => {
    console.log('Category-Product relation created!');
 }).catch((error) => {
    console.error('Unable to create Category-Product relation: ', error);
 }); 