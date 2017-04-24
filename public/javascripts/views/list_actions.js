var ListActionsView = Backbone.View.extend({
  template: App.templates.list_actions,
  events: {
    "click .copy-list": "renderCopyListView",
    "click .move-list": "renderMoveListView",
    "click .list-subscribe": "toggleSubscribeList",
    
    "click .move-cards": "renderMoveCardsView",
    "click .archive-cards": "archiveCards",
    
    "click .delete-list": "archiveList",
  },
  renderCopyListView: function(e) {
    e.preventDefault();  
    e.stopImmediatePropagation();
    
    new CopyList({ model: this.model });
  },
  renderMoveListView: function(e) {
    e.preventDefault(); 
    e.stopImmediatePropagation();
    
    new MoveList({ model: this.model });
  },
  toggleSubscribeList: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.trigger("subscribeToggle");
    console.log(this.model.toJSON());
  },
  renderMoveCardsView: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    new MoveCardsView({ model: this.model });
  },
  archiveCards: function(e) {
    e.preventDefault();
    App.cards.trigger("delete_all_cards", this.model);
    App.cards.sync("update", App.cards);
    App.trigger("card_change");
  },
  archiveList: function(e) {
    e.preventDefault();
    if (this.model.cards.length > 0) { App.cards.trigger("delete_all_cards", this.model); }
    this.model.destroy();
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function () {
    this.render();
    this.delegateEvents();
    
    this.listenTo(this.model, "change", this.render);
  },
});