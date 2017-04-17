var Lists = Backbone.Collection.extend({
  model: List,
  url: "/lists",
  comparator: "list_sort_number",
  initialize: function() {
    
  },
});