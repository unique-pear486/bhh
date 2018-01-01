/* eslint-env browser */
/* globals jQuery Draggable */

(function ($) {
  'use strict'

  const floorsDiv = $('.floor');
  const basementDiv = $('#basement');
  const groundDiv = $('#ground');
  const upperDiv = $('#upper');
  const tileImg = $('#tile-img');

  // Define functions
  function selectBasement() {
    floorsDiv.addClass('hidd');
    basementDiv.removeClass('hidd');
  }
  function selectGround() {
    floorsDiv.addClass('hidd');
    groundDiv.removeClass('hidd');
  }
  function selectUpper() {
    floorsDiv.addClass('hidd');
    upperDiv.removeClass('hidd');
  }
  function setTileImg(source) {
    return () => {
      tileImg.attr('src', source);
    };
  }
  function getTile(options) {
    return () => {
      console.log('getTile', options);
      return false;
    };
  }

  $('.object').each(function () { new Draggable(this, { grid: [300, 300] }); });
  $('.floor').each(function () { new Draggable(this); });
  new Draggable($('#tracker-marker')[0], {
    grid: [58, 1],
    axis: 'x',
    limits: { xmin: 0, xmax: 12 },
  });
  $('.attr-marker').each(function () {
    new Draggable(this, {
      grid: [15, 1],
      axis: 'x',
      limits: { xmin: 0, xmax: 8 },
    });
  });

  // Set Tile deck behaviour
  $('#tile-deck')
    .hover(setTileImg('img/Tile_bgu.png'), setTileImg('img/Tile_.png'))
    .click(getTile({ upper: true, ground: true, basement: true }));
  $('#tile-upper')
    .hover(setTileImg('img/Tile_u.png'), setTileImg('img/Tile_bgu.png'))
    .click(getTile({ upper: true }));
  $('#tile-ground')
    .hover(setTileImg('img/Tile_g.png'), setTileImg('img/Tile_bgu.png'))
    .click(getTile({ ground: true }));
  $('#tile-basement')
    .hover(setTileImg('img/Tile_b.png'), setTileImg('img/Tile_bgu.png'))
    .click(getTile({ basement: true }));
}(jQuery));
