var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/cards.json");

function getCards(){
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function writeCards(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

var Cards = {
  get: function() {
    return getCards();
  },
  set: function(data) {
    if (!data.id) { this.nextID(); }
    writeCards(data);
  },
  getLastID: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  },
  nextID: function() {
    return this.getLastID() + 1;
  },
};

module.exports = Cards;