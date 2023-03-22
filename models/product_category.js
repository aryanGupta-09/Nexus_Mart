const db = require("../config/sequelize");

const multer = require("multer");
const path = require("path");
const IMAGE_PATH = path.join("/uploads/product_categories/images");

const Product_Category = db.define("Product_Category", {
        name: {
            type: db.Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: db.Sequelize.STRING,
            allowNull: true
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

Product_Category.uploadedImage = multer({storage: storage}).single("image");
Product_Category.imagePath = IMAGE_PATH;

db.sync().then(() => {
    console.log('Product_Category table created/accessed successfully!');
 }).catch((error) => {
    console.error('Unable to create table Product_Category: ', error);
 });

module.exports = Product_Category;