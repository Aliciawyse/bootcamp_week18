# Web scraper project


## Development process

### Part 1:

There are several dependencies used in this project. Check them out in the `package.json` file. 

```javascript
"dependencies": {
    "body-parser": "^1.18.2",
    "cheerio": "^1.0.0-rc.2",
    "express": "^4.16.2",
    "express-handlebars": "^3.0.0",
    "mongojs": "^2.4.1",
    "mongoose": "^4.13.7",
    "request": "^2.83.0"
  }
```

```javascript

//initiate express
var app = express();

//set up static folders. 
// This tells app to look in public folder
// and displays index.html at the root
app.use(express.static("public"));

//database configuration
var databaseURL = "scraper";
var collections = ["scrapedData"];

//Hook mongojs configuration to the db variable
var db = mongojs(databaseURL, collections);
db.on("error", function(error){
    console.log("Database Error:", error);
});
```

## Part: 2: 
Set up routes and at the very end of `server.js` listen on port 3000

```javascript
//route shows home page
app.get("/", function(req,res){
    res.send("hello there");
});

//route retrieves all of our data
app.get("/all", function(req,res){
    db.scrapedData.find({}, function(err, found){
        if (err){
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
});

//grab data from website of our choice
app.get("/scrape", function(req,res){
    request("https://www.npr.org/", function(error, response, html) {
        // Load the HTML into cheerio 
        // and save it to a variable
        // '$' becomes a shorthand for 
        // cheerio's selector commands, 
        // much like jQuery's '$'
        var $ = cheerio.load(html);

        $("h1.title").each(function (i, element) {

            var title = $(element).text();

            var link = $(element).parent().attr("href");

            var teaser = $(element).parent().next().children(".teaser").text();

            if(title && link && teaser){
                db.scrapedData.save({
                    title: title,
                    link: link,
                    teaser: teaser
                },
                    function(error, saved) {

                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log(saved);
                    }
                    });
            }

        });

    });

    res.send("scrape complete");

});

//listen on port 3000
app.listen(3000, function(){
    console.log("App running");
});
```
## Part 3:

Details coming soon!