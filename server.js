const express = require("express");
const app = express();
const fs = require("fs");
let data = fs.readFileSync("words.json");
let words = JSON.parse(data);

console.log(words);
let server = app.listen(3000);

app.use(express.static("public"));

app.get("/s", sendFlower);
app.get("/add/:word/:score?", addWord);

function addWord(req, res) {
  console.log(req.data);
  let data = req.params;
  let word = data.word;
  let score = Number(data.score);
  let reply;
  if (!score) {
    reply = {
      msg: "Score is required."
    };
    res.send(reply);
  } else {
    words[word] = score;
    let data = JSON.stringify(words, null, 2);
    fs.writeFile("words.json", data, finished);
    function finished(err) {
      reply = {
        word: word,
        score: score,
        msg: "thanks."
      };
      res.send(reply);
    }
  }
}
app.get("/search/:word", searchWord);
app.get("/searchs/:flower", sendFlower);

function searchWord(req, res) {
  let word = req.params.word;
  let reply;
  if (words[word]) {
    reply = {
      status: "Found",
      word: word,
      score: words[word]
    };
  } else {
    reply = {
      status: "Not Found",
      word: word
    };
  }
  res.send(reply);
}

function sendFlower(req, res) {
  let data = req.params;
  console.log(data);
  res.send("Hey You" + data.flower);
}
app.get("/all", sendAll);

function sendAll(req, res) {
  res.send(words);
}
