var Comment = Backbone.Model.extend({
  // deleteRelatedActivities: function () {
  //   App.activities.trigger("delete_activity", App.activities.where({ comment_id: this.id }));
  // },
  initialize: function () {
    this.on("delete_comment", this.destroy);
    this.on("destroy_comment", this.deleteRelatedActivities);
  },
});