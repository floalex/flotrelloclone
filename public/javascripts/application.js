var App = {
  templates: JST,
  indexView: function() {
    this.renderHeaderView();
    
    this.index = new IndexView();
    this.renderAllLists();
    this.renderNewListForm();
    
    this.bindEvents();
  },
  renderHeaderView: function() {
    new HeaderView();
  },
  renderAllLists: function() {
    $("#lists").empty(); 
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
    App.trigger("closeSearchForm");
  },
  bindEvents: function() {
    this.listenTo(this.lists, "add", this.addOneList);
    this.listenTo(this.lists, "update", this.renderAllLists);
    
    this.on("updateListSort", this.lists.updateListSort.bind(this.lists));
    this.on("updateCardSort", this.renderAllLists);
  }
};

_.extend(App, Backbone.Events);

Handlebars.registerHelper("format_date_preview", function(date) {
  return moment(date).format("MMM DD");
});

Handlebars.registerHelper("format_date", function(date) {
  return viewHelper.formatDate(date);
});

Handlebars.registerHelper("int", function(value, options) { 
  return Number(value) + 1;
});