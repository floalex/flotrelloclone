var CopyList = Backbone.View.extend({
  attributes: {
    class: "copylist",
  },
  template: App.templates.list_copy,
  events: {
    "submit form": "copyList",
  },
  copyList: function(e) {
    e.preventDefault();
    var new_name = this.$el.find("textarea").val().trim();
    
    if (new_name) { 
      var new_list = {
        "name": new_name,
      };
     
      var self = this;
      $.ajax({
        url: "/lists",
        type: "POST",
        data: new_list,
        success: function(json) {
          App.lists.add(json);
          var cards = self.model.cards;
          var copy_cards = cards.map(function(card) {
            var copy = { 
              "list_id": Number(json.id),
              "list_title": new_name,
              "title": card.title,
              "labels": card.labels,
              "position": card.position,
              "due_date": card.due_date,
              "description": card.description
              };
            return copy;
          });
          
          for (var i = 1; i <= copy_cards.length; i++) {
            (function(index) {
              setTimeout(function() { 
                App.cards.create(copy_cards[index-1]);
                App.trigger("card_change");
              }, i * 700);
            })(i);
          }
        }
      });
    }
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    $('.list-content[data-id="' + this.model.id + '"] > .list-modal').html(this.$el);
  },
  initialize: function () {
    this.render();
    this.listenTo(App, "copy_list_view", this.remove);
  },
});