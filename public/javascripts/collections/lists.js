var Lists = Backbone.Collection.extend({
  model: List,
  url: "/lists",
  copyList: function(original_model, new_name) {
    var new_list = {
      "name": new_name,
    };

    $.ajax({
      url: "/board/lists",
      type: "POST",
      data: new_list,
      success: function(json) {
        App.lists.add(json);
      }
    });
  },
  updateListSort: function([model, lists_position]) {
    this.remove(model);
    this.add(model, {at: lists_position});
    this.sync("update", this);
  },
  initialize: function() {
    this.on("updateListSort", this.updateListSort);
  }   
});