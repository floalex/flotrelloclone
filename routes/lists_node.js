var path = require('path');
var fs = require("fs");
var file_path = path.resolve(path.dirname(__dirname), "data/lists.json");

function getLists() {
  return JSON.parse(fs.readFileSync(file_path, "utf8")).data;
}

function writeLists(data) {
  fs.writeFileSync(file_path, JSON.stringify(data), "utf8");
}

var Lists = {
  get: function() {
    return getLists();
  },
  set: function(data) {
    if(!data.id) { this.nextID(); }
    writeLists(data);
  },
  getLastID: function() {
    return JSON.parse(fs.readFileSync(file_path, "utf8")).last_id;
  },
  nextID: function() {
    return this.getLastID()+ 1;
  }
};

module.exports = Lists;