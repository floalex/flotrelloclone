var List = Backbone.Model.extend({
  defaults: {
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