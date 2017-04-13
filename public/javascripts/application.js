var App = {
  templates: JST,
  indexView: function() {
    this.renderAllLists();
    this.renderNewListForm();
    this.bindEvents();
  },
  renderAllLists: function() {
    this.lists.each(this.addOne);
  },
  addOne: function(list) {
    new ListView({
      model: list
    });
  },
  renderNewListForm: function() {
    new NewListView();
  },
  bindEvents: function() {
    _.extend(this, Backbone.Events);
  },
};