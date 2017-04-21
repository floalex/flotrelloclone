var path = require('path');
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var Comment = require(path.resolve(path.dirname(__dirname), "routes/comments_node"));

module.exports = function(router) {
  router.route("/").get(function(req, res, next) {
    res.render('index', { 
      lists: List.get(),
      cards: Card.get(),
      comments: Comment.get()
    });
  });
  
};
