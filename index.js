const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();
const port = 666;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/sequelize");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);
// extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }else{
        console.log(`Server is running on port: ${port}`);
    }
});