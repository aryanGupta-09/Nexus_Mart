const Admin = require("../models/admin");
const Product_Category = require("../models/product_category");
const Product = require("../models/product");
const CategoryProductRelation = require("../models/category_product_relation");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
    let categories = await Product_Category.findAll({ order: [["createdAt", "ASC"]] });
    return res.render("admin_profile", {
        title: "Admin Profile",
        layout: "./admin_layout",
        categories: categories
    });
}

module.exports.modifyProductCategory = function (req, res) {
    return res.render("modify_product_category", {
        title: "Modify Product Category",
        layout: "./admin_layout"
    });
}

module.exports.addProductCategory = async function (req, res) {
    Product_Category.uploadedImage(req, res, async function (err) {
        if (err) { console.log("*****Multer error", err); }

        let category = await Product_Category.findOne({ where: { name: req.body.name } });
        if (!category) {
            const newCategory = await Product_Category.create(req.body);
            if (newCategory == null) { console.log("error in creating new category"); return; }

            if (req.file) {
                newCategory.image = Product_Category.imagePath + "/" + req.file.filename;
                await newCategory.save();
            }
        }

        return res.redirect("/admin/profile");
    });
}

module.exports.deleteProductCategory = async function (req, res) {
    let category = await Product_Category.findByPk(req.params.id);
    if (category == null) { console.log("error in finding category"); return; }
    Product.destroy({where: {ProductCategoryId: req.params.id}});
    category.destroy();
    return res.redirect("/admin/profile");
}

module.exports.viewProduct = async function (req, res) {
    let category = await Product_Category.findByPk(req.params.id);
    let products = await Product.findAll({ where: {ProductCategoryId: req.params.id}, order: [["createdAt", "ASC"]] });
    return res.render("admin_view_product", {
        title: "View Product",
        layout: "./admin_layout",
        category: category,
        products: products
    });
}

module.exports.addProduct = async function (req, res) {
    let category = await Product_Category.findByPk(req.params.id);

    Product.uploadedImage(req, res, async function (err) {
        if (err) { console.log("*****Multer error", err); }

        let product = await Product.findOne({ where: {ProductCategoryId: req.params.id, name: req.body.name } });
        if (!product) {
            const newProduct = await Product.create(req.body);
            if (newProduct == null) { console.log("error in creating new product"); return; }
            newProduct.ProductCategoryId = req.params.id;
            if(newProduct.stock<0) newProduct.stock=0;
            if (req.file) {
                newProduct.image = Product.imagePath + "/" + req.file.filename;
            }
            await newProduct.save();
        }
        let products = await Product.findAll({ where: {ProductCategoryId: req.params.id}, order: [["createdAt", "ASC"]] });
        return res.render("admin_view_product", {
            title: "View Product",
            layout: "./admin_layout",
            category: category,
            products: products
        });
    });
}

module.exports.modifyProduct = async function (req, res) {
    let category = await Product_Category.findByPk(req.params.id);
    return res.render("modify_product", {
        title: "Modify Product",
        layout: "./admin_layout",
        category: category
    });
}

module.exports.deleteProduct = async function (req, res) {
    console.log(req.params.p_id);
    let category = await Product_Category.findByPk(req.params.id);
    let product = await Product.findByPk(req.params.p_id);
    if (product == null || product.ProductCategoryId!=req.params.id) { console.log("error in finding product"); return; }
    product.destroy();
    
    return res.redirect(`/admin/admin-view-product/${req.params.id}`);
}

// render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/admin/profile");
    }

    return res.render("admin_sign_in", {
        title: "Admin | Sign In", layout: "./admin_layout"
    });
}

// sign in and create a session for the admin
module.exports.createSession = function (req, res) {
    return res.redirect("/admin/profile");
}

// sign out and destroy the session for the admin
module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) { console.log("error in logging out"); return next(err); }
        return res.redirect("/admin/sign-in");
    });
}