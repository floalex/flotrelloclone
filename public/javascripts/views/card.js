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
    "click .add-comment input[type='submit']": "createComment",
    "click .activity .edit": "editComment",
    "click .activity .delete": "deleteComment",
    
    // ----- Add actions -----
    "click .tag": "renderTagSelection",
    "click .date": "renderDateForm",
    
    // ----- Other actions -----
    "click .subs": "toggleSubscribeCard",
    "click .archive": "deleteCard",
  },
  getCommentID: function(e) {
    return $(e.target).closest("li").find(".comment").attr("data-id");
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
      url: $f.attr("action"),
      type: $f.attr("method"),
      data: comment_data,      
      success: function(json) {
        App.comments.add(json);
        $input.val("");
        self.renderCommentsAndTemplate();
        self.stopListening();
        setTimeout(function() { 
          self.model.trigger("addCommentsCount"); 
        }, 600);
      }
    });
  },
  editComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    console.log($(e.target));
  },
  deleteComment: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var result = confirm("Are you sure you want to delete this comment?");
    if (result) {
      var comment_id = this.getCommentID(e);
  
      App.comments.get(comment_id).trigger("delete_comment");
      this.renderCommentsAndTemplate();
      this.stopListening();
      var self = this;
      setTimeout(function() { 
        self.model.trigger("reduceCommentsCount"); 
      }, 900);
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
  toggleSubscribeCard: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    this.model.trigger("subscribeToggle");
    console.log(this.model.toJSON());
  },
  deleteCard: function(e) {
    var result = confirm("Are you sure you want to delete this card?");
    if (result) {
      App.comments.trigger("delete_all_comments", this.model);
      this.model.destroy();
      this.closeCard(e);
    }
  },
  renderCommentsAndTemplate: function() {
    var self = this;
    this.model.comments = App.comments.toJSON().filter(function(comment) {
      return comment.card_id === self.model.id;
    });
    
    this.$el.html(this.template({
      card: this.model.toJSON(),
      comments: this.model.comments
    }));
  },
  render: function() {
    this.renderCommentsAndTemplate();
    this.$el.appendTo($("#content"));
  },
  initialize: function() {
    this.render();
    this.delegateEvents();
    
    this.listenTo(this.model, "change request", this.renderCommentsAndTemplate);
    this.listenTo(this.model, "remove", this.remove);
  }
});