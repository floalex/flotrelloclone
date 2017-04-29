var didScroll;
var lastScrollright = 0;
var content_width = $("#content").outerWidth();

$(window).scroll(function(event){ didScroll = true; });
  setInterval(function() {
  if (didScroll) {
    pageScrolled();
    didScroll = false;
  }
}, 150);

function pageScrolled() {
  var horizontal = $("#content").scrollLeft();
  if (Math.abs(lastScrollright - horizontal) <= content_width) { return; }
  
  // if (horizontal > lastScrollright && horizontal > content_width) {
  //   $('header').removeClass('navbar-down').addClass('navbar-up');
  // } else if (horizontal + $(window).width() < $(document).width()) {
  //   $('header').removeClass('navbar-up').addClass('navbar-down');
  // }
  lastScrollright = horizontal;
  console.log(lastScrollright);
}