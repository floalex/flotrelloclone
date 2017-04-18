var Lists = Backbone.Collection.extend({
  model: List,
  url: "/lists",
  comparator: "position",
  updateListSort: function([model, lists_position]) {
    this.remove(model);
    this.add(model, {at: lists_position});
    this.sync("update", this);
  },
  initialize: function() {
    this.on("updateListSort", this.updateListSort);
  }   
});