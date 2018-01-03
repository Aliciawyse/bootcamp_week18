// dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var mongojs = require("mongojs");


// port is the host's designated port or 3000 when ran on your local machine
var PORT = process.env.PORT || 3000;

// initiate express app
var app = express();

// set up express router
var router = express.Router();

// require routes file pass our router object
require("./config/routes")(router);

// set up static folders. This tells app to look in public folder
// and display main at the root
app.engine("handlebars", expressHandlebars ({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// database configuration
var databaseURL = "scraper";
var collections = ["scrapedData"];

// use bodyParser in our app
app.use(bodyParser.urlencoded({
    extended: false
}));

// every request should go through our router middleware
app.use(router);

// if deployed use deployed database. Otherwise use the local mongoHeadlines
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// connect to database, and log any error if it occurs.
mongoose.connect(db, function(error){
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection successful");
    }
});

//routes
// //route shows home page
// app.get("/", function(req,res){
//     res.send(index.html);
// });
//
// //route retrieves all of our data
// app.get("/all", function(req,res){
//     db.scrapedData.find({}, function(err, found){
//         if (err){
//             console.log(err);
//         }
//         else {
//             res.json(found);
//         }
//     });
// });
//
// //grab data from website of our choice
// app.get("/scrape", function(req,res){
//
//     //Make a request from npr's home page.
//     request("https://www.npr.org/", function(error, response, html) {
//         // Load the HTML into cheerio and save it to a variable
//         // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//         var $ = cheerio.load(html);
//
//         $("h1.title").each(function (i, element) {
//
//             var title = $(element).text();
//
//             var link = $(element).parent().attr("href");
//
//             var teaser = $(element).parent().next().children(".teaser").text();
//
//             if(title && link && teaser){
//                 db.scrapedData.save({
//                     title: title,
//                     link: link,
//                     teaser: teaser
//                 },
//                     function(error, saved) {
//
//                     if (error) {
//                         console.log(error);
//                     }
//                     else {
//                         console.log(saved);
//                     }
//                     });
//             }
//
//         });
//
//     });
//
//     // Send a "Scrape Complete" message to the browser
//     res.send("scrape complete");
//
// });

//listen on port 3000
app.listen(PORT, function(){
    console.log("App running on" + PORT);
});