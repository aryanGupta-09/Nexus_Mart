const Admin = require("../models/admin");
const Product_Category = require("../models/product_category");
const fs = require("fs");
const path = require("path");

module.exports.profile = function(req, res){
    return res.render("admin_profile", {
        title: "Admin Profile",
        layout: "./admin_layout"
    });
}

module.exports.modifyProductCategory = function(req, res){
    return res.render("modify_product_category", {
        title: "Modify Product Category",
        layout: "./admin_layout"
    });
}

module.exports.addProductCategory = async function(req, res){
    Product_Category.uploadedImage(req, res, async function(err){
        if(err){console.log("*****Multer error", err);}
        
        let category = await Product_Category.findOne({where: {name: req.body.name}});
        if(!category){
            const newCategory = await Product_Category.create(req.body);
            if(newCategory==null){console.log("error in creating new category"); return;}

            if(req.file){
                newCategory.image = Product_Category.imagePath + "/" + req.file.filename;
                await newCategory.save();
            }
        }

        return res.redirect("back");
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/admin/profile");
    }

    return res.render("admin_sign_in", {
        title: "Admin | Sign In", layout: "./admin_layout"
    });
}

// sign in and create a session for the admin
module.exports.createSession = function(req, res){
    return res.redirect("/admin/profile");
}

// sign out and destroy the session for the admin
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){console.log("error in logging out"); return next(err);}
        return res.redirect("/admin/sign-in");
    });
}