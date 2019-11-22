var express = require("express");
var mongojs = require("mongojs");
var path = require("path");

var app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var databaseUrl = "notetaker";
var collections = ["notes"];

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log(error);
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.listen(3000, function() {
  console.log("the app is listening on port 3000");
});
