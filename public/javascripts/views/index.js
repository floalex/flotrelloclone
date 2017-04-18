var IndexView = Backbone.View.extend({
  template: App.templates.index,
  el: $("#content"),
  render: function() {
    this.$el.html(this.template());
  },
  bindSortingEvents: function() {
    $("#lists").sortable({
      items: ".list-content",
      placeholder: "ui-sortable-placeholder",
      forcePlaceholderSize: true,
      tolerance: "pointer",
      handle: ".header-wrapper", 
      delay: 150,
      start: function(event, ui) {
        ui.item.toggleClass("tilted", true);
        ui.placeholder.height(ui.item.find(".list-content").height());
      },    
      update: function(event, ui) {
        ui.item.trigger("drop", ui.item.index());
        ui.item.toggleClass("tilted", false);
      },
      stop: function(event, ui) {
        ui.item.toggleClass("tilted", false);
      },
    });
  },
  initialize: function() {
    this.render();
    this.bindSortingEvents();
  },
});