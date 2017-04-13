var path = require('path');
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var Labels = require(path.resolve(path.dirname(__dirname), "routes/labels_node"));

module.exports = function(router) {
  router.get('/', function(req, res, next) {
    res.render('index', { 
      lists: List.get(),
      cards: Card.get()
    });
  });
  
};
