var _ = require('underscore');
var path = require("path");
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));
var Card = require(path.resolve(path.dirname(__dirname), "routes/cards_node"));

module.exports = function(router) {
  router.route("/lists").get(function(req, res) {
    res.json(List.get());
  }).post(function(req, res) {
    // var list = req.body;
    // var lists = List.get();
    
    // list.id = List.nextID();
    // lists.push(list);
    // List.set({ last_id: list.id, data: lists });
    // res.json(list);
    
    var list = req.body;
    var lists = List.get();
    
    var only_list = {};
    
    for (var key in list) {
      if (key !== "cards") {
        only_list[key] = list[key];
      }
    }
    
    list.id = only_list.id = Number(req.body.id);
 
    if (req.body.cards) {
      var cards = Card.get();
      var count = 0;
      
      for (var i = 0; i < req.body.cards.length; i++) {
        var card = req.body.cards[i];
        count += 1;

        cards.push(card);
      }
      Card.set({ last_id: Card.getLastID() + count, data: cards });
    }

    lists.push(only_list);
    
    List.set({ last_id: list.id, data: lists });
    res.json(only_list);
  }).put(function(req, res) {  
    var new_lists = req.body;

    List.set({ last_id: List.getLastID(), data: new_lists });
    res.json(new_lists);
  });
  
  router.route("/lists/:id").get(function(req, res) {
    res.json(List.get());
  }).put(function(req, res) {
    var lists = List.get();
    var list_id = Number(req.params.id);
    var current_list = _(lists).findWhere({ id: list_id });
    
    _.extend(current_list, req.body);
    // need to set the id back otherwise the id will become string 
    current_list.id = list_id;
    List.set({ last_id: List.getLastID(), data: lists });
    res.json(current_list);
  }).delete(function(req, res) {
    var lists = _(List.get()).reject(function(item) {
      // need to pass params.id to successfully delete the item in JSON
      return item.id === Number(req.params.id);
    });
    
    var cards = _(Card.get()).reject(function(item) {
      return item.list_id === Number(req.params.id);
    });
    
    Card.set({ last_id: Card.getLastID(), data: cards });
  
    List.set({ last_id: List.getLastID(), data: lists });
    res.status(200).end();
  });
};