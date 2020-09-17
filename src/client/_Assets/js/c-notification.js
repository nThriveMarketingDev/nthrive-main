$(".accept-close").click(function () {
  $("body").addClass("notification-close");
  $.cookie("visited", "yes", { expires: 7 });
});
$(document).ready(function () {
  var visited = $.cookie("visited");
  if (visited == "yes") {
    $("body").removeClass("notification-close").addClass("notification-close");
    return false;
  } else {
    $("body").removeClass("notification-close");
  }
});
