this["JST"] = this["JST"] || {};

this["JST"]["card"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
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

  return "<div class=\"list-header\"><textarea class=\"title formated\" rows=\"1\">"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</textarea><section class=\"list-icons\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<span class=\"icon-ellipsis\"><i class=\"fa fa-ellipsis-h\"></i></span></section></div>";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"subscribed\"><i class=\"fa fa-eye\"></i></span>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"list-cards\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.cards : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<li class=\"card-preview\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-position=\""
    + alias4(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"position","hash":{},"data":data}) : helper)))
    + "\"><span class=\"edit\"><i class=\"fa fa-pencil\"></i></span>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.labels : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<p>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p><ul class=\"badges\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.subscribed : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.due_date : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments_count : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul></li>";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"labels\">"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.labels : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li class=\"label\" style=\"background:"
    + container.escapeExpression(((helper = (helper = helpers.color || (depth0 != null ? depth0.color : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"color","hash":{},"data":data}) : helper)))
    + ";\"></li>";
},"9":function(container,depth0,helpers,partials,data) {
    return "<li><span class=\"subscribed\"><i class=\"fa fa-eye\"></i></span></li>";
},"11":function(container,depth0,helpers,partials,data) {
    return "<li class=\"due-date\"><i class=\"fa fa-clock-o\"></i>"
    + container.escapeExpression((helpers.format_date_preview || (depth0 && depth0.format_date_preview) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.due_date : depth0),{"name":"format_date_preview","hash":{},"data":data}))
    + "</li>";
},"13":function(container,depth0,helpers,partials,data) {
    return "<li><i class=\"fa fa-align-justify\"></i></li>";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<li><i class=\"fa fa-comment\"></i> "
    + container.escapeExpression(((helper = (helper = helpers.comments_count || (depth0 != null ? depth0.comments_count : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"comments_count","hash":{},"data":data}) : helper)))
    + "</li>";
},"17":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"card-new\"><a href=\"#\">Add a card...</a><form action=\"/lists/:"
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "/cards\" method=\"post\"><textarea rows=\"4\" placeholder=\"Add a card title...\" name=\"card_title\"></textarea><div class=\"form-controls\"><input type=\"submit\" value=\"Save\" /><a class=\"close\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a></div></form></div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<div class=\"list-modal\"></div><div class=\"modal-layer\"></div>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.cards : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"with","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["new_list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form action=\"/lists\" method=\"post\"><label><input type=\"text\" placeholder=\"Add a list...\" name=\"list_name\" autocomplete=\"off\"/></label><div class=\"form-controls\"><input type=\"submit\" value=\"Save\"/><a class=\"close\" href=\"#\"><i class=\"fa fa-times fa-2x\"></i></a></div></form>";
},"useData":true});