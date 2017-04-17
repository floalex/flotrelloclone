var CardView = Backbone.View.extend({
  attributes: function() {
    return {
      "id": "card-detail",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.card,
  events: {
    "click .window-overlay, .card-container .close-card": "closeCard",
  },
  closeCard: function(e) {
    e.preventDefault();
    this.undelegateEvents();
    this.remove();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($("#content"));
  },
  initialize: function() {
    this.render();
    this.delegateEvents();
  }
});