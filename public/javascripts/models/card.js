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
  initialize: function() {
    this.on("subscribeToggle", this.toggleSubscribe);    
  }
});