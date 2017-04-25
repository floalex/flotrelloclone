var top_offset = 40;
var left_offset = 20;

var CardView = Backbone.View.extend({
  attributes: function() {
    return {
      "id": "card-detail",
      "data-id": Number(this.model.id)      
    };
  },
  template: App.templates.card,
  events: {
    "click .window-overlay, .card-container .close-card": "closeCard",
    "blur .title": "updateCardTitle",
    
    // ----- Card activities -----
    "click .description .quiet-button, .description-form .close": "toggleDescription",
    "click .description-form input[type='submit']": "submitDescription",
    
    "click .add-comment input[type='submit']": "createComment",
    "click .activity .edit": "editComment",
    "click .activity .delete": "deleteComment",
    
    // ----- Add actions -----
    "click .tag": "renderTagSelection",
    "click .date": "renderDateForm",
    
    // ----- Other actions -----
    "click .move": "openMoveCard",
    "click .copy": "openCopyCard",
    "click .subs": "toggleSubscribeCard",
    "click .archive": "deleteCard",
  },
  getCommentID: function(e) {
    return $(e.target).closest(".comment").attr("data-id");
  },
  closeCard: function(e) {
    e.preventDefault();
    this.remove();
    this.undelegateEvents();
    router.navigate("/", { trigger: true });
  },
  updateCardTitle: function(e) {
    e.stopImmediatePropagation();
    var value = $(e.target).val().trim();
  
    if (value && value != this.model.get("title")) {
     this.model.set({ title: value });
     this.model.sync("update", this.model);
    } 
  },
  toggleDescription: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.$el.find(".description, .description-form").toggle();
  },
  submitDescription: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var desc_body = $(".description-form").find("textarea").val().trim();
 
    if (desc_body === this.model.get("description")) {
      this.toggleDescription();
    } else {
      this.model.set({ description: desc_body });
      this.model.sync("update", this.model);
    }
  },
  createComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var $f = this.$("form");
    var $input = $f.find("textarea[name=comment]");
    var comment = $input.val().trim();
    if (comment === "") { return; }
    
    var comment_data = {
      "text": comment,
      "date": moment().format("MMM Do, h:mm")
    };    
    
    var self = this;
    $.ajax({
      url: "/cards/" + self.model.id + "/comments",
      type: "POST",
      data: comment_data,      
      success: function(comment_data) {
        App.comments.add(comment_data);
        $input.val("");
        self.model.trigger("setCommentsCount"); 
      }
    });
  },
  editComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var comment_id = this.getCommentID(e);
  
    var comment_element = $(e.target).closest(".comment");
    comment_element.find("p").remove();
    $(e.target).closest("footer").remove();
    new EditCommentView({
      el: comment_element,
      model: App.comments.get(comment_id),
    });
  },
  deleteComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
 
    var result = confirm("Are you sure you want to delete this comment?");
    if (result) {
      var comment_id = this.getCommentID(e);
  
      App.comments.get(comment_id).trigger("delete_comment");
      this.model.trigger("setCommentsCount"); 
    }
  },
  renderTagSelection: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new tagSelection({ 
      model: this.model,
      attributes: {
        class: "modal tags",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  renderDateForm: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new DueDateView({
      model: this.model,
      attributes: {
        class: "modal card-due-date",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  openMoveCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new MoveCardView({
      model: this.model,
      attributes: {
        class: "modal move-card",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  openCopyCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var button_position = $(e.target).offset();
    var top = button_position.top + top_offset;
    var left = button_position.left - left_offset;
    
    new CopyCardView({
      model: this.model,
      attributes: {
        class: "modal copy-card",
        style: "top:" + top + "px;left:" + left + "px;",
      }
    });
  },
  toggleSubscribeCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.trigger("subscribeToggle");
    console.log(this.model.toJSON());
  },
  deleteCard: function(e) {
    var result = confirm("Are you sure you want to delete this card?");
    if (result) {
      if (this.model.get("comments").length > 0) { 
        App.comments.trigger("delete_all_comments", this.model); 
      }
      this.model.destroy();
      this.closeCard(e);
      
      // update position
      viewHelper.removeCardsPositions(App.lists.get(this.model.get("list_id")).cards, this.model);
      setTimeout(function() { App.cards.sync("update", App.cards) }, 900);
    }
  },
  renderCommentsAndTemplate: function() {
    var self = this;
    var card_comments = App.comments.toJSON().filter(function(comment) {
      return comment.card_id === self.model.id;
    });
    
    this.model.set("comments", card_comments);
    this.$el.html(this.template({
      card: this.model.toJSON(),
      comments: card_comments
    }));
  },
  render: function() {
    this.renderCommentsAndTemplate();
    this.$el.appendTo($("#content"));
  },
  initialize: function() {
    this.render();
    this.delegateEvents();
    
    this.listenTo(App, "comment_change", this.renderCommentsAndTemplate);
    this.listenTo(this.model, "change request", this.renderCommentsAndTemplate);
    this.listenTo(this.model, "remove", this.remove);
  }
});