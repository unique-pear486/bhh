/* eslint-env browser */
/* globals $ Draggable Overlay Game */

// select ui elements
const ui = {};
ui.overlay = new Overlay($('#overlay')[0]);
ui.floors = {
  basement: $('#basement')[0],
  ground: $('#ground')[0],
  upper: $('#upper')[0],
};
ui.floorButtons = {
  basement: $('#floor-B')[0],
  ground: $('#floor-G')[0],
  upper: $('#floor-U')[0],
};
ui.hauntTracker = {
  marker: $('#tracker-marker')[0],
  hauntBtn: $('#haunt')[0],
};
ui.tileDeck = {
  $img: $('#tile-img'),
  $deck: $('#tile-deck'),
  $basement: $('#tile-basement'),
  $ground: $('#tile-ground'),
  $upper: $('#tile-upper'),
};
ui.eventDeck = $('#event-deck')[0];
ui.itemDeck = $('#item-deck')[0];
ui.omenDeck = $('#omen-deck')[0];
ui.dice = $('#dice')[0];
ui.search = $('#search')[0];
ui.me = {
  characterImg: $('#character > img')[0],
  speed: $('#speed-marker')[0],
  might: $('#might-marker')[0],
  sanity: $('#sanity-marker')[0],
  knowledge: $('#knowledge-marker')[0],
};
ui.hand = $('#hand')[0];

const characters = [
  {
    name: 'Brandon Jaspers',
    img: 'img/char_Brandon_Jaspers.png',
    token: 'img/BJ.png',
  },
  {
    name: 'Darrin Williams',
    img: 'img/char_Darrin_Williams.png',
    token: 'img/DFW.png',
  },
  {
    name: 'Father Reinhardt',
    img: 'img/char_Father_Reinhardt.png',
    token: 'img/FR.png',
  },
  {
    name: 'Heather Granville',
    img: 'img/char_Heather_Granville.png',
    token: 'img/HG.png',
  },
  {
    name: 'Madam Zostra',
    img: 'img/char_Madam_Zostra.png',
    token: 'img/MZ.png',
  },
  {
    name: 'Missy Debourde',
    img: 'img/char_Missy_Debourde.png',
    token: 'img/MD.png',
  },
  {
    name: 'Peter Akimoto',
    img: 'img/char_Peter_Akimoto.png',
    token: 'img/PA.png',
  },
  {
    name: 'Ox Bellows',
    img: 'img/char_Ox_Bellows.png',
    token: 'img/OB.png',
  },
  {
    name: 'Professor Longfellow',
    img: 'img/char_Professor_Longfellow.png',
    token: 'img/PL.png',
  },
  {
    name: 'Jenny LeClerc',
    img: 'img/char_Jenny_LeClerc.png',
    token: 'img/JL.png',
  },
  {
    name: 'Vivian Lopez',
    img: 'img/char_Vivian_Lopez.png',
    token: 'img/VL.png',
  },
  {
    name: 'Zoe Ingstrom',
    img: 'img/char_Zoe_Ingstrom.png',
    token: 'img/ZI.png',
  },
];

const game = new Game(ui, {
  tiles: { name: 'tiles', cards: [] },
  events: { name: 'events', cards: [] },
  items: { name: 'items', cards: [] },
  omens: { name: 'omens', cards: [] },
}, characters);

(function ($) {
  'use strict'

  $('.object').each(function () { new Draggable(this, { grid: [100, 100] }); });

}(jQuery));
