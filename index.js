const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();
const port = 666;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/sequelize");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

// sequelize store is used to store the session cookie in the db
app.use(session({
    name: "nexusmart",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new SequelizeStore({
        db: db,
        checkExpirationInterval: (1000*60*60),
        expiration: (1000*60*100),
        function(err){
            console.log(err || "connect-session-sequelize setup ok");
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedCustomer);

app.use("/", require("./routes"));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }else{
        console.log(`Server is running on port: ${port}`);
    }
});