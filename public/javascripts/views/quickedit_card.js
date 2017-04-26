var top_offset = 40;

var quickCardView = Backbone.View.extend({
  template: App.templates.quickedit_card,
  events: {
    "click .window-overlay": "closeView",
    "submit form": "updateTitle",
    "click .actions .tag": CardView.prototype.renderTagSelection,
    "click .actions .move": CardView.prototype.openMoveCard,
    "click .actions .copy": CardView.prototype.openCopyCard,
    "click .actions .date": CardView.prototype.renderDateForm,
    "click .actions .archive": "deleteCard",
  },
  closeView: function() {
    this.remove();
    this.undelegateEvents();
    App.trigger("updateCardSort");
  },
  updateTitle: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var new_title = this.$el.find("textarea").val().trim();

    if (new_title !== this.model.get("title")) {
      this.model.set({ title: new_title });
      this.model.sync("update", this.model);
    }

    this.closeView();
  },
  deleteCard: function(e) {
    var result = confirm("Are you sure you want to delete this card?");
    if (result) {
      var last_pos = _.max(App.lists.get(this.model.get("list_id")).cards, function(card) {
                           return card.position;}).position;
      var this_position =  this.model.get("position");
      if (this.model.comments.length > 0) { 
        App.comments.trigger("delete_all_comments", this.model); 
      }
   
      this.model.destroy();
      this.closeView(e);
      
      // update position if card is not the last in the list
      if (this_position !== last_pos) {
        viewHelper.removeCardsPositions(App.lists.get(this.model.get("list_id")).cards, this.model);
        setTimeout(function() { App.cards.sync("update", App.cards) }, 900);
      }
    }
  },
  renderQuickTemplate: function() {
    var self = this;
    this.model.comments = App.comments.toJSON().filter(function(comment) {
      return comment.card_id === self.model.id;
    });
    
    this.$el.html(this.template(this.model.toJSON()));
  },
  render: function() {
    this.renderQuickTemplate();
    this.$el.appendTo($("#content"));
  },
  initialize: function () {
    this.render();
    this.listenTo(this.model, "change request", this.renderQuickTemplate);
  },
});