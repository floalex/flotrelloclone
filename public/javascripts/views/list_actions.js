var ListActionsView = Backbone.View.extend({
  template: App.templates.list_actions,
  events: {
    // 'click .copy-list': 'renderCopyListView',
    // 'click .move-list': 'renderMoveListView',
    "click .delete-list": "archiveList",
    "click .list-subscribe": "toggleSubscribeList",
    // 'click .archive-cards': 'archiveCards',
    // 'click .move-cards': 'renderMoveCardsView',
  },
  archiveList: function(e) {
    e.preventDefault();
    this.model.destroy();
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