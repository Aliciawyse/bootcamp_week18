// require the mongoose npm package
var mongoose = require("mongoose");

// create a schema object
var Schema =  mongoose.Schema;

// create our own schema
// first part is the headline id.
// its the associated article
// we want to attach the note to

var noteSchema = new Schema({

    _headline: {
        type: Schema.Types.ObjectId,
        ref: "Headline"
    },
    // saved is default to false but it'll change to true
    // if user saves the article
    date: String,
    noteText: String
});

var Note = mongoose.model("Note", noteSchema);

module.exports  = Note;