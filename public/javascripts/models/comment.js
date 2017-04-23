var Comment = Backbone.Model.extend({
  initialize: function () {
    this.on("delete_comment", this.destroy);
  },
});