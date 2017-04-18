var App = {
  templates: JST,
  indexView: function() {
    this.index = new IndexView();
    this.renderAllLists();
    this.renderNewListForm();
    this.bindEvents();
  },
  renderAllLists: function() {
    if ($("#lists")) { $("#lists").empty(); }
    this.lists.each(this.addOneList);
  },
  addOneList: function(list) {
    new ListView({
      model: list
    });
  },
  renderNewListForm: function() {
    new NewListView();
  },
  cardView: function(id) {
    new CardView({ model: this.cards.get(id) });
  },
  bindEvents: function() {
    this.listenTo(this.lists, "add", this.addOneList);
    this.listenTo(this.lists, "update", this.renderAllLists);
    this.on("updateListSort", this.lists.updateListSort.bind(this.lists));
  }
};

_.extend(App, Backbone.Events);