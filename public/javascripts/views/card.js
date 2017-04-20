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
    
    "click .date": "renderDate",
    
    "click .window-overlay, .card-container .close-card": "closeCard",
    
    "click .archive": "deleteCard",
  },
  updateCardTitle: function(e) {
    e.stopImmediatePropagation();
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("title")) {
     this.model.set({ title: value });
     this.model.sync("update", this.model);
    } 
  },
  renderDate: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + 40;
    var left = button_position.left - 20;

    // App.trigger('render_due_date_form');
    new DueDateView({
      model: this.model,
      attributes: {
        class: "modal card-due-date",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  closeCard: function(e) {
    e.preventDefault();
    this.remove();
    this.undelegateEvents();
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