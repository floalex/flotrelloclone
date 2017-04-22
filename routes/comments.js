var _ = require('underscore');
var path = require('path');
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var Comment = require(path.resolve(path.dirname(__dirname), "routes/comments_node"));

module.exports = function(router) {
  router.route("/comments").get(function(req, res) {
    res.json(Comment.get());
  }).put(function(req, res) {  
    var new_comments = req.body;

    Comment.set({ last_id: Comment.getLastID(), data: new_comments });
    res.json(new_comments);
  });
  
  router.route('/comments/:id').get(function(req, res) {
    res.render("index", {
      comments: Comment.get(),
      cards: Card.get()
    });
  }).delete(function(req, res) {
    var comments = _(Comment.get()).reject(function(item) {
      return item.id === Number(req.params.id);
    });
    
    Comment.set({ last_id: Comment.getLastID(), data: comments });
    
    res.status(200).end();
  }).put(function(req, res) {
    var comment = req.body;
    var comment_id = Number(req.params.id);
    var comments = Comment.get();
    var current_comment = _(comments).findWhere({ id: comment_id });
    
    _.extend(current_comment, req.body);
 
    current_comment.id = comment_id;
    if (req.body.card_id) { 
      comment.card_id = Number(req.body.card_id);
    }
    Comment.set({ last_id: Comment.getLastID(), data: comments });
    res.json(comment);
  });

  router.route('/cards/:id/comments').get(function(req, res) {
    var comments = _(Comment.get()).filter(function(comment) {
      return comment.list_id === Number(req.params.id);
    });

     res.json(comments);
  }).post(function(req, res) {
    var comments = Comment.get();
    var comment = req.body;

    comment.id = Comment.nextID();
    comment.card_id = Number(req.params.id);

    comments.push(comment);
    Comment.set({ last_id: comment.id, data: comments });
    res.json(comment);
  });

};