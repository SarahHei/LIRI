require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

function concertThis(){
    require("dotenv").config();
    var moment = require('moment');
    moment().format();
    
    var request = require("request");
    if (process.argv[2] = 'concert-this')
    {
      var artist = process.argv.slice(3).join('');
      var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
      console.log(queryURL);
    
      request(queryURL, function (error, response, body) {
        if (error) {
          console.log(error); 
        }
        var result = JSON.parse(body);
        if (result.length === 0)  {
          console.log('Hey that artist isntt playing right now try again')
        }

        for (i = 0; i < result.length; i++) {

          console.log('Venue name: ', result[i].venue.name);
          console.log('Venue city, state: ', result[i].venue.city, result[i].venue.region);
          console.log('Date of event', moment(result[i].datetime).format('MM / DD / YYYY'));
        }
      });
    }
 }

 function runSpotify(song){
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
};

function movieThis(){
    var request = require("request");
    var movieName = process.argv[3].toString();
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + process.env.MOVIE_ID;
    
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Produced in: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Year);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
 }

 function doWhatItSays(){
var fs = require("fs");
fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");

  if (data) {
    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    
    var song = dataArr[1];
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log("anything__________________________")
          return console.log('Error occurred: ' + err);
        }
       var track = data.tracks.items[0];
       var artists = track.artists;
       artists.forEach(function(artist){
           console.log(artist.name) 
       })
       console.log(track.name);
       console.log(track.preview_url);
       console.log(track.album.name)
      });
    
};

});
};

var pickCommand = function(command, data) {
  switch(command) {
    case "concert-this":
     concertThis(data)
  break;

  case "spotify-this-song":
  //if(process.argv.length > 2){
  //       spotify(data)
  //   }
  //   else{
  //       spotify()
  //   }
  //    console.log("Spotify")
  runSpotify(data)
  break;

  case "movie-this":
     movieThis(data)
  break;

  case "do-what-it-says":
     doWhatItSays(data)
  break;
  }
}

pickCommand(process.argv[2], process.argv.slice(3).join(" "))

