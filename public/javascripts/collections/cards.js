var Cards = Backbone.Collection.extend({
  model: Card,
  url: "/cards",
  comparator: "sort_number",
  sync: function() {
    this.sync("update", this);
  },
  destroyAllCards: function(list) {
    _.invoke(this.where({ list_id: list.id }), "destroy");
  },
  initialize: function() {
    this.on("delete_all_cards", this.destroyAllCards);
  }
});