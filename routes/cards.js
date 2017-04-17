var _ = require('underscore');
var path = require('path');
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));

module.exports = function(router) {
  router.route('/cards/:id').get(function(req, res) {
    res.render("index", {
      lists: List.get(),
      cards: Card.get()
    });
  }).delete(function(req, res) {
    var cards = _(Card.get()).reject(function(item) {
      return item.id === Number(req.params.id);
    });
    
    Card.set({ last_id: Card.getLastID(), data: cards });
    
    res.status(200).end();
  }).put(function(req, res) {
    var card = req.body;
    var card_id = Number(req.params.id);
    var cards = Card.get();
    var current_card = _(cards).findWhere({ id: card_id });
    var card_list_id = current_card.list_id;
    
    _.extend(current_card, req.body);
    // need to set the id back otherwise the id will become string 
    current_card.id = card_id;
    current_card.list_id = card_list_id;
    Card.set({ last_id: Card.getLastID(), data: cards });
    res.json(card);
  });

  router.route('/lists/:id/cards').get(function(req, res) {
    var cards = _(Card.get()).filter(function(card) {
      return card.list_id === Number(req.params.id) && !card.archived;
    });

     res.json(cards);
  }).post(function(req, res) {
    var cards = Card.get();
    var card = req.body;

    card.id = Card.nextID();
    card.list_id = Number(req.params.id);
    cards.push(card);
    Card.set({ last_id: card.id, data: cards });
    res.json(card);
  });

};