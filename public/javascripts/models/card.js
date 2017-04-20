var Card = Backbone.Model.extend({
  defaults: {
    title: "",
    comments_count: 0,
    subscribed: false,
  },
  toggleSubscribe: function() {
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
  initialize: function() {
    this.on({
      "subscribeToggle": this.toggleSubscribe, 
      "save_due_date": this.saveDueDate,
      "remove_due_date": this.removeDueDate,
    });
  }
});