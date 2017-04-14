var ListActionsView = Backbone.View.extend({
  template: App.templates.list_actions,
  events: {
    // 'click .copy-list': 'renderCopyListView',
    // 'click .move-list': 'renderMoveListView',
    "click .delete-list": 'archiveList',
    // 'click .archive-cards': 'archiveCards',
    // 'click .move-cards': 'renderMoveCardsView',
  },
  archiveList: function() {
    e.preventDefault();
    this.model.destroy();
  },
  render: function () {
    this.$el.toggleClass("show");
    this.$el.html(this.template());
  },
  initialize: function () {
    this.render();
  },
});