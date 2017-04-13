var ListView = Backbone.View.extend({
  attributes: function() {
    return {
      "class": "list-content",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.list_view,
  render: function() {
    // var cardsData = this.model.cards.toJSON().map(function(card) {
    //   card.labels = card.labels.toJSON();
    //   card.comments_count = card.comments.length;
    //   return card;
    // });
    this.$el.html(this.template(
      this.model.toJSON()
    ));
    this.$el.appendTo($("#lists"));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
    // obtain the list's cards from its parent model
    this.model.cards = new Cards(this.model.id);
    // console.log(this.model.cards.toJSON());
    this.listenTo(this.model, "remove", this.remove);
  }
});