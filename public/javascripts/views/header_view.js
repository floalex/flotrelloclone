var HeaderView = Backbone.View.extend({
  el: $("header"),
  events: {
    // ----- Card Search -----
    "focusin #search-form input": "focusSearchForm",
    "click #search-form .close": "closeSearchForm",
    "input #search-form input": "searchCards",
    
    // ----- Notification View -----
    "click .icon-notification": "renderNotifications",
  },
  focusSearchForm: function(e) {
    $(e.currentTarget).addClass("focus");
  },
  closeSearchForm: function() {
    var field = $('#search-form').find("input");

    field.removeClass("focus").val("");
    App.trigger("remove_search_modal");
  },
  searchCards: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var input = $(e.target).val().trim().toLowerCase();
    var cards;
    
    if (input) {
      cards = App.cards.filter(function(card) {
        return card.get("title").toLowerCase().indexOf(input) !== -1;
      });

      // prevnet multiple search modal appending to the body
      App.trigger("remove_search_modal");
      new SearchView({ collection: new Cards(cards) });
    } 
  },
  renderNotifications: function(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    // console.log("buidling");
    new NotificationsView({ collection: App.cards });
  },
  initialize: function() {
    this.listenTo(App, "closeSearchForm", this.closeSearchForm);
  },
});