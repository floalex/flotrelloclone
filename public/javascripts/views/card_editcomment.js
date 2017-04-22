var EditCommentView = Backbone.View.extend({
  template: App.templates.card_editcomment,
  events: {
    "click .close": "removeEditComment",
    "submit form": "updateComment",
  },
  updateComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var new_body = this.$el.find("textarea").val().trim();

    if (new_body && new_body !== this.model.get("text")) {
      this.model.set("text", new_body);
      this.model.sync("update", this.model);
      this.$el.find(".close").trigger("click");
    }
  },
  removeEditComment: function(e) {
    e.preventDefault();
    App.trigger("comment_change");
    this.remove();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function() {
    this.render();
  },
});