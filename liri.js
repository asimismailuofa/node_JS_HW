require("dotenv").config();


var keys = require("./keys")

var request = require("request")

var moment = require("moment")

var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);


