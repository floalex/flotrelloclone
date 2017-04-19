var Cards = Backbone.Collection.extend({
  model: Card,
  url: "/cards",
  comparator: "position",
  destroyAllCards: function(list) {
    _.invoke(this.where({ list_id: list.id }), "destroy");
  },
  initialize: function() {
    this.sort();
    this.on("delete_all_cards", this.destroyAllCards);
  }
});