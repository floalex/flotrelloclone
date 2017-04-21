var path = require("path");
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/comments.json");

function getComments(){
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function writeComments(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

var Comments = {
  get: function() {
    return getComments();
  },
  set: function(data) {
    if (!data.id) { this.nextID(); }
    writeComments(data);
  },
  getLastID: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  },
  nextID: function() {
    return this.getLastID()+ 1;
  },
};

module.exports = Comments;