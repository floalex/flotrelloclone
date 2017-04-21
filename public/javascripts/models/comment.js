var Comment = Backbone.Model.extend({
  updateComment: function(newupdate) {
    this.set("text", newupdate);
    this.sync("update", this);
  },
  // deleteRelatedActivities: function () {
  //   App.activities.trigger("delete_activity", App.activities.where({ comment_id: this.id }));
  // },
  initialize: function () {
    this.on("update_comment", this.updateComment);
    this.on("delete_comment", this.destroy);
    this.on("destroy_comment", this.deleteRelatedActivities);
  },
});