const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Customer = require("../models/customer");
const Admin = require("../models/admin");

// authentication using passport for customer
passport.use("customer", new LocalStrategy({
        usernameField: "email"
    },
    async function(email, password, done){
        // find a customer and establish the identity
        const customer = await Customer.findOne({where: {email: email}});

        if(!customer || customer.password != password){
            console.log("Invalid Username/Password");
            return done(null, false);
        }

        return done(null, customer);
    }
));

// authentication using passport for admin
passport.use("admin", new LocalStrategy({
        usernameField: "email"
    },
    async function(email, password, done){
        // find an admin and establish the identity
        const admin = await Admin.findOne({where: {email: email}});

        if(!admin || admin.password != password){
            console.log("Invalid Username/Password");
            return done(null, false);
        }

        return done(null, admin);
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    const model = Object.getPrototypeOf(user) === Customer.prototype ? "customer" : "admin";
    done(null, {id: user.id, model: model});
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function(key, done){
    var user;
    if(key.model=="customer"){
        user = await Customer.findByPk(key.id);
    }else{
        user = await Admin.findByPk(key.id);
    }
    return done(null, user);
});

// check if the customer is authenticated
passport.checkCustAuth = function(req, res, next){
    if(req.user!=null && Object.getPrototypeOf(req.user) === Admin.prototype){
        return res.redirect("/admin/sign-in");
    }

    if(req.user!=null && Object.getPrototypeOf(req.user) === Customer.prototype && req.isAuthenticated()){
        return next();
    }

    return res.redirect("/customers/sign-in");
}

// check if the admin is authenticated
passport.checkAdminAuth = function(req, res, next){
    if(req.user!=null && Object.getPrototypeOf(req.user) === Customer.prototype){
        return res.redirect("/customers/sign-in");
    }

    if(req.user!=null && Object.getPrototypeOf(req.user) === Admin.prototype && req.isAuthenticated()){
        return next();
    }

    return res.redirect("/admin/sign-in");
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    return next();
}

module.exports = passport;