var Card = Backbone.Model.extend({
  defaults: {
    title: "",
    subscribed: false,
    labels: [],
    description: ""
  },
  setCommentsCount: function() {
    var self = this;
    var current_count = App.comments.toJSON().filter(function(comment) {
      return comment.card_id === self.id;
    }).length;
    this.set("comments_count", current_count);
  },
  toggleCardSubscribe: function() {
    this.set("subscribed", !this.get("subscribed"));

    this.sync("update", this);
  },
  saveDueDate: function(newDueDate) {
    this.set("due_date", newDueDate);
    this.sync("update", this);
  },
  removeDueDate: function() {
    this.save({"due_date": ""});
  },
  toggleLabel: function(color) {
    var labels = this.get("labels");

    if (_(labels).findWhere({ color: color })) {
      labels = _(labels).reject({ color: color });
    } else {
      labels.push({"color": color});
    }

    this.set("labels", labels); 
    this.sync("update", this);
  },
  initialize: function() {
    this.setCommentsCount();
    this.on({
      "subscribeToggle": this.toggleCardSubscribe, 
      "save_due_date": this.saveDueDate,
      "remove_due_date": this.removeDueDate,
      "setCommentsCount": this.setCommentsCount,
    });
  }
});