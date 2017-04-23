var NotificationsView = Backbone.View.extend({
  template: App.templates.notifications,
  attributes: {
    id: "notifications",
    class: "modal",
    style: "top:" + 45 + "px;right:" + 5 + "px;",
  },
  events: {
    "click .close, .modal-layer": "hideNotification",
  },
  hideNotification: function() {
    this.remove();
  },
  renderData: function() {
    var cards_data = this.collection.toJSON().filter(function(card) {
      return card.due_date;
    });

    this.$el.html(this.template({
      due_date_changes: cards_data,
    }));
  },
  render: function() {
    this.renderData();
    this.$el.appendTo(document.body);
  },
  initialize: function () {
    this.render();
    this.$el.find(".modal-layer").toggle();
    this.listenTo(this.collection, "sync" , this.renderData);
  },
});