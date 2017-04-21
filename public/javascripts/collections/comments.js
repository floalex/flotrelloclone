var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
  destroyAllComments: function(card) {
    var new_collection = App.comments.filter(function(comment) {
      return comment.get("card_id") !== card.id;
    });

    this.set(new_collection);
  },
  initialize: function() {
    this.on("delete_all_comments", this.destroyAllComments);
  }
});