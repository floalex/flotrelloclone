var tagSelection = Backbone.View.extend({
  template: App.templates.tag_selection,
  events: {
    "click .modal-layer, .close": "removeModal",    
    
    "click span.card_label": "toggleLabel",
    "click .card_labels_popup": "preventClose"
  },
  removeModal: function() {
    this.undelegateEvents();  
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  preventClose: function() {
    return false;
  },
  render: function() {
    this.$el.html(this.template());
    this.$el.appendTo($("#card-detail"));
    this.$el.find(".modal-layer").toggle();
  },
  toggleLabel: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var tag = $(e.target).attr("data-color");
    this.model.toggleLabel(tag);
  },
  initialize: function() {
    this.render();
  },  
});