var ListActionsView = Backbone.View.extend({
  template: App.templates.list_actions,
  events: {
    // "click .copy-list": "renderCopyListView",
    // "click .move-list": "renderMoveListView",
    "click .list-subscribe": "toggleSubscribeList",
    
    // "click .move-cards': 'renderMoveCardsView",
    "click .archive-cards": "archiveCards",
    
    "click .delete-list": "archiveList",
  },
  archiveList: function(e) {
    e.preventDefault();
    this.model.destroy();
    this.archiveCards(e);
  },
  archiveCards: function(e) {
    e.preventDefault();
    App.cards.trigger("delete_all_cards", this.model);
  },
  toggleSubscribeList: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
 
    console.log(this.model.toJSON());
    this.model.trigger("subscribeToggle");
    $(e.delegateTarget).prev().find(".subscribed").toggle();
  },
  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
  },
  initialize: function () {
    this.render();
    this.delegateEvents();
    this.listenTo(this.model, "change", this.render);
  },
});