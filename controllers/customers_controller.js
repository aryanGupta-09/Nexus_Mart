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
module.exports.create = function(req, res){
    
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    
}