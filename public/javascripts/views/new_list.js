var NewListView = Backbone.View.extend({
  el: $(".list-add"),
  template: App.templates.new_list,
  events: {
    "click input[type='submit']": "addNewList",
    "click": "showForm",
    "click a.close": "closeForm",
  },
  addNewList: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $f = this.$("form");
    var $input = $("form input[name=list_name]");
    var name = $input.val().trim();
    if (name === "") { return; }
    
    var name_data = {"name": name};
  
    $.ajax({
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: name_data,
      success: function(json) {
        App.lists.add(json);
        $f.find(".close").trigger("click");
      }
    });
  },
  showForm: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.$el.toggleClass("show", true);
    this.$el.find("input[type=text]").focus();
  },
  closeForm: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.$el.toggleClass("show", false);
    this.$el.find("[name=list_name]").val("");
  }, 
  render: function() {
    this.$el.html(this.template());
  },
  initialize: function() {
    this.render();
  },
});