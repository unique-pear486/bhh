/* eslint-env browser */
/* globals Draggable Fuse */
'use strict';


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
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.drag = new Draggable(el);
    this.tiles = [];
    this.showTile = (img) => {
      // Match the tile based on clicked image
      const tile = this.tiles.find(t => (t.name === img.dataset.name));
      if (tile === undefined) return;
      const newImg = new Image();
      newImg.src = tile.filename;
      this.game.overlay.display(tile.name, newImg, '', true);
    };
    this.removeTile = (img) => {
      // Match the tile based on clicked image
      const index = this.tiles.findIndex(c => (c.name === img.dataset.name));
      if (index === -1) return;
      // Remove card from hand
      this.tiles.splice(index, 1);
      // And remove the image from page
      img.parentElement.removeChild(img);
    };
    this.rotateTile = (img) => {
      // Match the tile based on clicked image
      const tile = this.tiles.find(t => (t.name === img.dataset.name));
      if (tile === undefined) return;
      tile.rotate += 90;
      tile.draggable.rotate = tile.rotate;
    };
  }
  addTile(tile) {
    const i = new Image();
    i.src = tile.filename;
    this.el.appendChild(i);
    i.style.top = '1000px';
    i.style.left = '1000px';
    i.dataset.name = tile.name;
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
  }
  hide() {
    this.el.classList.add('hidd');
  }
  show() {
    this.el.classList.remove('hidd');
  }
}


class Game {
  constructor(ui, decks, characters) {
    this.ui = ui;

    // set up floors
    this.floor = {};
    this.floor.basement = new Floor(this, ui.floors.basement);
    this.floor.ground = new Floor(this, ui.floors.ground);
    this.floor.upper = new Floor(this, ui.floors.upper);
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

    // set up dice and search buttons
    this.dice(ui.dice);
    this.rollDice = Game.rollDice.bind(this); // bind event handler
    this.search(ui.search);

    // set up your character
    this.characters = characters;
    this.me = {};
    this.characterCard(ui.me);

    // set up hand
    this.setupHand(ui.hand);

    // hide the overlay and choose character
    this.overlay = ui.overlay;
    setTimeout(() => {
      this.overlay.hide();
      this.overlay.content.removeAttribute('style');
      this.showCharacterSelect();
    }, 500);
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
    function haunt() {
      console.log('haunt');
    }
    this.haunt = {};
    this.haunt.step = 0;
    this.haunt.drag = new Draggable(marker, {
      grid: [58, 1],
      axis: 'x',
      limits: { xmin: 0, xmax: 12 },
    });

    hauntBtn.addEventListener('click', haunt.bind(this));
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
      .hover(setTileImg('img/Tile_bgu.png'), setTileImg('img/Tile_.png'))
      .click(getTile({ restrictFloor: null }));
    $basement
      .hover(setTileImg('img/Tile_b.png'), setTileImg('img/Tile_bgu.png'))
      .click(getTile({ restrictFloor: 'basement' }));
    $ground
      .hover(setTileImg('img/Tile_g.png'), setTileImg('img/Tile_bgu.png'))
      .click(getTile({ restrictFloor: 'ground' }));
    $upper
      .hover(setTileImg('img/Tile_u.png'), setTileImg('img/Tile_bgu.png'))
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
      const images = ['img/dice_0.png', 'img/dice_1.png', 'img/dice_2.png'];
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
      .concat(this.pieces.cards);
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
          console.log(`other: ${item.type}`);
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
    this.me.img = characterImg;
    this.me.speed = new Draggable(speed, options);
    this.me.might = new Draggable(might, options);
    this.me.sanity = new Draggable(sanity, options);
    this.me.knowledge = new Draggable(knowledge, options);
  }

  setupHand(el) {
    this.hand = {};
    this.hand.el = el;
    this.hand.cards = [];
    this.hand.showCard = (img) => {
      // Match the card based on clicked object
      const card = this.hand.cards.find(c => (c.name === img.dataset.name));
      if (card === undefined) return;
      const newImg = new Image();
      newImg.src = card.filename;
      this.overlay.display(card.name, newImg, '', true);
    };
    this.hand.removeCard = (img) => {
      // Match the card based on clicked object
      const index = this.hand.cards.findIndex(c => (c.name === img.dataset.name));
      if (index === -1) return;
      // Place it in the discard pile
      const card = this.hand.cards[index];
      this[card.type].discards.push(card);
      // Remove card from hand
      this.hand.cards.splice(index, 1);
      // And remove the image from page
      img.parentElement.removeChild(img);
    };
    this.hand.addCard = (card) => {
      // add to cards
      this.hand.cards.push(card);
      // add image to page
      const i = new Image();
      i.src = card.filename;
      i.dataset.name = card.name;
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
      if (imagesLoaded < 6) return;
      this.overlay.display('Choose your character', div, '', false);
    };

    this.characters.forEach((character) => {
      const i = new Image();
      i.classList.add('border');
      i.onload = displayOverlay();
      i.addEventListener('click', () => {
        console.log(character.name);
        this.me.img.src = character.img;
        this.overlay.hide();
      });
      div.appendChild(i);
      i.src = character.img;
    });
  }
}
