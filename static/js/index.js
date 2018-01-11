/* eslint-env browser */
/* globals $ Overlay Game io */
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
[ui.eventDeck] = $('#event-deck');
[ui.itemDeck] = $('#item-deck');
[ui.omenDeck] = $('#omen-deck');
[ui.dice] = $('#dice');
[ui.search] = $('#search');
ui.me = {
  characterImg: $('#character > img')[0],
  speed: $('#speed-marker')[0],
  might: $('#might-marker')[0],
  sanity: $('#sanity-marker')[0],
  knowledge: $('#knowledge-marker')[0],
};
[ui.hand] = $('#hand');

// Set up the socket connection
const socket = io();
socket.on('error', error => console.log(error));
// clean up before closing the window
window.addEventListener(
  'beforeunload',
  socket.disconnect,
);

// DEBUG:
socket.on('echo', (msg) => {
  console.log(msg.data);
});
echoGame = () => {
  socket.emit('echo-game', { game: 'default' });
};

socket.emit('join', { game: 'default' });

const game = new Game('default', ui, {
  tiles: { name: 'tiles', cards: tiles },
  events: { name: 'events', cards: events },
  items: { name: 'items', cards: items },
  omens: { name: 'omens', cards: omens },
  pieces: { name: 'pieces', cards: pieces },
}, characters, socket);
