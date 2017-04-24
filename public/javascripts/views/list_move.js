var MoveList = Backbone.View.extend({
  template: App.templates.list_move,
  attributes: {
    class: "move",
  },
  events: {
    "click input[type='submit']": "moveList",
    "change select": "updatePositionSelection",
  },
  moveList: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var new_position = Number(this.$el.find("p").text()) - 1;
    var old_position = App.lists.indexOf(this.model);

    if (new_position !== old_position) {
      App.lists.updateListSort([this.model, new_position]);
    }
    
    App.trigger("list_actions_remove", e);
  },
  updatePositionSelection: function() {
    var position = Number($("option:selected").val());
    this.$el.find("p").text(position);
    return false;
  },
  render: function() {
    var current_position = App.lists.indexOf(this.model) + 1;

    var positions_data = App.lists.pluck("id").map(function(id_place) {
      id_place = App.lists.indexOf(App.lists.get(id_place)) + 1;
      var position = { position: id_place };
      if (id_place === current_position) { 
        position.current = current_position; 
      }
      return position;
    }); 

    this.$el.html(this.template({ 
      positions: positions_data, 
      current_position: current_position 
    }));
    
    $('.list-content[data-id="' + this.model.id + '"] > .list-modal').html(this.$el);
  },
  initialize: function() {
    this.render();
    this.listenTo(App, "move_list_view", this.remove);
  },
});