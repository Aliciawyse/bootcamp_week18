//Parses our html and helps us find elements
var cheerio = require("cheerio");

// Makes HTTP request for HTML page
var request = require("request");

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
    "Grabbing info" +
    "\n***********************************\n");

request("https://www.npr.org/", function(error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    $("h1.title").each(function (i, element) {

        var title = $(element).text();

        var link = $(element).parent().attr("href");

        var teaser = $(element).parent().next().children(".teaser").text();


        // // Save the text of the element in a "title" variable
        // var title = $(element).text();
        // //
        // // // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: link,
            teaser: teaser
        });
    });
  console.log(results);
});