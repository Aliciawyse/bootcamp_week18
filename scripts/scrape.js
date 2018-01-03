// require request and cheerio

var request = require("request");
var cheerio = require("cheerio");


var scrape = function (cb) {

    request("https://www.npr.org/", function(error, response, html) {
        // Load the HTML into cheerio and save it to a variable
        // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
        var $ = cheerio.load(html);
        var articles = [];

        $("h1.title").each(function (i, element) {

            var title = $(element).text();
            var link = $(element).parent().attr("href");
            var teaser = $(element).parent().next().children(".teaser").text();

            if(title && link && teaser){
                var dataToAdd = {
                    title: title,
                    link: link,
                    teaser: teaser
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);

    });
};

module.exports = scrape;
