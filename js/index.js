(function ($) {
  "use strict";
  var floorsDiv = $(".floor");
  var basementDiv = $("#basement");
  var groundDiv = $("#ground");
  var upperDiv = $("#upper");
  var tileImg = $("#tile-img");

  $(".object").draggable({grid:[300,300]});
  $(".floor").draggable();
  $("#tracker-marker").draggable(
    {
      grid:[58,58],
      axis:"x",
      containment: "#tracker-marker-container"
    });
  $(".attr-marker").draggable(
    {
     start: transformStart,
     drag: transformDrag
    });

  // Set Tile deck behaviour
  $("#tile-deck")
    .hover(setTileImg("img/Tile_bgu.png"), setTileImg("img/Tile_.png"))
    .click(getTile({upper: true, ground: true, basement: true}));
  $("#tile-upper")
    .hover(setTileImg("img/Tile_u.png"), setTileImg("img/Tile_bgu.png"))
    .click(getTile({upper: true}));
  $("#tile-ground")
    .hover(setTileImg("img/Tile_g.png"), setTileImg("img/Tile_bgu.png"))
    .click(getTile({ground: true}));
  $("#tile-basement")
    .hover(setTileImg("img/Tile_b.png"), setTileImg("img/Tile_bgu.png"))
    .click(getTile({basement: true}));

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
  function setTileImg(source) {
    return function() {
      tileImg.attr('src', source);
    };
  }
  function getTile(options) {
    return function() {
      console.log("getTile", options);
      return false;
    };
  }

  var mInv;
  var oPos;
  function transformStart(event, ui) {
    var matrix = window.getComputedStyle($(this).parent()[0], null).transform;
    var m = new DOMMatrix(matrix);
    mInv = m.inverse();
    var left = ui.position.left;
    var top = ui.position.top;
    oPos = m.transformPoint({x: left, y: top});
  }
  function transformDrag(event, ui) {
    var left = ui.position.left - ui.originalPosition.left;
    var top = ui.position.top - ui.originalPosition.top;
    var p = mInv.transformPoint({x: left, y: top});
    ui.position.left = p.x + ui.originalPosition.left;
    ui.position.top = p.y + ui.originalPosition.top;
  }
})(jQuery);
