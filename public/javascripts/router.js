var router = new (Backbone.Router.extend({
  routes: {
    "cards/:id": "cardView",
  },
  cardView: function(id) {
    // have a nice background first
    App.indexView(); 
    // then put the card on top
    App.cardView(Number(id));
  },
  index: function() { 
    App.indexView(); 
  },
  initialize: function() {
    this.route(/^\/?$/, "index", this.index);
  }
}))();

Backbone.history.start({
  pushState: true
});

$(document).on("click", "a[href^='/']", function(e) {
  e.preventDefault();
  router.navigate($(e.currentTarget).attr("href").replace(/^\//, ""), { trigger: true });
});