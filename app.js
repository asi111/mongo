const express = require("express");
const app = express();
const PORT = 8080;

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("blog");
  dbo
    .collection("authors")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      console.log(result);

      showCollection("post")
          db.close();
    });
});


function showCollection(collection){
    MongoClient.connect(url, (err, db)=> {
        if (err) throw err;
        var dbo = db.db("blog");
        dbo
          .collection(collection)
          .find({})
          .toArray((err, result) => {
            if (err) throw err;
            console.log(result);
          });
      });
}

app.listen(PORT, () => {
  console.log(`app listening to ${PORT}`);
});
