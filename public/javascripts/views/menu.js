var MenuView = Backbone.View.extend({
  el: $("#menu"),
  template: App.templates.activities,
  events: {
    "click .close": "closeView",
    "click .card-name": "showCard",
  },
  closeView: function () {
    this.$el.animate({ right: -350 }, 200);
  },
  showCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var path = $(e.target).attr("href");

    router.navigate(path, { trigger: true });
    this.closeView();
  },
  render: function () {
    var comments_data = App.comments.toJSON().map(function(comment) {
      comment.card_title = App.cards.get(comment.card_id).get("title");
      return comment;
    });
    
    this.$el.html(this.template({
      comments: comments_data
    }));
  },
  initialize: function () {
    this.render();
    this.listenTo(App.comments, "update", this.render);
  },
});