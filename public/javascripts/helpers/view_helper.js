var viewHelper = {
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
  formatDate: function(date) {
    return moment(date).calendar(null, {
      lastDay : "[Yesterday at] LT",
      sameDay : "[Today at] LT",
      nextDay : "[Tomorrow at] LT",
      otherDay : "MMM DD [at] LT"
    });
  },
};