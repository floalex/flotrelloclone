var Lists = Backbone.Collection.extend({
  model: List,
  url: "/lists",
  initialize: function() {
    this.on("add", App.addOne);
  },
});