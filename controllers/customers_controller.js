const Customer = require("../models/customer");
const Product_Category = require("../models/product_category");
const Product = require("../models/product");
const ShoppingCartRelation = require("../models/shopping_cart_relation");

module.exports.profile = async function(req, res){
    const customer = await Customer.findByPk(req.params.id);
    if(customer==null){console.log("error in finding customer while rendering profile"); return;}
    else if(customer.id!=req.user.id){
        return res.redirect("back");
    }else{
        return res.render("customer_profile", {
            title: "NexusMart | Profile",
            customer: customer
        });
    }
}

module.exports.shoppingCart = async function(req, res){
    const customer = await Customer.findByPk(req.params.id);
    let products = await Product.findAll({ where: {CustomerId: req.params.id}, order: [["createdAt", "ASC"]] });

    return res.render("shopping_cart", {
        title: "NexusMart | Shopping Cart",
        products: products,
        customer: customer
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/customers/profile");
    }

    return res.render("customer_sign_up", {
        title: "NexusMart | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/customers/profile");
    }

    return res.render("customer_sign_in", {
        title: "NexusMart | Sign In"
    });
}

// get the sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }

    const customer = await Customer.findOne({where: {email: req.body.email}});
    if(!customer){
        const customer = await Customer.create(req.body);
        if(customer==null){console.log("error in creating customer while signing up"); return;}
        return res.redirect("/customers/sign-in");
    }else{
        return res.redirect("back");
    }
}

module.exports.viewCategory = async function(req, res){
    const category = await Product_Category.findByPk(req.params.id);
    if(category==null){console.log("error in rendering category"); return;}
    return res.render("category", {
        title: "NexusMart | Category",
        category: category
    });
}

// sign in and create a session for the customer
module.exports.createSession = function(req, res){
    return res.redirect("/");
}

// sign out and destroy the session for the customer
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){console.log("error in logging out"); return next(err);}
        return res.redirect("/");
    });
}