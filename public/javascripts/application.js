var App = {
  templates: JST,
  indexView: function() {
    this.renderAllLists();
    this.renderNewListForm();
    this.bindEvents();
  },
  renderAllLists: function() {
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
  bindEvents: function() {
    this.listenTo(this.lists, "add", this.addOneList);
  }
};

_.extend(App, Backbone.Events);