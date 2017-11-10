(function ($) {
  "use strict";
  var floorsDiv = $(".floor");
  var basementDiv = $("#basement");
  var groundDiv = $("#ground");
  var upperDiv = $("#upper");

  $(".object").draggable({grid:[300,300]});
  $(".floor").draggable();
  $("#tracker-marker").draggable(
    {
      grid:[58,58],
      axis:"x",
      containment: "#tracker-marker-container"
    });

  function selectBasement() {
    floorsDiv.addClass("hidd");
    basementDiv.removeClass("hidd");
  }
  function selectGround() {
    floorsDiv.addClass("hidd");
    groundDiv.removeClass("hidd");
  }
  function selectUpper() {
    floorsDiv.addClass("hidd");
    upperDiv.removeClass("hidd");
  }
})(jQuery);
