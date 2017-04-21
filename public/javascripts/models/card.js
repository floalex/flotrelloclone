var Card = Backbone.Model.extend({
  defaults: {
    title: "",
    comments_count: 0,
    subscribed: false,
    labels: [],
  },
  addComments: function() {
    var current_count = this.get("comments_count") || 0;
    current_count++;
    this.set("comments_count", current_count);
    this.sync("update", this);
  },
  reduceComments: function() {
    var current_count = this.get("comments_count");
    if (current_count > 0) { current_count--; }
    this.set("comments_count", current_count);
    this.sync("update", this);
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
    this.on({
      "subscribeToggle": this.toggleCardSubscribe, 
      "save_due_date": this.saveDueDate,
      "remove_due_date": this.removeDueDate,
      "addCommentsCount": this.addComments,
      "reduceCommentsCount": this.reduceComments,
    });
  }
});