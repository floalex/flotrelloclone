var _ = require('underscore');
var path = require('path');
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));
var Comment = require(path.resolve(path.dirname(__dirname), "routes/comments_node"));

module.exports = function(router) {
  router.route("/cards").get(function(req, res) {
    res.json(Card.get());
  }).put(function(req, res) {  
    var new_cards = req.body;
    
    Card.set({ last_id: Card.getLastID(), data: new_cards });
    res.json(new_cards);
  }).post(function(req, res) {
    var cards = Card.get();
    var card = req.body;

    card.id = Card.nextID();
    cards.push(card);
    Card.set({ last_id: card.id, data: cards });
    res.json(card);
  });
  
  router.route('/cards/:id').get(function(req, res) {
    res.render("index", {
      lists: List.get(),
      cards: Card.get(),
      comments: Comment.get()
    });
  }).delete(function(req, res) {
    var cards = _(Card.get()).reject(function(item) {
      return item.id === Number(req.params.id);
    });
    
    var comments = _(Comment.get()).reject(function(item) {
      return item.card_id === Number(req.params.id);
    });
    
    Comment.set({ last_id: Comment.getLastID(), data: comments });
    Card.set({ last_id: Card.getLastID(), data: cards });
    
    res.status(200).end();
  }).put(function(req, res) {
    var card = req.body;
    var card_id = Number(req.params.id);
    var cards = Card.get();
    var current_card = _(cards).findWhere({ id: card_id });
    
    _.extend(current_card, req.body);
 
    current_card.id = card_id;
    if (req.body.list_id) { 
      card.list_id = Number(req.body.list_id);
    }
    if (req.body.position) { 
      card.position = Number(req.body.position); 
    }
    Card.set({ last_id: Card.getLastID(), data: cards });
    res.json(card);
  }).patch(function(req, res) {
    var card = req.body;
    var card_id = Number(req.params.id);
    var cards = Card.get();
    var current_card = _(cards).findWhere({ id: card_id });
    
    _.extend(current_card, req.body);
 
    current_card.id = card_id;
    card.list_id = Number(req.body.list_id);
    card.position = Number(req.body.position); 

    Card.set({ last_id: Card.getLastID(), data: cards });
    res.json(card);
  });

  router.route('/lists/:id/cards').get(function(req, res) {
    var cards = _(Card.get()).filter(function(card) {
      return card.list_id === Number(req.params.id);
    });

     res.json(cards);
  }).post(function(req, res) {
    var cards = Card.get();
    var card = req.body;

    card.id = Card.nextID();
    card.list_id = Number(req.params.id);
    card.position = Number(req.body.position);
    cards.push(card);
    Card.set({ last_id: card.id, data: cards });
    res.json(card);
  });

};