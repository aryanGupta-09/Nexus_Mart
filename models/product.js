const db = require("../config/sequelize");

const multer = require("multer");
const path = require("path");
const IMAGE_PATH = path.join("/uploads/products/images");

const Product = db.define("Product", {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: db.Sequelize.STRING,
            allowNull: true
        },
        stock: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        total_price: {
            type: db.Sequelize.INTEGER,
            allowNull: false
        },
        image: {
            type: db.Sequelize.STRING,
            allowNull: true
        }
    }
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", IMAGE_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

Product.uploadedImage = multer({storage: storage}).single("image");
Product.imagePath = IMAGE_PATH;

db.sync().then(() => {
    console.log('Product table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Product: ', error);
 }); 

module.exports = Product;