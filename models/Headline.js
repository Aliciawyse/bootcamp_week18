// require the mongoose npm package
var mongoose = require("mongoose");

// create a schema object
var Schema =  mongoose.Schema;

// create our own schema
// it requires a unique headline and a summary

var headlineSchema = new Schema({

    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    // saved is default to false but it'll change to true
    // if user saves the article
    date: String,
    saved: {
        type: Boolean,
    default: false
}

});

var Headline = mongoose.model("Headline", headlineSchema);

module.exports  = Headline;