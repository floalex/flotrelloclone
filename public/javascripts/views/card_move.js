var MoveCardView = Backbone.View.extend({
  template: App.templates.card_move,
  events: {
    "click .modal-layer, .close": "removeForm",
    "change .list-name": "updateList",
    "change .card-position select": "updateCard",
    "submit form": "moveCard",
  },
  removeForm: function(e) {
    e.preventDefault();
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  updateList: function(e) {
    var list_id = Number($(e.target).find("option:selected").val());
    var new_list = App.lists.get(list_id).get("name");
    this.$el.find(".list-name p").text(new_list);
    
    if (list_id !== this.model.get("list_id")) {
      this.rerenderData(list_id);
    } else {
      this.renderInitialData();
    }
  },
  updateCard: function(e) {
    var position = $(e.target).find("option:selected").val();

    this.$el.find(".card-position p").text(position);
  },
  moveCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var from_list = App.lists.get(this.model.get("list_id")).cards;
    var list_name = $(e.target).find(".list-name p").text();
    var new_list_id = Number($(e.target).find("option:selected").val());
 
    var to_list = App.lists.get(new_list_id).cards;
    var new_position = Number(this.$el.find(".card-position p").text()) - 1;

    viewHelper.removeCardsPositions(from_list, this.model);
    
    this.model.set({
      list_id: new_list_id,
      list_title: list_name,
      position: new_position,
    }); 

    viewHelper.insertCardsPositions(to_list, this.model); 

    App.cards.sync("update", App.cards);
    App.trigger("updateCardSort");
    this.remove();
  },
  renderInitialData: function() {
    var current_position = this.model.get("position") + 1;
    var current_list_id = this.model.get("list_id");
    var current_list_name = App.lists.get(current_list_id).get("name");
    var cards = App.lists.get(current_list_id).cards;
    
    var lists_data = App.lists.toJSON().map(function(list) {
      var list_name = list.name;
      var list_id = list.id;
      var lists = { name: list_name, id: list_id };
      if (list.id === current_list_id) { 
        lists.current_list = current_list_name; 
        lists.current_id = current_list_id;
      }
      return lists;
    }); 
    
    var cards_positions = _.pluck(cards, "position").map(function(place) {
      var position = { position: place + 1 };
      if (place + 1 ===  current_position) { 
        position.current =  current_position; 
      }
      return position;
    });

    this.$el.html(this.template({
      current_list: current_list_name,
      current_position: current_position,
      lists: lists_data,
      positions: cards_positions
    }));
    
    this.$el.find(".modal-layer").toggle();
  },
  rerenderData: function(new_list_id) {
    var current_list_name = App.lists.get(new_list_id).get("name");
    
    var lists_data = App.lists.toJSON().map(function(list) {
      var list_name = list.name;
      var list_id = list.id;
      var lists = { name: list_name, id: list_id };
      if (list.id === new_list_id) { 
        lists.current_list = current_list_name; 
        lists.current_id = new_list_id;
      }
      return lists;
    }); 
    
    var cards = App.lists.get(new_list_id).cards;
    var cards_positions = _.pluck(cards, "position").map(function(place) {
      var position = { position: place + 1 };
      return position;
    });
    
    if (new_list_id !== this.model.list_id) {
      cards_positions.push({ position: cards_positions.length + 1 });
      var current_position = cards_positions.length;
    }
    
    this.$el.html(this.template({
      current_list: current_list_name,
      current_position: current_position,
      lists: lists_data,
      positions: cards_positions
    }));
    
    this.$el.find(".modal-layer").toggle();
  },
  render: function() {
    this.renderInitialData();
    this.$el.appendTo($(document.body));
    this.$el.find(".modal-layer").toggle();
  },
  initialize: function() {
    this.render();
  },
});