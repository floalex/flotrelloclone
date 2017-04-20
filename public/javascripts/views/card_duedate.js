var DueDateView = Backbone.View.extend({
  template: App.templates.card_due_date,
  events: {
    "click .modal-layer, .close": "removeModal",
    
    "click input[value='Save']": "saveDueDateCard",
    'click input[value="Remove"]': 'removeDueDateCard',
  },
  removeModal: function() {
    this.$el.find(".modal-layer").toggle();
    this.remove();
  },
  saveDueDateCard: function(e) {
    e.preventDefault();
    var date = this.$el.find("[name='date']").val();
    var time = this.$el.find("[name='time']").val();
    var due_date = moment(date + ' ' + time).format();

    this.model.trigger('save_due_date', due_date);
  },
  removeDueDateCard: function (e) {
    e.preventDefault();
    this.model.trigger('remove_due_date');
  },
  renderDateTime: function () {
    var dueDate = this.model.get('due_date');

    this.$el.find('.datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
      altField: 'input[name="date"]',
    });

    if (dueDate) {
      var formatedDueDate = moment(dueDate).format('MM/DD/YYYY');
      var time = moment(dueDate).format('HH:mm');
      this.$el.find('.datepicker').datepicker('setDate', formatedDueDate);
      this.$el.find('[type=time]').val(time);
    }
  },
  render: function() {
    this.$el.html(this.template());
    this.$el.appendTo($("#card-detail"));
    this.$el.find(".modal-layer").toggle();
  },
  initialize: function() {
    this.render();
    // this.listenTo(App, 'render_due_date_form', this.remove);
    this.renderDateTime();
  }
});