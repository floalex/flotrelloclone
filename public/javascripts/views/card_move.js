var MoveCardView = Backbone.View.extend({
  template: App.templates.card_move,
  events: {
    "click .modal-layer, .close": "removeForm",
    // 'change .list-name select': view_helpers.updateListNameAndPositions,
    'change .card-position select': 'updatePosition',
    'submit form': 'updateCardListAndPosition',
  },
  removeForm: function(e) {
    e.preventDefault();
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  updatePosition: function (e) {
    var position = $(e.target).find('option:selected').val();

    this.$el.find('.card-position p').text(position);
  },
  updateCardListAndPosition: function (e) {
    e.preventDefault();
    var cardsSource = App.lists.get(this.model.get('list_id')).get('cards');
    var listId = Number($(e.target).find('.list-name select option:selected').attr('data-id'));
    var cardsDest = App.lists.get(listId).get('cards');
    var position = $(e.target).find('.card-position select option:selected').val() - 1;

    cardsSource.remove(this.model);
    cardsSource.trigger('move_card_remove', this.model);

    this.model.set({ position: position, list_id: listId });

    cardsDest.add(this.model);
    cardsDest.trigger('move_card_add', this.model);

    cardsSource.trigger('move_card');
    cardsDest.trigger('move_card');
  },
  render: function() {
    var current_position = this.model.get("position") + 1;
    var current_list_id = this.model.get("list_id");
    var current_list_name = App.lists.get(current_list_id).get("name");
    var cards = App.cards.where({ list_id: this.model.get("list_id") });
    
    console.log(cards);
    var lists_data = App.lists.toJSON().map(function(list) {
      var list_name = App.lists.get(list.id).get("name");
      var lists = { name: list_name };
      if (list.id === current_list_id) { 
        lists.current = current_list_name; 
      }
      return lists;
    }); 
   
    var cards_positions = 

    this.$el.html(this.template({
      current_list: current_list_name,
      current_position: current_position,
      lists: lists_data,
      // positions: 
    }));
    this.$el.appendTo($("#card-detail"));
    this.$el.find(".modal-layer").toggle();
  },
  initialize: function () {
    this.render();
    this.listenTo(App, 'render_move_card_form', this.remove);
  },
});