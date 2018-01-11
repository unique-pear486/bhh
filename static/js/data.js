const characters = [
  {
    name: 'Brandon Jaspers',
    img: '/static/img/char_Brandon_Jaspers.png',
    filename: '/static/img/BJ.png',
    type: 'characters',
  },
  {
    name: 'Darrin Williams',
    img: '/static/img/char_Darrin_Williams.png',
    filename: '/static/img/DFW.png',
    type: 'characters',
  },
  {
    name: 'Father Reinhardt',
    img: '/static/img/char_Father_Reinhardt.png',
    filename: '/static/img/FR.png',
    type: 'characters',
  },
  {
    name: 'Heather Granville',
    img: '/static/img/char_Heather_Granville.png',
    filename: '/static/img/HG.png',
    type: 'characters',
  },
  {
    name: 'Madam Zostra',
    img: '/static/img/char_Madam_Zostra.png',
    filename: '/static/img/MZ.png',
    type: 'characters',
  },
  {
    name: 'Missy Debourde',
    img: '/static/img/char_Missy_Debourde.png',
    filename: '/static/img/MD.png',
    type: 'characters',
  },
  {
    name: 'Peter Akimoto',
    img: '/static/img/char_Peter_Akimoto.png',
    filename: '/static/img/PA.png',
    type: 'characters',
  },
  {
    name: 'Ox Bellows',
    img: '/static/img/char_Ox_Bellows.png',
    filename: '/static/img/OB.png',
    type: 'characters',
  },
  {
    name: 'Professor Longfellow',
    img: '/static/img/char_Professor_Longfellow.png',
    filename: '/static/img/PL.png',
    type: 'characters',
  },
  {
    name: 'Jenny LeClerc',
    img: '/static/img/char_Jenny_LeClerc.png',
    filename: '/static/img/JL.png',
    type: 'characters',
  },
  {
    name: 'Vivian Lopez',
    img: '/static/img/char_Vivian_Lopez.png',
    filename: '/static/img/VL.png',
    type: 'characters',
  },
  {
    name: 'Zoe Ingstrom',
    img: '/static/img/char_Zoe_Ingstrom.png',
    filename: '/static/img/ZI.png',
    type: 'characters',
  },
];

const tiles = [
  {
    upper: 0,
    name: 'Catacombs',
    text: 'You can attempt a Sanity roll of 6+ to cross. If you fail, you stop moving.',
    omen: 1,
    filename: '/static/img/b_catacombs.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Chasm',
    text: 'You can attempt a Speed roll of 3+ to cross. If you fail, you stop moving.',
    omen: 0,
    filename: '/static/img/b_chasm.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Crypt',
    text: 'If you end your turn here, take 1 point of mental damage.',
    omen: 0,
    filename: '/static/img/b_crypt.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Furnace',
    text: 'If you end your turn here, take 1 point of physical damage.',
    omen: 1,
    filename: '/static/img/b_furnace.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Larder',
    text: 'Once per game, if you end your turn here, gain 1 Might.',
    omen: 0,
    filename: '/static/img/b_larder.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Pentagram Chamber',
    text: 'When exiting, you must attempt a Knowledge roll of 4+. If you fail, lose 1 Sanity (but continue moving).',
    omen: 1,
    filename: '/static/img/b_pentagramchamber.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Stairs from Basement',
    text: 'Leads to and from Foyer.',
    omen: 0,
    filename: '/static/img/b_stairs_from_basement.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Underground Lake',
    text: '',
    omen: 1,
    filename: '/static/img/b_undergroundlake.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Winecellar',
    text: '',
    omen: 0,
    filename: '/static/img/b_winecellar.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Abandoned Room',
    text: '',
    omen: 1,
    filename: '/static/img/gb_abandonedroom.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Ballroom',
    text: '',
    omen: 0,
    filename: '/static/img/g_ballroom.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Kitchen',
    text: '',
    omen: 1,
    filename: '/static/img/gb_kitchen.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Coal Chute',
    text: 'One-way to Basement Landing.',
    omen: 0,
    filename: '/static/img/g_coalchute.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Dining Room',
    text: '',
    omen: 1,
    filename: '/static/img/g_diningroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Gardens',
    text: '',
    omen: 0,
    filename: '/static/img/g_gardens.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Graveyard',
    text: 'When exiting, you must attempt a Sanity roll of 4+. If you fail, lose 1 Knowledge (but continue moving).',
    omen: 0,
    filename: '/static/img/g_graveyard.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 0,
    name: 'Patio',
    text: '',
    omen: 0,
    filename: '/static/img/g_patio.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Attic',
    text: 'When exiting, you must attempt a Speed roll of 3+. If you fail, lose 1 Might (but continue moving).',
    omen: 0,
    filename: '/static/img/u_attic.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Balcony',
    text: '',
    omen: 1,
    filename: '/static/img/u_balcony.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Bedroom',
    text: '',
    omen: 0,
    filename: '/static/img/u_bedroom.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Gymnasium',
    text: 'Once per game, if you end your turn here, gain 1 Speed.',
    omen: 1,
    filename: '/static/img/ub_gymnasium.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Operating Lab',
    text: '',
    omen: 0,
    filename: '/static/img/ub_operatinglab.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Research Lab',
    text: '',
    omen: 0,
    filename: '/static/img/ub_researchlab.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Servants Quarters',
    text: '',
    omen: 1,
    filename: '/static/img/ub_servantsquarters.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Storeroom',
    text: '',
    omen: 0,
    filename: '/static/img/ub_storeroom.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Vault',
    text: 'You can attempt a Knowledge roll of 6+ to open and empty the vault.',
    omen: 0,
    filename: '/static/img/ub_vault.jpg',
    item: 2,
    basement: 1,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Gallery',
    text: 'You can choose to fall to the Ballroom if it is in the house. If you do, take 1 die of physical damage.',
    omen: 1,
    filename: '/static/img/u_gallery.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Creaky Hallway',
    text: '',
    omen: 0,
    filename: '/static/img/ugb_creakyhallway.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Dusty Hallway',
    text: '',
    omen: 0,
    filename: '/static/img/ugb_dustyhallway.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Game Room',
    text: '',
    omen: 0,
    filename: '/static/img/ugb_gameroom.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Junk Room',
    text: 'When exiting, you must attempt a Might roll of 3+. If you fail, lose 1 Speed (but continue moving).',
    omen: 1,
    filename: '/static/img/ugb_junkroom.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Bloody Room',
    text: '',
    omen: 0,
    filename: '/static/img/ug_bloodyroom.jpg',
    item: 1,
    basement: 0,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Mystic Elevator',
    text: 'Once per turn, roll 2 dice and move this room next to any open door on:\n4 Any floor\n3 Upper floor\n2 Ground floor\n1 Basement\n0 Basement, then take 1 die of physical damage',
    omen: 0,
    filename: '/static/img/ugb_mysticelevator.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Organ Room',
    text: '',
    omen: 0,
    filename: '/static/img/ugb_organroom.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Statuary Corridor',
    text: '',
    omen: 0,
    filename: '/static/img/ugb_statuarycorridor.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Chapel',
    text: 'Once per game, if you end your turn here, gain 1 Sanity.',
    omen: 0,
    filename: '/static/img/ug_chapel.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Charred Room',
    text: '',
    omen: 1,
    filename: '/static/img/ug_charredroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Collapsed Room',
    text: 'You must attempt a Speed roll of 5+ to avoid falling. If you fail the roll, draw a basement tile and put it in play. You fall there and take 1 die of physical damage.',
    omen: 0,
    filename: '/static/img/ug_collapsedroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Conservatory',
    text: '',
    omen: 0,
    filename: '/static/img/ug_conservatory.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Library',
    text: 'Once per game, if you end your turn here, gain 1 Knowledge.',
    omen: 0,
    filename: '/static/img/ug_library.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Master Bedroom',
    text: '',
    omen: 1,
    filename: '/static/img/u_masterbedroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
    type: 'tiles',
  },
  {
    upper: 1,
    name: 'Tower',
    text: 'You can attempt a Might roll of 3+ to cross. If you fail, you stop moving.',
    omen: 0,
    filename: '/static/img/u_tower.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
    type: 'tiles',
  },
];

const events = [
  {
    name: 'A Moment of Hope',
    filename: '/static/img/event_amomentofhope.jpg',
    type: 'events',
  },
  {
    name: 'Angry Being',
    filename: '/static/img/event_angrybeing.jpg',
    type: 'events',
  },
  {
    name: 'Bloody Vision',
    filename: '/static/img/event_bloodyvision.jpg',
    type: 'events',
  },
  {
    name: 'Burning Man',
    filename: '/static/img/event_burning_man.jpg',
    type: 'events',
  },
  {
    name: 'Closed Door',
    filename: '/static/img/event_closet_door.jpg',
    type: 'events',
  },
  {
    name: 'Creepy Crawlies',
    filename: '/static/img/event_creepy_crawlies.jpg',
    type: 'events',
  },
  {
    name: 'Creepy Puppet',
    filename: '/static/img/event_creepy_puppet.jpg',
    type: 'events',
  },
  {
    name: 'Debris',
    filename: '/static/img/event_debris.jpg',
    type: 'events',
  },
  {
    name: 'Disquieting Sounds',
    filename: '/static/img/event_disquieting_sounds.jpg',
    type: 'events',
  },
  {
    name: 'Drip...',
    filename: '/static/img/event_drip.jpg',
    type: 'events',
  },
  {
    name: 'Footsteps',
    filename: '/static/img/event_footsteps.jpg',
    type: 'events',
  },
  {
    name: 'Funeral',
    filename: '/static/img/event_funeral.jpg',
    type: 'events',
  },
  {
    name: 'Grave Dirt',
    filename: '/static/img/event_grave_dirt.jpg',
    type: 'events',
  },
  {
    name: 'Groundskeeper',
    filename: '/static/img/event_groundskeeper.jpg',
    type: 'events',
  },
  {
    name: 'Hanged Man',
    filename: '/static/img/event_hanged_man.jpg',
    type: 'events',
  },
  {
    name: 'Hideous Shriek',
    filename: '/static/img/event_hideous_shriek.jpg',
    type: 'events',
  },
  {
    name: 'Image in the Mirror (Past)',
    filename: '/static/img/event_image_in_the_mirror.jpg',
    type: 'events',
  },
  {
    name: 'Image in the Mirror (Future)',
    filename: '/static/img/event_imageinthemirror.jpg',
    type: 'events',
  },
  {
    name: 'It is Meant to Be',
    filename: '/static/img/event_itismeanttobe.jpg',
    type: 'events',
  },
  {
    name: 'Jonahs Turn',
    filename: '/static/img/event_jonahsturn.jpg',
    type: 'events',
  },
  {
    name: 'Lights Out',
    filename: '/static/img/event_lightsout.jpg',
    type: 'events',
  },
  {
    name: 'Locked Safe',
    filename: '/static/img/event_lockedsafe.jpg',
    type: 'events',
  },
  {
    name: 'Mist from the Walls',
    filename: '/static/img/event_mistfromthewalls.jpg',
    type: 'events',
  },
  {
    name: 'Mystic Slide',
    filename: '/static/img/event_mysticslide.jpg',
    type: 'events',
  },
  {
    name: 'Night View',
    filename: '/static/img/event_nightview.jpg',
    type: 'events',
  },
  {
    name: 'Phone Call',
    filename: '/static/img/event_phonecall.jpg',
    type: 'events',
  },
  {
    name: 'Possession',
    filename: '/static/img/event_possession.jpg',
    type: 'events',
  },
  {
    name: 'Revolving Wall',
    filename: '/static/img/event_revolvingwall.jpg',
    type: 'events',
  },
  {
    name: 'Rotten',
    filename: '/static/img/event_rotten.jpg',
    type: 'events',
  },
  {
    name: 'Safe Passage',
    filename: '/static/img/event_safe_passage.jpg',
    type: 'events',
  },
  {
    name: 'Secret Stairs',
    filename: '/static/img/event_secretstairs.jpg',
    type: 'events',
  },
  {
    name: 'Shrieking Wind',
    filename: '/static/img/event_shriekingwind.jpg',
    type: 'events',
  },
  {
    name: 'Silence',
    filename: '/static/img/event_silence.jpg',
    type: 'events',
  },
  {
    name: 'Skeletons',
    filename: '/static/img/event_skeletons.jpg',
    type: 'events',
  },
  {
    name: 'Smoke',
    filename: '/static/img/event_smoke.jpg',
    type: 'events',
  },
  {
    name: 'Something Hidden',
    filename: '/static/img/event_somethinghidden.jpg',
    type: 'events',
  },
  {
    name: 'Something Slimy',
    filename: '/static/img/event_somethingslimy.jpg',
    type: 'events',
  },
  {
    name: 'Spider',
    filename: '/static/img/event_spider.jpg',
    type: 'events',
  },
  {
    name: 'The Beckoning',
    filename: '/static/img/event_thebeckoning.jpg',
    type: 'events',
  },
  {
    name: 'The Lost One',
    filename: '/static/img/event_thelostone.jpg',
    type: 'events',
  },
  {
    name: 'The Voice',
    filename: '/static/img/event_thevoice.jpg',
    type: 'events',
  },
  {
    name: 'The Walls',
    filename: '/static/img/event_thewalls.jpg',
    type: 'events',
  },
  {
    name: 'Webs',
    filename: '/static/img/event_webs.jpg',
    type: 'events',
  },
  {
    name: 'What the...?',
    filename: '/static/img/event_whatthe.jpg',
    type: 'events',
  },
  {
    name: 'Whoops!',
    filename: '/static/img/event_whoops.jpg',
    type: 'events',
  },
];

const items = [
  {
    name: 'Adrenaline Shot',
    filename: '/static/img/item_adrenalineshot.jpg',
    type: 'items',
  },
  {
    name: 'Amulet of the Ages',
    filename: '/static/img/item_amuletoftheages.jpg',
    type: 'items',
  },
  {
    name: 'Angle Feather',
    filename: '/static/img/item_angelfeather.jpg',
    type: 'items',
  },
  {
    name: 'Armor',
    filename: '/static/img/item_armor.jpg',
    type: 'items',
  },
  {
    name: 'Axe',
    filename: '/static/img/item_axe.jpg',
    type: 'items',
  },
  {
    name: 'Bell',
    filename: '/static/img/item_bell.jpg',
    type: 'items',
  },
  {
    name: 'Blood Dagger',
    filename: '/static/img/item_blooddagger.jpg',
    type: 'items',
  },
  {
    name: 'Bottle',
    filename: '/static/img/item_bottle.jpg',
    type: 'items',
  },
  {
    name: 'Candle',
    filename: '/static/img/item_candle.jpg',
    type: 'items',
  },
  {
    name: 'Dark Dice',
    filename: '/static/img/item_darkdice.jpg',
    type: 'items',
  },
  {
    name: 'Dynamite',
    filename: '/static/img/item_dynamite.jpg',
    type: 'items',
  },
  {
    name: 'Healing Salve',
    filename: '/static/img/item_healingsalve.jpg',
    type: 'items',
  },
  {
    name: 'Idol',
    filename: '/static/img/item_idol.jpg',
    type: 'items',
  },
  {
    name: 'Lucky Stone',
    filename: '/static/img/item_luckystone.jpg',
    type: 'items',
  },
  {
    name: 'Medical Kit',
    filename: '/static/img/item_medicalkit.jpg',
    type: 'items',
  },
  {
    name: 'Music Box',
    filename: '/static/img/item_musicbox.jpg',
    type: 'items',
  },
  {
    name: 'Pick Pockets Gloves',
    filename: '/static/img/item_pickpocketsgloves.jpg',
    type: 'items',
  },
  {
    name: 'Puzzlebox',
    filename: '/static/img/item_puzzlebox.jpg',
    type: 'items',
  },
  {
    name: 'Rabbits Foot',
    filename: '/static/img/item_rabbitsfoot.jpg',
    type: 'items',
  },
  {
    name: 'Revolver',
    filename: '/static/img/item_revolver.jpg',
    type: 'items',
  },
  {
    name: 'Sacrificial Dagger',
    filename: '/static/img/item_sacrificialdagger.jpg',
    type: 'items',
  },
  {
    name: 'Smelling Salts',
    filename: '/static/img/item_smellingsalts.jpg',
    type: 'items',
  },
];

const omens = [
  {
    name: 'Bite',
    filename: '/static/img/omen_bite.jpg',
    type: 'omens',
  },
  {
    name: 'Book',
    filename: '/static/img/omen_book.jpg',
    type: 'omens',
  },
  {
    name: 'Crystal Ball',
    filename: '/static/img/omen_crystalball.jpg',
    type: 'omens',
  },
  {
    name: 'Dog',
    filename: '/static/img/omen_dog.jpg',
    type: 'omens',
  },
  {
    name: 'Girl',
    filename: '/static/img/omen_girl.jpg',
    type: 'omens',
  },
  {
    name: 'Holy Symbol',
    filename: '/static/img/omen_holysymbol.jpg',
    type: 'omens',
  },
  {
    name: 'Madman',
    filename: '/static/img/omen_madman.jpg',
    type: 'omens',
  },
  {
    name: 'Mask',
    filename: '/static/img/omen_mask.jpg',
    type: 'omens',
  },
  {
    name: 'Medallion',
    filename: '/static/img/omen_medallion.jpg',
    type: 'omens',
  },
  {
    name: 'Ring',
    filename: '/static/img/omen_ring.jpg',
    type: 'omens',
  },
  {
    name: 'Skull',
    filename: '/static/img/omen_skull.jpg',
    type: 'omens',
  },
  {
    name: 'Spear',
    filename: '/static/img/omen_spear.jpg',
    type: 'omens',
  },
  {
    name: 'Spiritboard',
    filename: '/static/img/omen_spiritboard.jpg',
    type: 'omens',
  },
];

const pieces = [
  {
    type: 'monster',
    name: 'Banshee',
    filename: '/static/img/monster_banshee.png',
  },
  {
    type: 'monsterStun',
    name: 'Banshee (stunned)',
    filename: '/static/img/monster_banshee_stun.png',
  },
  {
    type: 'monster',
    name: 'Crimson Jack',
    filename: '/static/img/monster_cj.png',
  },
  {
    type: 'monsterStun',
    name: 'Crimson Jack (stunned)',
    filename: '/static/img/monster_cj_stun.png',
  },
  {
    type: 'monster',
    name: 'Demon Lord',
    filename: '/static/img/monster_demonlord.png',
  },
  {
    type: 'monsterStun',
    name: 'Demon Lord (stunned)',
    filename: '/static/img/monster_demonlord_stun.png',
  },
  {
    type: 'monster',
    name: 'Dracula',
    filename: '/static/img/monster_dracula.png',
  },
  {
    type: 'monsterStun',
    name: 'Dracula (stunned)',
    filename: '/static/img/monster_dracula_stun.png',
  },
  {
    type: 'monster',
    name: 'Dragon',
    filename: '/static/img/monster_dragon.png',
  },
  {
    type: 'monsterStun',
    name: 'Dragon (stunned)',
    filename: '/static/img/monster_dragon_stun.png',
  },
  {
    type: 'monster',
    name: 'Frankensteins Monster',
    filename: '/static/img/monster_frankensteind.png',
  },
  {
    type: 'monsterStun',
    name: 'Frankensteins Monster (stunned)',
    filename: '/static/img/monster_frankenstein_stun.png',
  },
  {
    type: 'monster',
    name: 'Mummy',
    filename: '/static/img/monster_mummy.png',
  },
  {
    type: 'monsterStun',
    name: 'Mummy (stunned)',
    filename: '/static/img/monster_mummy_stun.png',
  },
  {
    type: 'monster',
    name: 'Ouroboros Head (closed)',
    filename: '/static/img/monster_ouro_1.png',
  },
  {
    type: 'monster',
    name: 'Ouroboros Head (open)',
    filename: '/static/img/monster_ouro_2.png',
  },
  {
    type: 'monsterStun',
    name: 'Ouroboros Head (stunned)',
    filename: '/static/img/monster_ouro_stun.png',
  },
  {
    type: 'monster',
    name: 'Spider',
    filename: '/static/img/monster_spider.png',
  },
  {
    type: 'monsterStun',
    name: 'Spider (stunned)',
    filename: '/static/img/monster_spider_stun.png',
  },
  {
    type: 'monster',
    name: 'Witch',
    filename: '/static/img/monster_witch.png',
  },
  {
    type: 'monsterStun',
    name: 'Witch (stunned)',
    filename: '/static/img/monster_witch_stun.png',
  },
  {
    type: 'monster',
    name: 'Zombie Lord',
    filename: '/static/img/monster_zombielord.png',
  },
  {
    type: 'monsterStun',
    name: 'Zombie Lord (stunned)',
    filename: '/static/img/monster_zombielord_stun.png',
  },
  {
    type: 'counter',
    name: 'Blue Zombie',
    filename: '/static/img/counter_blue.png',
  },
  {
    type: 'counterStun',
    name: 'Blue Zombie (stunned)',
    filename: '/static/img/counter_blue_stun.png',
  },
  {
    type: 'counter',
    name: 'Green Tentacle',
    filename: '/static/img/counter_green.png',
  },
  {
    type: 'counterStun',
    name: 'Green Tentacle (stunned)',
    filename: '/static/img/counter_green_stun.png',
  },
  {
    type: 'counter',
    name: 'Orange Ooze',
    filename: '/static/img/counter_Orange.png',
  },
  {
    type: 'counterStun',
    name: 'Orange Ooze (stunned)',
    filename: '/static/img/counter_Orange_stun.png',
  },
  {
    type: 'counter',
    name: 'Pink Kali',
    filename: '/static/img/counter_pink.png',
  },
  {
    type: 'counterStun',
    name: 'Pink Kali (stunned)',
    filename: '/static/img/counter_pink_stun.png',
  },
  {
    type: 'counter',
    name: 'Purple Cultist',
    filename: '/static/img/counter_purple.png',
  },
  {
    type: 'counterStun',
    name: 'Purple Cultist (stunned)',
    filename: '/static/img/counter_purple_stun.png',
  },
  {
    type: 'counter',
    name: 'Red Cat',
    filename: '/static/img/counter_red.png',
  },
  {
    type: 'counterStun',
    name: 'Red Cat (stunned)',
    filename: '/static/img/counter_red_stun.png',
  },
  {
    type: 'counter',
    name: 'Yellow Claw',
    filename: '/static/img/counter_yellow.png',
  },
  {
    type: 'counterStun',
    name: 'Yellow Claw (stunned)',
    filename: '/static/img/counter_yellow_stun.png',
  },
  {
    type: 'square',
    name: 'Below Collapsed Room',
    filename: '/static/img/sq_below_c_r.png',
  },
  {
    type: 'square',
    name: 'Blessing',
    filename: '/static/img/sq_blessing.png',
  },
  {
    type: 'square',
    name: 'Closet',
    filename: '/static/img/sq_closet.png',
  },
  {
    type: 'square',
    name: 'Drip',
    filename: '/static/img/sq_drip.png',
  },
  {
    type: 'square',
    name: 'Safe',
    filename: '/static/img/sq_safe.png',
  },
  {
    type: 'square',
    name: 'Secret Passage',
    filename: '/static/img/sq_secret_passage.png',
  },
  {
    type: 'square',
    name: 'Secret Stairs',
    filename: '/static/img/sq_secret_stairs.png',
  },
  {
    type: 'square',
    name: 'Skeleton',
    filename: '/static/img/sq_skeleton.png',
  },
  {
    type: 'square',
    name: 'Slide',
    filename: '/static/img/sq_slide.png',
  },
  {
    type: 'square',
    name: 'Smoke',
    filename: '/static/img/sq_smoke.png',
  },
  {
    type: 'square',
    name: 'Valut Empty',
    filename: '/static/img/sq_vault_empty.png',
  },
  {
    type: 'square',
    name: 'Wall Switch',
    filename: '/static/img/sq_wall_switch.png',
  },
  {
    type: 'pentagon',
    name: 'Pentagon Item',
    filename: '/static/img/pentagon_item.png',
  },
  {
    type: 'triangle',
    name: 'Roll Knowledge',
    filename: '/static/img/roll_knowledge.png',
  },
  {
    type: 'triangle',
    name: 'Roll Might',
    filename: '/static/img/roll_might.png',
  },
  {
    type: 'triangle',
    name: 'Roll Sanity',
    filename: '/static/img/roll_sanity.png',
  },
];
