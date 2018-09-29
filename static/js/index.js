/* eslint-env browser */
/* globals $ Draggable Overlay Game io */
/* globals characters tiles events items omens pieces */

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

// Set up the socket connection
const socket = io();
socket.on('error', error => console.log(error));
// clean up before closing the window
window.addEventListener(
  'beforeunload',
  socket.disconnect,
);

const game = new Game(ui, {
  tiles: { name: 'tiles', cards: tiles },
  events: { name: 'events', cards: events },
  items: { name: 'items', cards: items },
  omens: { name: 'omens', cards: omens },
  pieces: { name: 'pieces', cards: pieces },
}, characters, socket);
