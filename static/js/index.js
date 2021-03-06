/* eslint-env browser */
/* globals $ Overlay Game io */
/* globals characters tiles events items omens pieces */

// select ui elements
let game;
const ui = {};
ui.overlay = new Overlay($('#overlay')[0]);
[ui.helpDiv] = $('#help');
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
  icon: $('#character-icon')[0],
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
const echoGame = () => {
  socket.emit('echo-game', { game: 'default' });
};
socket.on('get-games', (msg) => {
  const ul = document.createElement('ul');
  ul.classList.add('game-select');

  const createGame = () => {
    const name = prompt('Choose a name for this game:');
    if (name) {
      socket.emit('join', { game: name });
      // start a new game
      game = new Game(name, ui, {
        tiles: { name: 'tiles', cards: tiles },
        events: { name: 'events', cards: events },
        items: { name: 'items', cards: items },
        omens: { name: 'omens', cards: omens },
        pieces: { name: 'pieces', cards: pieces },
      }, characters, socket);
    }
  };
  const deleteGame = (e) => {
    const { name } = e.target.parentElement.dataset;
    const conf = confirm(`Are you sure you want to delete ${name}?`);
    if (conf) {
      socket.emit('delete-game', { game: name });
    }
  };
  const joinGame = (e) => {
    const { name } = e.target.parentElement.dataset;
    socket.emit('join', { game: name });
    // start a new game
    game = new Game(name, ui, {
      tiles: { name: 'tiles', cards: tiles },
      events: { name: 'events', cards: events },
      items: { name: 'items', cards: items },
      omens: { name: 'omens', cards: omens },
      pieces: { name: 'pieces', cards: pieces },
    }, characters, socket);
  };

  // For each existing game, add them to the list
  msg.games.forEach((g) => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const del = document.createElement('span');
    name.appendChild(document.createTextNode(g));
    name.addEventListener('click', joinGame);
    del.innerHTML = 'Delete';
    del.classList.add('delete');
    del.addEventListener('click', deleteGame);
    li.appendChild(name);
    li.appendChild(del);
    li.dataset.name = g;
    ul.appendChild(li);
  });

  const newGame = document.createElement('li');
  newGame.innerHTML = '<span class="new">New</span>';
  newGame.addEventListener('click', createGame);
  ul.appendChild(newGame);

  ui.overlay.display('Choose game...', ul, '', false);

  // help button
  const help = document.createElement('div');
  const helpImg = new Image();
  help.id = 'help-btn';
  helpImg.src = '/static/img/help.png';
  helpImg.style.width = '80px';
  help.appendChild(helpImg);
  ui.overlay.el.appendChild(help);
  help.addEventListener('click', () => ui.helpDiv.classList.remove('hidd'));
});

const showGameSelect = () => {
  // remove the loading div (there to ensure images have finished loading
  // before the game starts
  $('#loader').remove();
  // Show game-select screen
  socket.emit('get-games');
};

let timeoutID;
const allowGameSelect = () => {
  // remove event listeners
  window.removeEventListener('load', allowGameSelect);
  window.clearTimeout(timeoutID);

  // add game select button
  const startMenu = ui.overlay.text.firstElementChild;
  startMenu.removeChild(startMenu.lastElementChild);
  const gameSelect = document.createElement('div');
  gameSelect.classList.add('traitor-btn');
  gameSelect.textContent = 'Start';
  gameSelect.addEventListener('click', showGameSelect);
  startMenu.appendChild(gameSelect);
};

// Allow the game select window after all items are loaded or after 5 sec
window.addEventListener('load', allowGameSelect);
timeoutID = window.setTimeout(allowGameSelect, 5000);

// Set up the help screen
ui.overlay.text.firstElementChild.firstElementChild.addEventListener('click', () => {
  ui.helpDiv.classList.remove('hidd');
});
ui.helpDiv.addEventListener('click', () => {
  ui.helpDiv.classList.add('hidd');
});
const bindHelpKeys = (e) => {
  // if the h-key is pressed and there is no other overlay, show help
  if (e.key === 'h' && !ui.overlay.isShowing) {
    ui.helpDiv.classList.remove('hidd');
  }
  if (e.key === 'Escape') {
    ui.helpDiv.classList.add('hidd');
  }
};
window.addEventListener('keypress', bindHelpKeys);
