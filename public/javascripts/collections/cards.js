var Cards = Backbone.Collection.extend({
  model: Card,
  url: "/cards",
  comparator: "position",
  destroyAllCards: function(list) {
    var new_collection = App.cards.filter(function(card) {
      return card.get("list_id") !== list.id;
    });

    this.set(new_collection);
  },
  initialize: function() {
    this.sort();
    this.on("delete_all_cards", this.destroyAllCards);
  }
});