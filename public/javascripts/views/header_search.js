var SearchView = Backbone.View.extend({
  template: App.templates.search,
  attributes: {
    class: "search-results",
  },
  events: {
    "click .modal-layer": "removeSearch",
    "click a": "renderCardView",
  },
  removeSearch: function () {
    App.trigger("closeSearchForm");
  },
  renderCardView: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    router.navigate($(e.target).attr("href"), { trigger: true });
  },
  render: function() {
    this.$el.html(this.template({ cards: this.collection.toJSON() }));
    this.$el.appendTo(document.body);
  },
  initialize: function() {
    this.render();
    this.$el.find(".modal-layer").toggle();
    
    this.listenTo(App, "remove_search_modal", this.remove);
  },
});