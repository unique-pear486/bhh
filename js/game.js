/* eslint-env browser */
/* globals Draggable */
'use strict';


class Deck {
  constructor({ name, cards }) {
    this.name = name;
    this.cards = cards;
  }
  drawCard() {
    console.log('drawCard', this.name);
  }
}

class TileDeck extends Deck {
}


class Floor {
  constructor(el) {
    this.el = el;
    this.drag = new Draggable(el);
    this.tiles = [];
  }
  addTile(tile) {
    const i = new Image();
    i.src = tile.filename;
    this.el.appendChild(i);
    i.style.top = '1000px';
    i.style.left = '1000px';
    tile.draggable = new Draggable(i, { grid: [100, 100] });
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
    this.floor.basement = new Floor(ui.floors.basement);
    this.floor.ground = new Floor(ui.floors.ground);
    this.floor.upper = new Floor(ui.floors.upper);
    this.floor.forEach = (fn) => {
      [this.floor.basement, this.floor.ground, this.floor.upper].forEach(fn);
    };

    // set up floorButton ui
    this.floorButtons(ui.floorButtons);

    // set up haunt tracker
    this.hauntTracker(ui.hauntTracker);

    // set up decks
    this.tiles = new TileDeck(decks.tiles);
    this.events = new Deck(decks.events);
    this.items = new Deck(decks.items);
    this.omens = new Deck(decks.omens);

    // set up tileDeck ui
    this.tileDeck(ui.tileDeck);

    // set up card decks
    this.eventDeck(ui.eventDeck);
    this.itemDeck(ui.itemDeck);
    this.omenDeck(ui.omenDeck);

    // set up dice and search buttons
    this.dice(ui.dice);
    this.search(ui.search);

    // set up your character
    this.characters = characters;
    this.me = {};
    this.characterCard(ui.me);
    this.hand = ui.hand;

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
    function getTile(options) {
      return () => {
        console.log('getTile', options);
        return false;
      };
    }
    $deck
      .hover(setTileImg('img/Tile_bgu.png'), setTileImg('img/Tile_.png'))
      .click(getTile({ upper: true, ground: true, basement: true }));
    $basement
      .hover(setTileImg('img/Tile_b.png'), setTileImg('img/Tile_bgu.png'))
      .click(getTile({ basement: true }));
    $ground
      .hover(setTileImg('img/Tile_g.png'), setTileImg('img/Tile_bgu.png'))
      .click(getTile({ ground: true }));
    $upper
      .hover(setTileImg('img/Tile_u.png'), setTileImg('img/Tile_bgu.png'))
      .click(getTile({ upper: true }));
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
    function rollDice() {
      console.log('rollDice');
    }
    el.addEventListener('click', rollDice);
  }

  search(el) {
    // set up the search button
    function searchDecks() {
      console.log('searchDecks');
    }
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
