this["JST"] = this["JST"] || {};

this["JST"]["card_due_date"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-layer\"></div><div class=\"modal-header\"><span class=\"action-title\">Change Due Date</span><span class=\"close\"><i class=\"fa fa-times\"></i></span></div><form><fieldset><label><h2>Date</h2><input type=\"text\" name=\"date\"></label><!----><label><h2>Time</h2><input type=\"time\" name=\"time\" value=\"12:00\"></label></fieldset><div class=\"datepicker\"></div><div class=\"form-controls\"><input type=\"submit\" value=\"Save\"><input class=\"remove\" type=\"submit\" value=\"Remove\"></div></form>";
},"useData":true});

this["JST"]["card_editcomment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<form><textarea class=\"comment-input\">"
    + container.escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"text","hash":{},"data":data}) : helper)))
    + "</textarea><div class=\"form-controls\"><input type=\"submit\" value=\"Save\"><a class=\"close\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a></div></form>";
},"useData":true});

this["JST"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"header\"><span><i class=\"fa fa-list-alt fa-lg\"></i></span><textarea class=\"title formated\" rows=\"1\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</textarea></div><div class=\"detail-main\"><p class=\"u-inline-block\">in list "
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</p>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"description\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</div></div>";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h3>Labels</h3><ul class=\"labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"label\" style=\"background: "
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + ";\"></li>";
},"5":function(container,depth0,helpers,partials,data) {
    return "<div class=\"card-due-date\"><h3 class=\"card-detail-item-header\">Due Date</h3><span class=\"card-detail-badge\">"
    + container.escapeExpression((helpers.format_date || (depth0 && depth0.format_date) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"format_date","hash":{},"data":data}))
    + "</span></div>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h3>Description <a href=\"#\">Edit</a></h3><p>"
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"description","hash":{},"data":data}) : helper)))
    + "<p>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<span><i class=\"fa fa-align-left\"></i></span><a href=\"#\">Edit the description...</a>";
},"11":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<form action=\"/cards/"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "/comments\" method=\"post\"><textarea class=\"comment-input\" placeholder=\"Write a comment...\" name=\"comment\" autocomplete=\"off\"></textarea><input type=\"submit\" value=\"Send\"></form>";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<section class=\"comment\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><h3>Member Name</h3><p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</p><footer>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + " - <a class=\"edit\" href=\"#\">Edit</a> - <a class=\"delete\" href=\"#\">Delete</a></footer></section>";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    return "<section class=\"change-duedate\"><h3>Member Name</h3><p>changed the due date of this card to "
    + container.escapeExpression((helpers.format_date || (depth0 && depth0.format_date) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"format_date","hash":{},"data":data}))
    + "</p></section>";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    return "<span><i class=\"fa fa-check\"></i></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"window-overlay\"></div><div class=\"card-container\"><a class=\"close-card\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a>"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.card : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"details\"><section class=\"add-comment\"><div class=\"window-module-title\"><span><i class=\"fa fa-comment-o fa-lg\"></i></span><h1>Add Comment</h1></div>"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.card : depth0),{"name":"with","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</section><section class=\"activity\"><div class=\"window-module-title\"><span><i class=\"fa fa-list fa-lg\"></i></span><h1>Activity</h1></div><ul class=\"activities\"><li>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.card : depth0),{"name":"with","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li></ul></section></div><aside><section class=\"add\"><h1>Add</h1><ul><ul class=\"actions\"><li class=\"action tag\"><span><i class=\"fa fa-tag\"></i></span>Labels</li><li class=\"action date\"><span><i class=\"fa fa-calendar\"></i></span>Due Date</li></ul></section><section class=\"card-actions\"><h1>Actions</h1><ul class=\"actions\"><li class=\"action move\"><span><i class=\"fa fa-arrows\"></i></span>Move</li><li class=\"action copy\"><span><i class=\"fa fa-clone\"></i></span>Copy</li><li class=\"action subs\"><span><i class=\"fa fa-eye\"></i></span>Subscribe"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.card : depth0),{"name":"with","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li><li class=\"action archive\"><span><i class=\"fa fa-archive\"></i></span>Archive</li></ul></section></aside></div>";
},"useData":true});

this["JST"]["index"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"board-top\"><span class=\"board-header-btn-text\">Welcome Board</span><div class=\"menu\"><span class=\"icon-ellipsis\"><i class=\"fa fa-ellipsis-h\"></i></span><u>Show Menu</u></div></div><div class=\"container\"><ul id=\"lists\"></ul><div class=\"list-add\"></div></div>";
},"useData":true});

this["JST"]["list_actions"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span><i class=\"fa fa-check\"></i></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"pop-over-header\"><span class=\"pop-over-header-title\">List Actions</span><a href=\"#\" class=\"pop-over-header-button-close\"><i class=\"fa fa-times\"></i></a></div><ul class=\"pop-over-list\"><li><a class=\"js copy-list\" href=\"#\">Copy List…</a></li><li><a class=\"js move-list\" href=\"#\">Move List…</a></li><li><a class=\"js list-subscribe\" href=\"#\">Subscribe "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</a></li></ul><hr><ul class=\"pop-over-list\"><li><a class=\"js move-cards\" href=\"#\">Move All Cards in This List…</a></li><li><a class=\"js archive-cards\" href=\"#\">Archive All Cards in This List…</a></li></ul><hr><ul class=\"pop-over-list\"><li><a class=\"js delete-list\" href=\"#\">Archive This List</a></li></ul>";
},"useData":true});

this["JST"]["list_view"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"list-header\"><div class=\"header-wrapper\"></div><textarea class=\"title formated\" rows=\"1\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea><section class=\"list-icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<span class=\"icon-ellipsis\"><i class=\"fa fa-ellipsis-h\"></i></span></section></div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"subscribed\"><i class=\"fa fa-eye\"></i></span>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card-preview\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-position=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\"><span class=\"edit\"><i class=\"fa fa-pencil\"></i></span>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><ul class=\"badges\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments_count : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></li>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"label\" style=\"background:"
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + ";\"></li>";
},"8":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"subscribed\"><i class=\"fa fa-eye\"></i></span></li>";
},"10":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due-date\"><i class=\"fa fa-clock-o\"></i>"
    + container.escapeExpression((helpers.format_date_preview || (depth0 && depth0.format_date_preview) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"format_date_preview","hash":{},"data":data}))
    + "</li>";
},"12":function(container,depth0,helpers,partials,data) {
    return "<li><i class=\"fa fa-align-justify\"></i></li>";
},"14":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li><i class=\"fa fa-comment\"></i> "
    + container.escapeExpression(((helper = (helper = helpers.comments_count || (depth0 != null ? depth0.comments_count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"comments_count","hash":{},"data":data}) : helper)))
    + "</li>";
},"16":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"card-new\"><a href=\"#\">Add a card...</a><form action=\"/lists/"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "/cards\" method=\"post\"><textarea rows=\"4\" placeholder=\"Add a card title...\" name=\"card_title\" autocomplete=\"off\"></textarea><div class=\"form-controls\"><input type=\"submit\" value=\"Save\" /><a class=\"close\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a></div></form></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"list-modal\"></div><div class=\"modal-layer\"></div><div class=\"list-cards\">"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"with","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["move_list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.current : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "\" selected>"
    + alias4(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + " (current)</option>";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<option value=\""
    + alias3(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3((helpers["int"] || (depth0 && depth0["int"]) || alias2).call(alias1,(data && data.index),{"name":"int","hash":{},"data":data}))
    + "</option>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<h3>Move List<span class=\"close\"><i class=\"fa fa-times\"></i></span></h3><hr/><form><dl><dt><label><h5>Position</h5><p>"
    + container.escapeExpression(((helper = (helper = helpers.current || (depth0 != null ? depth0.current : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"current","hash":{},"data":data}) : helper)))
    + "</p></label></dt><dd><select>";
  stack1 = ((helper = (helper = helpers.lists || (depth0 != null ? depth0.lists : depth0)) != null ? helper : alias2),(options={"name":"lists","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.lists) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</select></dd></dl><input type=\"submit\" value=\"Move\"></form>";
},"useData":true});

this["JST"]["new_list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"/lists\" method=\"post\"><label><input type=\"text\" placeholder=\"Add a list...\" name=\"list_name\" autocomplete=\"off\"/></label><div class=\"form-controls\"><input type=\"submit\" value=\"Save\"/><a class=\"close\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a></div></form>";
},"useData":true});

this["JST"]["search"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li><h3><a href=\"/cards/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></h3><p>in <strong>"
    + alias4(((helper = (helper = helpers.list_title || (depth0 != null ? depth0.list_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"list_title","hash":{},"data":data}) : helper)))
    + "</strong></p></li>";
},"4":function(container,depth0,helpers,partials,data) {
    return "<p>We couldn't find any cards that matched your search</p>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Search Cards</h1><ul class=\"results\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "</ul><div class=\"modal-layer\"></div>";
},"useData":true});

this["JST"]["tag_selection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"modal-layer\"></div><div class=\"modal-header\"><span class=\"action-title\">Labels</span><span class=\"close\"><i class=\"fa fa-times\"></i></span></div><form><ul><li><span class=\"card_label label_green\" data-color=\"#61BD4F\"><li><span class=\"card_label label_yellow\" data-color=\"#F2D600\"><li><span class=\"card_label label_orange\" data-color=\"#FFAB4A\"><li><span class=\"card_label label_red\" data-color=\"#EB5A46\"><li><span class=\"card_label label_purple\" data-color=\"#C377E0\"><li><span class=\"card_label label_blue\" data-color=\"#0079BF\"></ul></form>";
},"useData":true});