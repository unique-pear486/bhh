(function ($) {
  "use strict";
  var floorsDiv = $(".floor");
  var basementDiv = $("#basement");
  var groundDiv = $("#ground");
  var upperDiv = $("#upper");

  $(".object").draggable({grid:[300,300]});
  $(".floor").draggable();

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
