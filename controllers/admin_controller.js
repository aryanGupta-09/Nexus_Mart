const Admin = require("../models/admin");

module.exports.profile = function(req, res){
    return res.render("admin_profile", {
        title: "Admin Profile"
    });
}

// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        console.log("Successful");
        return res.redirect("/admin/profile", {
            title: "Admin | Profile", layout: "./admin_layout"
        });
    }

    return res.render("admin_sign_in", {
        title: "Admin | Sign In", layout: "./admin_layout"
    });
}

// sign in and create a session for the admin
module.exports.createSession = function(req, res){
    return res.redirect("/");
}

// sign out and destroy the session for the admin
module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){console.log("error in logging out"); return next(err);}
        return res.redirect("/");
    });
}