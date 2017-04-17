var IndexView = Backbone.View.extend({
  template: App.templates.index,
  el: $("#content"),
  render: function() {
    this.$el.html(this.template());
  },
  initialize: function() {
    this.render();
  },
});