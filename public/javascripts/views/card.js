var top_offset = 40;
var left_offset = 20;

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
    "blur .title": "updateCardTitle",
    
    // ----- Add actions -----
    "click .tag": "renderTagSelection",
    "click .date": "renderDateForm",
    
    // ----- Other actions -----
    "click .subs": "toggleSubscribeCard",
    "click .archive": "deleteCard",
  },
  closeCard: function(e) {
    e.preventDefault();
    this.remove();
    this.undelegateEvents();
    router.navigate("/", { trigger: true });
  },
  toggleSubscribeCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.trigger("subscribeToggle");
    console.log(this.model.toJSON());
  },
  updateCardTitle: function(e) {
    e.stopImmediatePropagation();
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("title")) {
     this.model.set({ title: value });
     this.model.sync("update", this.model);
    } 
  },
  renderTagSelection: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new tagSelection({ 
      model: this.model,
      attributes: {
        class: "modal tags",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  renderDateForm: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new DueDateView({
      model: this.model,
      attributes: {
        class: "modal card-due-date",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
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
    
    this.listenTo(this.model, "change request", this.render);
    this.listenTo(this.model, "remove", this.remove);
  }
});