var Comments = Backbone.Collection.extend({
  url: '/comments',
  model: Comment,
});