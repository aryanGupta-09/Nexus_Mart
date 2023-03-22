const Product_Category = require("../models/product_category");

module.exports.home = async function(req, res){
    let categories = await Product_Category.findAll();
    return res.render("home", {
        title: "NexusMart | Home",
        categories: categories
    });
}