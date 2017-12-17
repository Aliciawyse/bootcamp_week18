$.getJSON("/all", function(data){

    //for each entry of that json
    console.log(data);

    //append the title
    for (var i = 0; i < data.length; i ++ ){
        $("#results").append("<div class='tile is-parent'><div class='tile is-child box'><h1 class='title is-5'>" + data[i].title + "</h1></div></div>");
    }
});