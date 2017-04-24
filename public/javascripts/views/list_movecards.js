var MoveCardsView = Backbone.View.extend({
  template: App.templates.list_movecards,
  attributes: {
    class: "move-all-cards",
  },
  events: {
    "click li + li": "moveCards",
  },
  moveCards: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var move_cards = this.model.cards;
    var to_list_id = Number($(e.currentTarget).attr("data-id"));
    
    var cards_newlist =  App.lists.get(to_list_id).cards;
    var new_positions = _(cards_newlist).pluck("position");
 
    var new_positions_last = _.isEmpty(new_positions) ? 0 : _.max(new_positions) + 1;

    move_cards.forEach(function(card, index) {
      var original_card = App.cards.get(card.id);
      card.position = new_positions_last ? Number(new_positions_last) + index : new_positions_last;
      card.list_id = to_list_id;
      original_card.set({"position": card.position, "list_id": to_list_id});
    });
    App.cards.sync("update", App.cards);
    App.trigger("updateCardSort");
  },
  render: function () {
    var lists = App.lists.toJSON().filter(function(list) {
      return list.id !== this.model.id;
    }.bind(this));

    this.$el.html(this.template({ 
      current: this.model.get("name"), 
      lists: lists 
    }));
    $('.list-content[data-id="' + this.model.id + '"] > .list-modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, "move_listcards_view", this.remove);
  },
});