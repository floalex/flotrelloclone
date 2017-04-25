var CopyCardView = Backbone.View.extend({
  template: App.templates.card_copy,
  events: {
    "click .modal-layer, .close": "removeForm",
    "change .list-name": "updateList",
    "change .card-position select": "updateCard",
    "submit form": "copyCard",
  },
  removeForm: function(e) {
    e.preventDefault();
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  updateList: function(e) {
    var new_list =$(e.target).find("option:selected").val();

    this.$el.find(".list-name p").text(new_list);
    var list_id = App.lists.toJSON().find(function(list) {
      return list.name === new_list;
    }).id;
    
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
  copyCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $form = $(e.target);
    var copy_comments;
    
    var new_title = $form.find(".card-name textarea").val();
    var list_name = $form.find(".list-name p").text();
    var new_list_id = App.lists.toJSON().find(function(list) {
      return list.name === list_name;
    }).id;
    
    var to_list = App.lists.get(new_list_id).cards;
    var new_position = Number(this.$el.find(".card-position p").text()) - 1;
    
    var last_card_id = App.cards.max(function(card) { return card.id; }).toJSON().id;
    var last_comment_id = App.comments.max(function(comment) { return comment.id; }).toJSON().id;

    var new_card_info = {
      "id": last_card_id + 1,
      "position": new_position,
      "title": new_title,
      "list_id": new_list_id,
      "description": this.model.get("description"),
      "due_date": this.model.get("due_date"),
    };
    
    var checks = {
      labels: this.$el.find('[name="labels"]').is(":checked"),
      comments: this.$el.find('[name="comments"]').is(":checked"),
    };
    
    if (checks.labels) {
      new_card_info.labels = this.model.toJSON().labels;
    }
  
    if (checks.comments) {
      copy_comments = [];
      this.model.toJSON().comments.forEach(function(comment, index) {
        var new_comment = _.omit(comment, "id", "card_id");
        new_comment.id = last_comment_id + index + 1;
        new_comment.card_id = last_card_id + index + 1;
        copy_comments.push(new_comment);
      });
      new_card_info.comments = copy_comments;
    }
  
    var self = this;
    $.ajax({
      url: "/lists/" + new_list_id + "/cards",
      type: "POST",
      data: JSON.stringify(new_card_info),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(data) {
        var new_card = App.cards.add(data);

        viewHelper.insertCardsPositions(to_list, new_card);
        
        App.comments.add(new_card_info.comments);
   
        new_card.trigger("setCommentsCount");
        App.trigger("updateCardSort");
        setTimeout(function() {           
          App.cards.sync("update", App.cards); 
        }, 900);
      }
    });
    this.remove();
  },

  rerenderData: function(new_list_id) {
    var current_list_name = App.lists.get(new_list_id).get("name");
    
    var lists_data = App.lists.toJSON().map(function(list) {
      var list_name = App.lists.get(list.id).get("name");
      var lists = { name: list_name };
      if (list.id === new_list_id) { 
        lists.current_list = current_list_name; 
      }
      return lists;
    }); 
    
    var cards = App.lists.get(new_list_id).cards;
    var cards_positions = _.pluck(cards, "position").map(function(place) {
      var position = { position: place + 1 };
      return position;
    });
    
    cards_positions.push({ position: cards_positions.length + 1 });
    var current_position = cards_positions.length;
    
    this.$el.html(this.template({
      card: this.model.toJSON(),
      current_list: current_list_name,
      current_position: current_position,
      lists: lists_data,
      positions: cards_positions
    }));
    this.$el.find(".modal-layer").toggle();
  },
  renderInitialData: function() {
    var current_position = this.model.get("position") + 1;
    var current_list_id = this.model.get("list_id");
    var current_list_name = App.lists.get(current_list_id).get("name");
    var cards = App.lists.get(current_list_id).cards;
    
    var lists_data = App.lists.toJSON().map(function(list) {
      var list_name = App.lists.get(list.id).get("name");
      var lists = { name: list_name };
      if (list.id === current_list_id) { 
        lists.current_list = current_list_name; 
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
    
    cards_positions.push({ position: cards_positions.length + 1 });
    
    this.$el.html(this.template({
      card: this.model.toJSON(),
      current_list: current_list_name,
      current_position: current_position,
      lists: lists_data,
      positions: cards_positions
    }));
    this.$el.find(".modal-layer").toggle();
  },
  render: function() {
    this.renderInitialData();
    this.$el.appendTo($("#content"));
    this.$el.find(".modal-layer").toggle();
  },
  initialize: function () {
    this.render();
  },
})