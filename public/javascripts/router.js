var router = new (Backbone.Router.extend({
  routes: {
    "cards/:id": "cardView",
  },
  cardView: function(id) {
    App.cardView(Number(id));
    App.renderAllLists();
    App.renderNewListForm();
  },
  index: function() { 
    if ($("#card-detail")) { $("#card-detail").remove(); }
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