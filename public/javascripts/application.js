var App = {
  templates: JST,
  indexView: function() {
    this.index = new IndexView();
    this.renderAllLists();
    this.renderNewListForm();
    this.bindEvents();
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
  },
  updateCardSort: function([old_list_id, new_list_id, card_id, new_position]) {
    var old_list = this.lists.get(old_list_id).cards;
    var new_list = this.lists.get(new_list_id).cards;
    var new_list_name = this.lists.get(new_list_id).get("name");
    var card = this.cards.get(card_id);
    
    // this.removeCardsPositions(old_list, card);
    
    // card.set({
    //   list_id: new_list_id,
    //   list_title: new_list_name,
    //   position: new_position,
    // });   

    // this.insertCardsPositions(new_list, card); 
    console.log("what");
    // this.cards.sync("update", this.cards);
    this.renderAllLists();
  },
  removeCardsPositions: function(old_list, model) {
    var target = model.get("position");
    old_list.forEach(function(item) {
      var card_item = App.cards.get(item.id);
      var original_position = card_item.get("position");
      
      if (card_item !== model && original_position > target) {
        card_item.set({position: (original_position - 1)});
      }
    });
  },
  insertCardsPositions: function(new_list, model) {
    var target = model.get("position");
    new_list.forEach(function(item) {
      var card_item = App.cards.get(item.id);
      var original_position = card_item.get("position");
      
      if (card_item !== model && original_position >= target) {
        card_item.set({position: (original_position + 1)});
      }
    });
  },
  bindEvents: function() {
    this.listenTo(this.lists, "add", this.addOneList);
    this.listenTo(this.lists, "update", this.renderAllLists);
    
    this.on("updateListSort", this.lists.updateListSort.bind(this.lists));
    this.on("updateCardSort", this.renderAllLists);
  }
};

_.extend(App, Backbone.Events);

Handlebars.registerHelper("int", function(value, options) { 
  return Number(value) + 1;
});