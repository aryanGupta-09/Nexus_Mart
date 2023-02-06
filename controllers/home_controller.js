module.exports.home = function(req, res){
    console.log("At home page");
    return res.render("home", {
        title: "NexusMart | Home"
    });
}