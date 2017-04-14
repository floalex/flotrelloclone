var ListView = Backbone.View.extend({
  attributes: function() {
    return {
      "class": "list-content",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.list_view,
  events: {
    "click .icon-ellipsis": "popupListActionsView",
    "click .card-new a": "toggleCardForm",
  },
  popupListActionsView: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    new ListActionsView({
      model: this.model,
      el: $('.list-content[data-id="' + this.model.id + '"] > .list-modal')
    });
  },
  toggleCardForm: function(e) { 
    e.preventDefault(); 
    e.stopImmediatePropagation();
    this.$el.find(".card-new > a, form").toggle();
    this.$el.find("form textarea").focus();
  },
  render: function() {
    // var cardsData = this.model.cards.toJSON().map(function(card) {
    //   card.labels = card.labels.toJSON();
    //   card.comments_count = card.comments.length;
    //   return card;
    // });
    this.$el.html(this.template({
      list: this.model.toJSON()
    }));
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