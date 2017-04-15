var Card = Backbone.Model.extend({
  defaults: {
    title: "",
    comments_count: 0,
    due_date: "",
    subscribed: false,
    description: "",
    completed: false,
    archived: false,
  },
});