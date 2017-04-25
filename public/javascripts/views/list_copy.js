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
    var last_id = App.cards.max(function(card) { return card.id; }).toJSON().id;
    
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
          var copy_cards = [];
          cards.forEach(function(card, index) {
            var copy = { 
              "id": last_id + index + 1,
              "list_id": Number(json.id),
              "list_title": new_name,
              "title": card.title,
              "labels": card.labels,
              "position": card.position,
              "due_date": card.due_date,
              "subscribed": false,
              "description": card.description,
              };
            copy_cards.push(copy);
          });  
          
          setTimeout(function() { 
            App.cards.add(copy_cards);
            App.trigger("card_change");
            App.cards.sync("create", App.cards);
          }, 900);
          
          // for (var i = 1; i <= copy_cards.length; i++) {
          //   (function(index) {
          //     setTimeout(function() { 
          //       App.cards.create(copy_cards[index-1]);
          //       App.trigger("card_change");
          //     }, i * 700);
          //   })(i);
          // }
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