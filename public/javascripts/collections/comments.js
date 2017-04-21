var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
  destroyAllComments: function(card) {
    _.invoke(this.where({ card_id: card.id }), "destroy");
  },
  initialize: function() {
    this.on("delete_all_comments", this.destroyAllComments);
  }
});