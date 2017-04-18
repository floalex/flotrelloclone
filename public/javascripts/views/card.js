var CardView = Backbone.View.extend({
  attributes: function() {
    return {
      "id": "card-detail",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.card,
  events: {
    "blur .title": "updateCardTitle",
    
    "click .window-overlay, .card-container .close-card": "closeCard",
    
    "click .archive": "deleteCard",
  },
  updateCardTitle: function(e) {
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("title")) {
     this.model.set({ title: value });
     this.model.sync("update", this.model);
    } 
  },
  closeCard: function(e) {
    e.preventDefault();
    this.undelegateEvents();
    this.remove();
    history.back();
  },
  deleteCard: function(e) {
    this.model.destroy();
    this.closeCard(e);
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo($("#content"));
  },
  initialize: function() {
    this.render();
    this.delegateEvents();
    
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "remove", this.remove);
  }
});