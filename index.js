const express = require("express");
const app = express();
const port = 666;

app.use(express.static("./assets"));

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