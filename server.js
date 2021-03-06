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

app.get("/all", function(req, res) {
  db.notes.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.post("/submit", function(req, res) {
  // console.log("req.body equal to" + req.body);

  db.notes.insert(req.body, function(error, inserted) {
    if (error) {
      console.log(error);
    } else {
      res.send(inserted);
    }
  });
});

app.get("/clearall", function(req, res) {
  db.notes.remove({}, function(error, deleted) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.json(deleted);
    }
  });
});

app.get("/deleteone/:id", function(req, res) {
  db.notes.remove({ _id: mongojs.ObjectID(req.params.id) }, function(
    error,
    removed
  ) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(removed);
    }
  });
});

app.get("/findone/:id", function(req, res) {
  db.notes.findOne({ _id: mongojs.ObjectID(req.params.id) }, function(
    error,
    found
  ) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(found);
    }
  });
});

app.post("/update/:id", function(req, res) {
  db.notes.update(
    {
      _id: mongojs.ObjectID(req.params.id)
    },
    {
      $set: {
        title: req.body.title,
        note: req.body.note,
        modified: Date.now()
      }
    },
    function(error, edited) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

app.listen(3000, function() {
  console.log("the app is listening on port 3000");
});
