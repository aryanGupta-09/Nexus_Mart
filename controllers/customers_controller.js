const Customer = require("../models/customer");

module.exports.profile = function(req, res){
    return res.render("customer_profile", {
        title: "Customer Profile"
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    return res.render("customer_sign_up", {
        title: "NexusMart | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
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

// sign in and create a session for the customer
module.exports.createSession = function(req, res){
    
}