const express = require("express");
const expressHandlebars = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

// Import routes and give the server access to them.
require("./config/routes.js")(router);

// Serve static content for the app from the "public" directory
app.use(express.static(__dirname + "/public"));

// Set Handlebars
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

const db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, function(err)
{
    if (err)
    {
        console.log(err);
    }
    else
    {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, function()
{
    console.log("App now listening on port " + PORT);
});