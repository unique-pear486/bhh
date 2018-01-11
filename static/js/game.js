/* eslint-env browser */
/* globals Draggable Fuse */
'use strict';


function generateRandID() {
  // Generates a random alphanumeric string
  const length = 10;
  return Math.random().toString(36).substr(2, length);
}


class Deck {
  constructor(game, { name, cards }) {
    this.game = game;
    this.name = name;
    this.cards = cards;
    this.discards = [];
    this.nextImg = new Image();
    this.chooseNextCard();
  }
  drawCard() {
    // make a new image and display it
    const i = new Image();
    i.src = this.next.filename;
    this.game.overlay.display(this.next.name, i, '', true);
    // put it in the hand
    this.game.hand.addCard(this.next);
    // Remove it from the deck
    this.removeCard();
    // Refresh the next card
    this.chooseNextCard();
  }
  removeCard(card) {
    if (card == null) {
      // if card is null or undefined remove the .next card
      this.cards.splice(this.nextIndex, 1);
    } else {
      // else, find the given card and remove it
      const index = this.cards.findIndex(c => (c.name === card.name));
      this.cards.splice(index, 1);
    }
  }
  chooseNextCard() {
    if (this.cards.length === 0) {
      this.cards = this.discards;
      this.discards = [];
    }
    this.nextIndex = (Math.floor(Math.random() * this.cards.length));
    this.next = this.cards[this.nextIndex];
    this.nextImg.src = this.next.filename;
  }
}

class TileDeck extends Deck {
  constructor(game, deck) {
    super(game, deck);
    this.upper = this.cards.filter(card => (card.upper === 1));
    this.ground = this.cards.filter(card => (card.ground === 1));
    this.basement = this.cards.filter(card => (card.basement === 1));
  }
  drawCard({ restrictFloor }) {
    // keep cycling cards until we find a matching card
    if (restrictFloor) {
      // If we're out of cards, say so, and exit
      if (this[restrictFloor].length === 0) {
        this.game.overlay.display(`Out of ${restrictFloor} tiles`, null, '', true);
        return;
      }
      while (this.next[restrictFloor] !== 1) {
        this.chooseNextCard();
      }
    }
    // make a new image and display it
    const i = new Image();
    i.src = this.next.filename;
    this.game.overlay.display(this.next.name, i, '', true);
    // put it on the selected floor
    this.game.floor.selected.addTile(this.next);
    // remove next card from deck
    this.removeCard();

    // Refresh the next card
    this.chooseNextCard();
  }
  removeCard(card) {
    if (card == null) {
      // if card is null or undefined remove the .next card
      this.cards.splice(this.nextIndex, 1);
    } else {
      // else, find the given card and remove it
      const index = this.cards.findIndex(c => (c.name === card.name));
      this.cards.splice(index, 1);
    }
    // Regenerate the upper, ground and basement decks
    this.upper = this.cards.filter(c => (c.upper === 1));
    this.ground = this.cards.filter(c => (c.ground === 1));
    this.basement = this.cards.filter(c => (c.basement === 1));
  }
}


class Floor {
  constructor(game, name, el) {
    this.game = game;
    this.name = name;
    this.el = el;
    this.drag = new Draggable(el);
    this.tiles = [];
    this.showTile = (img) => {
      // Match the tile based on clicked image
      const tile = this.tiles.find(t => (t.id === img.dataset.id));
      if (tile === undefined) return;
      const newImg = new Image();
      newImg.src = tile.filename;
      this.game.overlay.display(tile.name, newImg, '', true);
    };
    this.removeTile = (img) => {
      // Match the tile based on clicked image
      const index = this.tiles.findIndex(c => (c.id === img.dataset.id));
      if (index === -1) return;
      // remove tile from server
      this.game.send('remove-tile', {
        floor: this.name,
        id: this.tiles[index].id,
      });
      // Remove tile from list
      this.tiles.splice(index, 1);
      // remove the image from page
      img.parentElement.removeChild(img);
    };
    this.rotateTile = (img) => {
      // Match the tile based on clicked image
      const tile = this.tiles.find(t => (t.id === img.dataset.id));
      if (tile === undefined) return;
      tile.rotate += 90;
      tile.draggable.rotate = tile.rotate;
      this.game.send('rotate-tile', {
        floor: this.name,
        id: tile.id,
        rotate: tile.rotate,
      });
    };
    this.sendTileMoved = function () {
      game.send('move-tile', {
        floor: name,
        id: this.el.dataset.id,
        index: this.index,
      });
    };
  }
  addTile(tile) {
    // if a new tile (id == null) send message
    if (tile.id == null) {
      tile.id = generateRandID();
      this.game.send('add-tile', {
        floor: this.name,
        tile: tile.name,
        id: tile.id,
      });
    }

    // Add image to page
    const i = new Image();
    i.src = tile.filename;
    this.el.appendChild(i);
    i.style.top = '1000px';
    i.style.left = '1000px';
    i.dataset.id = tile.id;

    // if the tile is not a floortile give it the object class and offset
    if (tile.type !== 'tiles') {
      i.classList.add('object');
      i.style.top = '1035px';
      i.style.left = '1035px';
    }
    i.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.shiftKey && !e.ctrlKey) {
        this.showTile(e.target);
      }
      if (e.ctrlKey && !e.shiftKey) {
        this.removeTile(e.target);
      }
      if (e.shiftKey && e.ctrlKey) {
        this.rotateTile(e.target);
      }
    });
    tile.draggable = new Draggable(i, { grid: [100, 100] });
    tile.rotate = 0;
    this.tiles.push(tile);

    // register callback for when the tile moved
    tile.draggable.registerFunc(this.sendTileMoved);
  }
  hide() {
    this.el.classList.add('hidd');
  }
  show() {
    this.el.classList.remove('hidd');
  }
}


class Game {
  constructor(name, ui, decks, characters, socket) {
    this.name = name;
    this.ui = ui;
    this.socket = socket;

    this.socketEvents();

    // bind functions
    this.send = Game.send.bind(this);

    // set up floors
    this.floor = {};
    this.floor.basement = new Floor(this, 'basement', ui.floors.basement);
    this.floor.ground = new Floor(this, 'ground', ui.floors.ground);
    this.floor.upper = new Floor(this, 'upper', ui.floors.upper);
    this.floor.forEach = (fn) => {
      [this.floor.basement, this.floor.ground, this.floor.upper].forEach(fn);
    };
    this.floor.selected = this.floor.ground;

    // set up floorButton ui
    this.floorButtons(ui.floorButtons);

    // set up haunt tracker
    this.hauntTracker(ui.hauntTracker);

    // set up decks
    this.tiles = new TileDeck(this, decks.tiles);
    this.events = new Deck(this, decks.events);
    this.items = new Deck(this, decks.items);
    this.omens = new Deck(this, decks.omens);
    this.pieces = new Deck(this, decks.pieces);

    // set up tileDeck ui
    this.tileDeck(ui.tileDeck);

    // set up card decks
    this.eventDeck(ui.eventDeck);
    this.itemDeck(ui.itemDeck);
    this.omenDeck(ui.omenDeck);

    // set up your character
    this.characters = characters;
    this.me = {};
    this.characterCard(ui.me);

    // set up dice and search buttons
    this.dice(ui.dice);
    this.rollDice = Game.rollDice.bind(this); // bind event handler
    this.search(ui.search);

    // set up hand
    this.setupHand(ui.hand);

    // hide the overlay and choose character
    this.overlay = ui.overlay;
    this.showCharacterSelect();
  }

  static send(type, inData) {
    const data = Object.assign({}, inData, { game: this.name });
    this.socket.emit(type, data);
  }

  socketEvents() {
    this.socket.on(
      'update-haunt',
      ({ index }) => {
        this.haunt.drag.setIndex(index);
      },
    );

    this.socket.on(
      'update-attribute',
      ({ character, attribute, value }) => {
        if (this.me.name === character) {
          this.me[attribute].setIndex({ x: value, y: 0 });
        }
        // else ignore it
      },
    );

    this.socket.on(
      'add-tile',
      ({ floor, tile: tileName, id }) => {
        const tile = this.search.allItems.find(t => t.name === tileName);
        tile.id = id;
        this.floor[floor].addTile(tile);
      },
    );

    this.socket.on(
      'remove-tile',
      ({ floor, id }) => {
        const tile = this.floor[floor].tiles.find(t => t.id === id);
        this.floor[floor].removeTile(tile.draggable.el);
      },
    );

    this.socket.on(
      'rotate-tile',
      ({ floor, id, rotate }) => {
        const tile = this.floor[floor].tiles.find(t => t.id === id);
        tile.rotate = rotate;
        tile.draggable.rotate = rotate;
      },
    );

    this.socket.on(
      'move-tile',
      ({ floor, id, index }) => {
        const tile = this.floor[floor].tiles.find(t => t.id === id);
        tile.draggable.setIndex(index);
      },
    );

    this.socket.on(
      'add-hand-card',
      ({ character, card: cardName, id }) => {
        if (this.me.name === character) {
          const card = this.search.allItems.find(c => c.name === cardName);
          card.id = id;
          this.hand.addCard(card);
        }
        // else ignore it
      },
    );

    this.socket.on(
      'remove-hand-card',
      ({ character, id }) => {
        if (this.me.name === character) {
          const card = this.hand.cards.find(c => c.id === id);
          this.hand.removeCard(card.el);
        }
        // else ignore it
      },
    );

    this.socket.on(
      'begin-haunt',
      () => {
        this.haunt.begin();
      },
    );
  }

  floorButtons({ basement, ground, upper }) {
    // Set up the floor selector button UI
    const floors = this.floor;
    function selectFloor(floor) {
      // show only selected floor
      floors.forEach(f => f.hide());
      floor.show();
      floors.selected = floor;

      // highlight pressed button
      [basement, ground, upper].forEach(b => b.classList.remove('btn-active'));
      switch (floor) {
        case floors.basement:
          basement.classList.add('btn-active');
          break;
        case floors.ground:
          ground.classList.add('btn-active');
          break;
        case floors.upper:
          upper.classList.add('btn-active');
          break;
        default:
          break;
      }
    }
    // add listeners
    basement.addEventListener('click', () => selectFloor(this.floor.basement));
    ground.addEventListener('click', () => selectFloor(this.floor.ground));
    upper.addEventListener('click', () => selectFloor(this.floor.upper));
  }

  hauntTracker({ marker, hauntBtn }) {
    this.haunt = {};
    this.haunt.begin = () => {
      this.send('begin-haunt', {});
      const i = new Image();
      i.src = '/static/img/haunt_table.jpg';
      i.id = 'haunt-chart';
      const form = document.createElement('div');
      const textBox = document.createElement('input');
      const traitorBtn = document.createElement('div');
      const heroBtn = document.createElement('div');
      form.classList.add('haunt-form');
      textBox.type = 'text';
      textBox.value = '1';
      heroBtn.innerHTML = 'Hero';
      heroBtn.id = 'hero-btn';
      traitorBtn.innerHTML = 'Traitor';
      traitorBtn.id = 'traitor-btn';
      textBox.classList.add('choose-number');
      this.overlay.display('Choose your haunt...', i, '', true);
      this.overlay.text.appendChild(form);
      form.appendChild(textBox);
      form.appendChild(heroBtn);
      form.appendChild(traitorBtn);

      textBox.select();
      textBox.focus();

      heroBtn.addEventListener('click', () => {
        const number = (`0${textBox.value}`).slice(-2);
        window.open(`/static/pdf/Survival-${number}.pdf`, '_blank');
        this.overlay.hide();
      });
      traitorBtn.addEventListener('click', () => {
        const number = (`0${textBox.value}`).slice(-2);
        window.open(`/static/pdf/Traitor-${number}.pdf`, '_blank');
        this.overlay.hide();
      });
    };
    this.haunt.step = 0;
    this.haunt.drag = new Draggable(marker, {
      grid: [58, 1],
      axis: 'x',
      limits: { xmin: 0, xmax: 12 },
    });
    const { send } = this;
    this.haunt.drag.registerFunc(function () {
      send('update-haunt', { index: this.index });
    });

    hauntBtn.addEventListener('click', this.haunt.begin);
  }

  tileDeck({ $img, $deck, $basement, $ground, $upper }) {
    // Set up the floor tile dealer UI
    function setTileImg(src) {
      return () => $img.attr('src', src);
    }
    const getTile = options => (
      (e) => {
        e.stopPropagation();
        this.tiles.drawCard(options);
      }
    );
    $deck
      .hover(setTileImg('/static/img/Tile_bgu.png'), setTileImg('/static/img/Tile_.png'))
      .click(getTile({ restrictFloor: null }));
    $basement
      .hover(setTileImg('/static/img/Tile_b.png'), setTileImg('/static/img/Tile_bgu.png'))
      .click(getTile({ restrictFloor: 'basement' }));
    $ground
      .hover(setTileImg('/static/img/Tile_g.png'), setTileImg('/static/img/Tile_bgu.png'))
      .click(getTile({ restrictFloor: 'ground' }));
    $upper
      .hover(setTileImg('/static/img/Tile_u.png'), setTileImg('/static/img/Tile_bgu.png'))
      .click(getTile({ restrictFloor: 'upper' }));
  }

  eventDeck(el) {
    // set up the event deck
    el.addEventListener('click', this.events.drawCard.bind(this.events));
  }

  itemDeck(el) {
    // set up the event deck
    el.addEventListener('click', this.items.drawCard.bind(this.items));
  }

  omenDeck(el) {
    // set up the event deck
    el.addEventListener('click', this.omens.drawCard.bind(this.omens));
  }

  dice(el) {
    // set up the dice button
    const chooseDice = () => {
      const textBox = document.createElement('input');
      textBox.type = 'text';
      textBox.value = '1';
      textBox.classList.add('choose-number');
      this.overlay.display('How many dice?', textBox, '', true);
      textBox.select();
      textBox.focus();
      textBox.addEventListener('keypress', this.rollDice);
    };
    el.addEventListener('click', chooseDice);
  }

  static rollDice(e) {
    if (e.keyCode === 13) {
      const dice = parseInt(e.target.value, 10);
      const images = [
        '/static/img/dice_0.png',
        '/static/img/dice_1.png',
        '/static/img/dice_2.png',
      ];
      const div = document.createElement('div');
      for (let i = 0; i < dice; i += 1) {
        const img = new Image();
        img.src = images[Math.floor(Math.random() * images.length)];
        div.appendChild(img);
      }
      this.overlay.display(`Roll ${dice} dice:`, div, '', true);
    }
  }

  search(el) {
    this.search = {};
    // Set up Fuse search
    const options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['name', 'type'],
    };
    this.search.allItems = []
      .concat(this.tiles.cards)
      .concat(this.events.cards)
      .concat(this.items.cards)
      .concat(this.omens.cards)
      .concat(this.pieces.cards)
      .concat(this.characters);
    this.search.fuse = new Fuse(this.search.allItems, options);
    // create a method to add the item when clicked
    const addItem = (e) => {
      // find the result clicked
      const item = this.search.results[e.target.dataset.index];
      if (item == null) return;
      switch (item.type) {
        case 'tiles':
          this.floor.selected.addTile(item);
          break;
        case 'events':
        case 'items':
        case 'omens':
          this.hand.addCard(item);
          break;
        default:
          this.floor.selected.addTile(item);
      }
      this.overlay.hide();
    };

    // create a method to render the search results into a ul
    const renderResults = (e) => {
      // Clear old results
      while (this.search.resultList.hasChildNodes()) {
        this.search.resultList.removeChild(this.search.resultList.lastChild);
      }
      // fill in new results
      this.search.results = this.search.fuse.search(e.target.value);
      this.search.results.forEach((item, index) => {
        if (index > 10) {
          return;
        }
        const li = document.createElement('li');
        li.dataset.index = index;
        li.innerHTML = item.name;
        this.search.resultList.appendChild(li);
        li.addEventListener('click', addItem);
      });
    };

    // set up the search button
    const searchDecks = () => {
      // create a searchbox
      const textBox = document.createElement('input');
      textBox.type = 'text';
      textBox.classList.add('item-search');

      // Display an overlay
      this.overlay.display('Search...', textBox, '', true);
      textBox.select();
      textBox.focus();

      // Add results on keypress
      this.search.resultList = document.createElement('ul');
      this.overlay.text.appendChild(this.search.resultList);
      textBox.addEventListener('input', renderResults);
    };
    el.addEventListener('click', searchDecks);
  }

  characterCard({ characterImg, speed, might, sanity, knowledge }) {
    const options = {
      grid: [15.5, 1],
      axis: 'x',
      limits: { xmin: 0, xmax: 8 },
    };
    const updateValue = (valueName) => {
      // get local variables needed for callback
      const game = this;
      return function () {
        game.send('update-attribute', {
          character: game.me.name,
          attribute: valueName,
          value: this.index.x,
        });
      };
    };
    this.me.img = characterImg;
    this.me.speed = new Draggable(speed, options);
    this.me.might = new Draggable(might, options);
    this.me.sanity = new Draggable(sanity, options);
    this.me.knowledge = new Draggable(knowledge, options);

    this.me.speed.registerFunc(updateValue('speed'));
    this.me.might.registerFunc(updateValue('might'));
    this.me.sanity.registerFunc(updateValue('sanity'));
    this.me.knowledge.registerFunc(updateValue('knowledge'));
  }

  setupHand(el) {
    this.hand = {};
    this.hand.el = el;
    this.hand.cards = [];
    this.hand.showCard = (img) => {
      // Match the card based on clicked object
      const card = this.hand.cards.find(c => (c.id === img.dataset.id));
      if (card === undefined) return;
      const newImg = new Image();
      newImg.src = card.filename;
      this.overlay.display(card.name, newImg, '', true);
    };
    this.hand.removeCard = (img) => {
      // Match the card based on clicked object
      const index = this.hand.cards.findIndex(c => (c.id === img.dataset.id));
      if (index === -1) return;
      const card = this.hand.cards[index];

      // remove card from server
      this.send('remove-hand-card', {
        character: this.me.name,
        id: card.id,
      });
      // remove reference to the image element to prevent memory leak
      delete card.el;

      // Place it in the discard pile
      this[card.type].discards.push(card);
      // Remove card from hand
      this.hand.cards.splice(index, 1);
      // And remove the image from page
      img.parentElement.removeChild(img);
    };
    this.hand.addCard = (card) => {
      // if a new card (id == null) send message
      if (card.id == null) {
        card.id = generateRandID();
        this.send('add-hand-card', {
          character: this.me.name,
          card: card.name,
          id: card.id,
        });
      }
      // add to cards
      this.hand.cards.push(card);
      // add image to page
      const i = new Image();
      i.src = card.filename;
      i.dataset.id = card.id;
      card.el = i;
      this.hand.el.appendChild(i);
      i.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
          this.hand.showCard(e.target);
        }
        if (e.ctrlKey) {
          this.hand.removeCard(e.target);
        }
      });
    };
  }

  showCharacterSelect() {
    let imagesLoaded = 0;
    const div = document.createElement('div');
    div.classList.add('character-select');

    const displayOverlay = () => {
      imagesLoaded += 1;
      if (imagesLoaded < 12) return;
      this.overlay.content.removeAttribute('style');
      this.overlay.display('Choose your character', div, '', false);
    };

    this.characters.forEach((character) => {
      const i = new Image();
      i.classList.add('border');
      // set up onclick
      i.onload = displayOverlay;
      i.addEventListener('click', () => {
        this.me.img.src = character.img;
        this.me.name = character.name;
        this.floor.selected.addTile(character);
        this.overlay.hide();
        this.send('character-select', { character: character.name });
      });
      div.appendChild(i);
      i.src = character.img;
    });
  }
}
