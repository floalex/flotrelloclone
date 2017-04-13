var _ = require('underscore');
var path = require("path");
var List = require(path.resolve(path.dirname(__dirname), "routes/lists_node"));

module.exports = function(router) {
  router.route("/lists").get(function(req, res) {
    res.json(List.get());
  }).post(function(req, res) {
    var list = req.body;
    var lists = List.get();
    
    list.id = List.nextID();
    lists.push(list);
    List.set({ last_id: list.id, data: lists });
    res.json(list);
  });
  
  router.route("/lists/:id").put(function(req, res) {
    var lists = List.get();
    var list_id = Number(req.params.id);
    var current_list = _(lists).findWhere({ id: list_id });
    
    _.extend(current_list, req.body);
    // need to set the id back otherwise the id will become string 
    current_list.id = list_id;
    List.set({ last_id: List.getLastID(), data: lists });
    res.json(current_list);
  });
  
  router.delete("/lists/:id", function(req, res) {
    var lists = _(List.get()).reject(function(item) {
      // need to pass params.id to successfully delete the item in JSON
      return item.id === Number(req.params.id);
    });
    
    List.set({ last_id: List.getLastID(), data: lists });
    res.states(200).end();
  });
};