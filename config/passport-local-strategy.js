const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Customer = require("../models/customer");

// authentication using passport
passport.use(new LocalStrategy({
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

// serializing the customer to decide which key is to be kept in the cookies
passport.serializeUser(function(customer, done){
    done(null, customer.id);
});

// deserializing the customer from the key in the cookies
passport.deserializeUser(async function(id, done){
    const customer = await Customer.findByPk(id);
        
    return done(null, customer);
});

// check if the customer is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the customer is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the customer is not signed in
    return res.redirect("/customers/sign-in");
}

passport.setAuthenticatedCustomer = function(req, res, next){
    if(req.isAuthenticated()){
        // req.customer contains the current signed in customer from the session cookie and we are just sending this to the locals for the views
        res.locals.customer = req.customer;
    }

    return next();
}

module.exports = passport;