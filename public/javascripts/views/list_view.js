var ListView = Backbone.View.extend({
  attributes: function() {
    return {
      "class": "list-content",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.list_view,
  events: {
    "click .icon-ellipsis": "popupListActionsView",
    "click .card-new a": "toggleCardForm",
    "click .modal-layer, .list-modal .pop-over-header-button-close": "closeListModal",
    "blur .title": "updateListName",
    "click .card-new input[type='submit']": "createCard",
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
  closeListModal: function(e) {
    e.preventDefault();
    var $list = $(e.target).closest(".list-content");
    $list.find(".list-modal").toggleClass("show");
    $list.find(".modal-layer").toggle();
  },
  toggleCardForm: function(e) { 
    e.preventDefault(); 
    e.stopImmediatePropagation();
    this.$el.find(".card-new > a, form").toggle();
    this.$el.find("form textarea").focus();
  },
  updateListName: function(e) {
    var value = $(e.target).val().trim();
  
    if (value) {
     this.model.set({ name: value });
    } 
   
    // remember to sync to the json file
    this.model.sync("update", this.model);
  },
  createCard: function() {
  },
  render: function() {
    this.renderTemplate();
    this.$el.appendTo($("#lists"));
  },
  renderTemplate: function() {
    var cardsData = this.model.cards.map(function(card) {
      card.comments_count = card.comments_count;
      return card;
    });
    
    this.$el.html(this.template({
      list: this.model.toJSON(),
      cards: cardsData 
    }));
  },
  initialize: function() {
    // obtain the list's cards from its parent model id
    var self = this;
    this.model.cards = App.cards.toJSON().filter(function(card) {
      return card.list_id === self.model.id;
    });

    this.render();
    this.model.view = this;
    
    // this.listenTo(this.model, "change:subscribed", this.renderTemplate);
    this.listenTo(this.model, "remove", this.remove);
  }
});