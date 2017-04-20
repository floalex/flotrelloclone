var DueDateView = Backbone.View.extend({
  template: App.templates.card_due_date,
  events: {
    "click .modal-layer, .close": "removeModal",
    
    "click input[value='Save']": "saveDueDate",
    "click input[value='Remove']": "removeDueDate",
  },
  removeModal: function() {
    this.undelegateEvents();  
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  saveDueDate: function(e) {
    e.preventDefault();
    var date = this.$el.find("[name='date']").val();
    var time = this.$el.find("[name='time']").val();
    var due_date = moment(date + " " + time).format();
    
    this.model.trigger("save_due_date", due_date);
  },
  removeDueDate: function(e) {
    e.preventDefault();
    this.model.trigger("remove_due_date");
  },
  renderDateTime: function() {
    this.$el.find(".datepicker").datepicker({
      altField: 'input[name="date"]',
    });
    
    var due_date = this.model.get("due_date");

    if (due_date) {
      var formated_date = moment(due_date).format("MM/DD/YYYY");
      var time = moment(due_date).format("HH:mm");
      this.$el.find(".datepicker").datepicker("setDate", formated_date);
      this.$el.find("[type=time]").val(time);
    }
  },
  render: function() {
    this.$el.html(this.template());
    this.$el.appendTo($("#card-detail"));
    this.$el.find(".modal-layer").toggle();
  },
  initialize: function() {
    this.render();
    this.renderDateTime();
  }
});