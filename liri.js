require("dotenv").config();

var keys = require("./keys");
var request = require("request");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

console.log(process.argv);
var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

if (command === "concert-this") {
    conInfo();
}
else if (command === "spotify-this-song") {
    spotSong();
}
else if (command === "movie-this") {
    movieInfo();
}
else if (command === "do-what-it-says") {
    doIt();
}
else {
    console.log("no command found");
}

function conInfo() {
    var query = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(query).then(function (response) {
        // console.log(response.data);

        var data = response.data;

        for (var i = 0; i < data.length; i++) {
            var showInfo = data[i];
            // console.log(showInfo);

            console.log(showInfo.venue.name);
            console.log(showInfo.venue.city);
            console.log(showInfo.venue.country);
            console.log(moment(showInfo.datetime).format("MM/DD/YYYY"));
            console.log(" ---- ");

        }
    });
}

function spotSong() {
    spotify.search({
        type: "track",
        query: userInput
    },
        function (error, response) {

            // console.log(response);
            var items = response.tracks.items;

            for (var i = 0; i < items.length; i++) {
                console.log(items[i].name);
                console.log(items[i].preview_url);
                console.log(items[i].album.name);
                console.log(items[i].artists[0].name);
                console.log(" ---- ");
            }
        });
};

function movieInfo() {
    var query = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(query).then(function (response) {
    console.log(response.data.Title);
    console.log(response.data.Year);
    console.log(response.data.Rated);
    console.log(response.data.Country);
    console.log(response.data.Language);
    console.log(response.data.Plot);
    console.log(response.data.Actors);
    console.log(response.data.imdbRating);
    console.log(response.data.Ratings[1].Value);
    });

}
function doIt(){
    fs.readFile("random.txt", "utf-8", function(error, data){
        console.log(data);

        var fileData = data.split(",");
        command = fileData[0];
        userInput = fileData[1];

        if (command === "concert-this") {
            conInfo();
        }
        else if (command === "spotify-this-song") {
            spotSong();
        }
        else if (command === "movie-this") {
            movieInfo();
        }
        else if (command === "do-what-it-says") {
            doIt();
        }
        else {
            console.log("no command found");
        }
    });
}