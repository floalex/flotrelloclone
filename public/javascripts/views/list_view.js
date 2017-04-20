var ListView = Backbone.View.extend({
  attributes: function() {
    return {
      "class": "list-content",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.list_view,
  events: {
    "click .header-wrapper": "openEditName",
    "blur .title": "updateListName",
    "click .icon-ellipsis": "popupListActionsView",
    
    "click .card-preview": "openCardView",
    "click .card-preview .edit": "quickEditCard",
    
    "click .card-new a": "toggleCardForm",
    "click .modal-layer, .list-modal .pop-over-header-button-close": "closeListModal",
    "click .card-new input[type='submit']": "createCard",
    
    "drop": "dropList"
  },
  dropList: function(event, index) {
    App.trigger("updateListSort", [this.model, index]);
  },
  getCardId: function(e) {
    return Number($(e.target).closest("li").attr("data-id"));
  },
  openEditName: function(e) {
    $(e.target).hide().next().focus();
  },
  updateListName: function(e) {
    e.stopImmediatePropagation();
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("name")) {
      this.model.set({ name: value });
      this.model.sync("update", this.model);
    } 
    
    $(e.target).prev().show();
  },
  popupListActionsView: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var action_el = $('.list-content[data-id="' + this.model.id + '"] > .list-modal');
    
    new ListActionsView({
      model: this.model,
      el: action_el
    });
    
    action_el.toggleClass("show");
    $(e.target).closest(".list-content").find(".modal-layer").toggle();
  },
  openCardView: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var id = this.getCardId(e);

    router.navigate("cards/" + id, { trigger: true });
  },
  quickEditCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var id = this.getCardId(e);
    
    // new quickCardView({ model: App.cards.get(id) });
  },
  toggleCardForm: function(e) { 
    e.preventDefault(); 
    e.stopImmediatePropagation();
    this.$el.find(".card-new > a, form").toggle();
    this.$el.find("form textarea").focus();
  },
  closeListModal: function(e) {
    e.preventDefault();
    var $list = $(e.target).closest(".list-content");
    $list.find(".list-modal").toggleClass("show");
    $list.find(".modal-layer").toggle();
  },
  createCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $f = this.$("form");
    var $input = $f.find("textarea[name=card_title]");
    var title = $input.val().trim();
    if (title === "") { return; }
    
    var card_data = {
      "title": title,
      "list_title": this.model.toJSON().name,
      "position": this.model.cards.length,
    };    
    
    var self = this;
    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: card_data,
      success: function(json) {
        console.log("Added new card");
        App.cards.add(json);
        $f.find(".close").trigger("click");
        $input.val("");
        self.renderTemplate();
      }
    });
  },
  bindSortingEvents: function() {
    var self = this;
    $(".list-cards").sortable({
      connectWith: ".list-cards",
      placeholder: "ui-sortable-placeholder",
      forcePlaceholderSize: true,
      items: "> li",
      start: function(event, ui) {
        ui.item.toggleClass("tilted", true);
        ui.item.old_list = Number($(event.target).parents().attr("data-id"));
      },
      update: function(event, ui) {
        if (this === ui.item.parent()[0]) {
          ui.item.toggleClass("tilted", false); 
          var card_id = Number(ui.item.attr("data-id"));
          var old_list_id = ui.item.old_list;
          var new_position = ui.item.index();
          var new_list_id = Number($(event.target).parents().attr("data-id"));
          
          var old_list = App.lists.get(old_list_id).cards;
          var new_list = App.lists.get(new_list_id).cards;
          var new_list_name = App.lists.get(new_list_id).get("name");
          var card = App.cards.get(card_id);
          
          viewHelper.removeCardsPositions(old_list, card);
          
          card.set({
            list_id: new_list_id,
            list_title: new_list_name,
            position: new_position,
          });   
      
          viewHelper.insertCardsPositions(new_list, card); 

          App.cards.sync("update", App.cards);
          App.trigger("updateCardSort");
        }
      },
      stop: function(event, ui) {
        ui.item.toggleClass("tilted", false);
      },
    });
  },
  render: function() {
    this.renderTemplate();
    this.$el.appendTo($("#lists"));
  },
  renderTemplate: function() {
    // obtain the non-archived cards from its parent model id
    var self = this;
    this.model.cards = App.cards.toJSON().filter(function(card) {
      return card.list_id === self.model.id;
    }).sort(function(a, b) {
      return a.position - b.position;
    });
    
    var cardsData = this.model.cards.map(function(card) {
      card.labels = card.labels;
      return card;
    });
    
    this.$el.html(this.template({
      list: this.model.toJSON(),
      cards: cardsData 
    }));
  },
  initialize: function() {
    this.render();
    this.model.view = this;
    
    this.delegateEvents();
    this.bindSortingEvents();
    
    this.listenTo(this.model, "change", this.renderTemplate);
    this.listenTo(this.model, "remove", this.remove);
  }
});