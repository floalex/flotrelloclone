var ListView = Backbone.View.extend({
  attributes: function() {
    return {
      "class": "list-content",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.list_view,
  events: {
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
    console.log(index);
    App.trigger("updateListSort", [this.model, index]);
  },
  getCardId: function(e) {
    return Number($(e.target).closest("li").attr("data-id"));
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
  updateListName: function(e) {
    e.stopImmediatePropagation();
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("name")) {
      this.model.set({ name: value });
      this.model.sync("update", this.model);
    } 
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
  render: function() {
    this.renderTemplate();
    this.$el.appendTo($("#lists"));
  },
  renderTemplate: function() {
    // obtain the non-archived cards from its parent model id
    var self = this;
    this.model.cards = App.cards.toJSON().filter(function(card) {
      return card.list_id === self.model.id && !card.archived;
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

    this.listenTo(this.model, "remove", this.remove);
  }
});