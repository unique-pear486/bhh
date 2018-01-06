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

const tiles = [
  {
    upper: 0,
    name: 'Catacombs',
    text: 'You can attempt a Sanity roll of 6+ to cross. If you fail, you stop moving.',
    omen: 1,
    filename: 'img/b_catacombs.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Chasm',
    text: 'You can attempt a Speed roll of 3+ to cross. If you fail, you stop moving.',
    omen: 0,
    filename: 'img/b_chasm.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Crypt',
    text: 'If you end your turn here, take 1 point of mental damage.',
    omen: 0,
    filename: 'img/b_crypt.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Furnace',
    text: 'If you end your turn here, take 1 point of physical damage.',
    omen: 1,
    filename: 'img/b_furnace.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Larder',
    text: 'Once per game, if you end your turn here, gain 1 Might.',
    omen: 0,
    filename: 'img/b_larder.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Pentagram Chamber',
    text: 'When exiting, you must attempt a Knowledge roll of 4+. If you fail, lose 1 Sanity (but continue moving).',
    omen: 1,
    filename: 'img/b_pentagramchamber.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Stairs from Basement',
    text: 'Leads to and from Foyer.',
    omen: 0,
    filename: 'img/b_stairs_from_basement.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Underground Lake',
    text: '',
    omen: 1,
    filename: 'img/b_undergroundlake.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Winecellar',
    text: '',
    omen: 0,
    filename: 'img/b_winecellar.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 0,
    name: 'Abandoned Room',
    text: '',
    omen: 1,
    filename: 'img/gb_abandonedroom.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Ballroom',
    text: '',
    omen: 0,
    filename: 'img/g_ballroom.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Kitchen',
    text: '',
    omen: 1,
    filename: 'img/gb_kitchen.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Coal Chute',
    text: 'One-way to Basement Landing.',
    omen: 0,
    filename: 'img/g_coalchute.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Dining Room',
    text: '',
    omen: 1,
    filename: 'img/g_diningroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Gardens',
    text: '',
    omen: 0,
    filename: 'img/g_gardens.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Graveyard',
    text: 'When exiting, you must attempt a Sanity roll of 4+. If you fail, lose 1 Knowledge (but continue moving).',
    omen: 0,
    filename: 'img/g_graveyard.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 0,
    name: 'Patio',
    text: '',
    omen: 0,
    filename: 'img/g_patio.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Attic',
    text: 'When exiting, you must attempt a Speed roll of 3+. If you fail, lose 1 Might (but continue moving).',
    omen: 0,
    filename: 'img/u_attic.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Balcony',
    text: '',
    omen: 1,
    filename: 'img/u_balcony.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Bedroom',
    text: '',
    omen: 0,
    filename: 'img/u_bedroom.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Gymnasium',
    text: 'Once per game, if you end your turn here, gain 1 Speed.',
    omen: 1,
    filename: 'img/ub_gymnasium.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Operating Lab',
    text: '',
    omen: 0,
    filename: 'img/ub_operatinglab.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Research Lab',
    text: '',
    omen: 0,
    filename: 'img/ub_researchlab.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Servants\u2019 Quarters',
    text: '',
    omen: 1,
    filename: 'img/ub_servantsquarters.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Storeroom',
    text: '',
    omen: 0,
    filename: 'img/ub_storeroom.jpg',
    item: 1,
    basement: 1,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Vault',
    text: 'You can attempt a Knowledge roll of 6+ to open and empty the vault.',
    omen: 0,
    filename: 'img/ub_vault.jpg',
    item: 2,
    basement: 1,
    event: 1,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Gallery',
    text: 'You can choose to fall to the Ballroom if it is in the house. If you do, take 1 die of physical damage.',
    omen: 1,
    filename: 'img/u_gallery.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Creaky Hallway',
    text: '',
    omen: 0,
    filename: 'img/ugb_creakyhallway.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Dusty Hallway',
    text: '',
    omen: 0,
    filename: 'img/ugb_dustyhallway.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Game Room',
    text: '',
    omen: 0,
    filename: 'img/ugb_gameroom.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Junk Room',
    text: 'When exiting, you must attempt a Might roll of 3+. If you fail, lose 1 Speed (but continue moving).',
    omen: 1,
    filename: 'img/ugb_junkroom.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Bloody Room',
    text: '',
    omen: 0,
    filename: 'img/ug_bloodyroom.jpg',
    item: 1,
    basement: 0,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Mystic Elevator',
    text: 'Once per turn, roll 2 dice and move this room next to any open door on:\n4 Any floor\n3 Upper floor\n2 Ground floor\n1 Basement\n0 Basement, then take 1 die of physical damage',
    omen: 0,
    filename: 'img/ugb_mysticelevator.jpg',
    item: 0,
    basement: 1,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Organ Room',
    text: '',
    omen: 0,
    filename: 'img/ugb_organroom.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Statuary Corridor',
    text: '',
    omen: 0,
    filename: 'img/ugb_statuarycorridor.jpg',
    item: 0,
    basement: 1,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Chapel',
    text: 'Once per game, if you end your turn here, gain 1 Sanity.',
    omen: 0,
    filename: 'img/ug_chapel.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Charred Room',
    text: '',
    omen: 1,
    filename: 'img/ug_charredroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Collapsed Room',
    text: 'You must attempt a Speed roll of 5+ to avoid falling. If you fail the roll, draw a basement tile and put it in play. You fall there and take 1 die of physical damage.',
    omen: 0,
    filename: 'img/ug_collapsedroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Conservatory',
    text: '',
    omen: 0,
    filename: 'img/ug_conservatory.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Library',
    text: 'Once per game, if you end your turn here, gain 1 Knowledge.',
    omen: 0,
    filename: 'img/ug_library.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 1,
  },
  {
    upper: 1,
    name: 'Master Bedroom',
    text: '',
    omen: 1,
    filename: 'img/u_masterbedroom.jpg',
    item: 0,
    basement: 0,
    event: 0,
    ground: 0,
  },
  {
    upper: 1,
    name: 'Tower',
    text: 'You can attempt a Might roll of 3+ to cross. If you fail, you stop moving.',
    omen: 0,
    filename: 'img/u_tower.jpg',
    item: 0,
    basement: 0,
    event: 1,
    ground: 0,
  },
];

const events = [
  {
    name: 'A Moment of Hope',
    filename: 'img/event_amomentofhope.jpg',
  },
  {
    name: 'Angry Being',
    filename: 'img/event_angrybeing.jpg',
  },
  {
    name: 'Bloody Vision',
    filename: 'img/event_bloodyvision.jpg',
  },
  {
    name: 'Burning Man',
    filename: 'img/event_burning_man.jpg',
  },
  {
    name: 'Closed Door',
    filename: 'img/event_closet_door.jpg',
  },
  {
    name: 'Creepy Crawlies',
    filename: 'img/event_creepy_crawlies.jpg',
  },
  {
    name: 'Creepy Puppet',
    filename: 'img/event_creepy_puppet.jpg',
  },
  {
    name: 'Debris',
    filename: 'img/event_debris.jpg',
  },
  {
    name: 'Disquieting Sounds',
    filename: 'img/event_disquieting_sounds.jpg',
  },
  {
    name: 'Drip',
    filename: 'img/event_drip.jpg',
  },
  {
    name: 'Footsteps',
    filename: 'img/event_footsteps.jpg',
  },
  {
    name: 'Funeral',
    filename: 'img/event_funeral.jpg',
  },
  {
    name: 'Grave Dirt',
    filename: 'img/event_grave_dirt.jpg',
  },
  {
    name: 'Groundskeeper',
    filename: 'img/event_groundskeeper.jpg',
  },
  {
    name: 'Hanged Man',
    filename: 'img/event_hanged_man.jpg',
  },
  {
    name: 'Hideous Shriek',
    filename: 'img/event_hideous_shriek.jpg',
  },
  {
    name: 'Image in the Mirror (Past)',
    filename: 'img/event_image_in_the_mirror.jpg',
  },
  {
    name: 'Image in the Mirror (Future)',
    filename: 'img/event_imageinthemirror.jpg',
  },
  {
    name: 'It is Meant to Be',
    filename: 'img/event_itismeanttobe.jpg',
  },
  {
    name: 'Jonah\u2019s Turn',
    filename: 'img/event_jonahsturn.jpg',
  },
  {
    name: 'Lights Out',
    filename: 'img/event_lightsout.jpg',
  },
  {
    name: 'Locked Safe',
    filename: 'img/event_lockedsafe.jpg',
  },
  {
    name: 'Mist from the Walls',
    filename: 'img/event_mistfromthewalls.jpg',
  },
  {
    name: 'Mystic Slide',
    filename: 'img/event_mysticslide.jpg',
  },
  {
    name: 'Night View',
    filename: 'img/event_nightview.jpg',
  },
  {
    name: 'Phone Call',
    filename: 'img/event_phonecall.jpg',
  },
  {
    name: 'Possession',
    filename: 'img/event_possession.jpg',
  },
  {
    name: 'Revolving Wall',
    filename: 'img/event_revolvingwall.jpg',
  },
  {
    name: 'Rotten',
    filename: 'img/event_rotten.jpg',
  },
  {
    name: 'Safe Passage',
    filename: 'img/event_safe_passage.jpg',
  },
  {
    name: 'Secret Stairs',
    filename: 'img/event_secretstairs.jpg',
  },
  {
    name: 'Shrieking Wind',
    filename: 'img/event_shriekingwind.jpg',
  },
  {
    name: 'Silence',
    filename: 'img/event_silence.jpg',
  },
  {
    name: 'Skeletons',
    filename: 'img/event_skeletons.jpg',
  },
  {
    name: 'Smoke',
    filename: 'img/event_smoke.jpg',
  },
  {
    name: 'Something Hidden',
    filename: 'img/event_somethinghidden.jpg',
  },
  {
    name: 'Something Slimy',
    filename: 'img/event_somethingslimy.jpg',
  },
  {
    name: 'Spider',
    filename: 'img/event_spider.jpg',
  },
  {
    name: 'The Beckoning',
    filename: 'img/event_thebeckoning.jpg',
  },
  {
    name: 'The Lost One',
    filename: 'img/event_thelostone.jpg',
  },
  {
    name: 'The Voice',
    filename: 'img/event_thevoice.jpg',
  },
  {
    name: 'The Walls',
    filename: 'img/event_thewalls.jpg',
  },
  {
    name: 'Webs',
    filename: 'img/event_webs.jpg',
  },
  {
    name: 'What the...?',
    filename: 'img/event_whatthe.jpg',
  },
  {
    name: 'Whoops!',
    filename: 'img/event_whoops.jpg',
  },
];

const items = [
  {
    name: 'Adrenaline Shot',
    filename: 'img/item_adrenalineshot.jpg',
  },
  {
    name: 'Amulet of the Ages',
    filename: 'img/item_amuletoftheages.jpg',
  },
  {
    name: 'Angle Feather',
    filename: 'img/item_angelfeather.jpg',
  },
  {
    name: 'Armor',
    filename: 'img/item_armor.jpg',
  },
  {
    name: 'Axe',
    filename: 'img/item_axe.jpg',
  },
  {
    name: 'Bell',
    filename: 'img/item_bell.jpg',
  },
  {
    name: 'Blood Dagger',
    filename: 'img/item_blooddagger.jpg',
  },
  {
    name: 'Bottle',
    filename: 'img/item_bottle.jpg',
  },
  {
    name: 'Candle',
    filename: 'img/item_candle.jpg',
  },
  {
    name: 'Dark Dice',
    filename: 'img/item_darkdice.jpg',
  },
  {
    name: 'Dynamite',
    filename: 'img/item_dynamite.jpg',
  },
  {
    name: 'Healing Salve',
    filename: 'img/item_healingsalve.jpg',
  },
  {
    name: 'Idol',
    filename: 'img/item_idol.jpg',
  },
  {
    name: 'Lucky Stone',
    filename: 'img/item_luckystone.jpg',
  },
  {
    name: 'Medical Kit',
    filename: 'img/item_medicalkit.jpg',
  },
  {
    name: 'Music Box',
    filename: 'img/item_musicbox.jpg',
  },
  {
    name: 'Pick Pocket\u2019s Gloves',
    filename: 'img/item_pickpocketsgloves.jpg',
  },
  {
    name: 'Puzzlebox',
    filename: 'img/item_puzzlebox.jpg',
  },
  {
    name: 'Rabbit\u2019s Foot',
    filename: 'img/item_rabbitsfoot.jpg',
  },
  {
    name: 'Revolver',
    filename: 'img/item_revolver.jpg',
  },
  {
    name: 'Sacrificial Dagger',
    filename: 'img/item_sacrificialdagger.jpg',
  },
  {
    name: 'Smelling Salts',
    filename: 'img/item_smellingsalts.jpg',
  },
];

const omens = [
  {
    name: 'Bite',
    filename: 'img/omen_bite.jpg',
  },
  {
    name: 'Book',
    filename: 'img/omen_book.jpg',
  },
  {
    name: 'Crystal Ball',
    filename: 'img/omen_crystalball.jpg',
  },
  {
    name: 'Dog',
    filename: 'img/omen_dog.jpg',
  },
  {
    name: 'Girl',
    filename: 'img/omen_girl.jpg',
  },
  {
    name: 'Holy Symbol',
    filename: 'img/omen_holysymbol.jpg',
  },
  {
    name: 'Madman',
    filename: 'img/omen_madman.jpg',
  },
  {
    name: 'Mask',
    filename: 'img/omen_mask.jpg',
  },
  {
    name: 'Medallion',
    filename: 'img/omen_medallion.jpg',
  },
  {
    name: 'Ring',
    filename: 'img/omen_ring.jpg',
  },
  {
    name: 'Skull',
    filename: 'img/omen_skull.jpg',
  },
  {
    name: 'Spear',
    filename: 'img/omen_spear.jpg',
  },
  {
    name: 'Spiritboard',
    filename: 'img/omen_spiritboard.jpg',
  },
];

const pieces = [
  {
    type: 'monster',
    name: 'Banshee',
    filename: 'img/monster_banshee.png',
  },
  {
    type: 'monsterStun',
    name: 'Banshee (stunned)',
    filename: 'img/monster_banshee_stun.png',
  },
  {
    type: 'monster',
    name: 'Crimson Jack',
    filename: 'img/monster_cj.png',
  },
  {
    type: 'monsterStun',
    name: 'Crimson Jack (stunned)',
    filename: 'img/monster_cj_stun.png',
  },
  {
    type: 'monster',
    name: 'Demon Lord',
    filename: 'img/monster_demonlord.png',
  },
  {
    type: 'monsterStun',
    name: 'Demon Lord (stunned)',
    filename: 'img/monster_demonlord_stun.png',
  },
  {
    type: 'monster',
    name: 'Dracula',
    filename: 'img/monster_dracula.png',
  },
  {
    type: 'monsterStun',
    name: 'Dracula (stunned)',
    filename: 'img/monster_dracula_stun.png',
  },
  {
    type: 'monster',
    name: 'Dragon',
    filename: 'img/monster_dragon.png',
  },
  {
    type: 'monsterStun',
    name: 'Dragon (stunned)',
    filename: 'img/monster_dragon_stun.png',
  },
  {
    type: 'monster',
    name: 'Frankenstein\u2019s Monster',
    filename: 'img/monster_frankensteind.png',
  },
  {
    type: 'monsterStun',
    name: 'Frankenstein\u2019s Monster (stunned)',
    filename: 'img/monster_frankenstein_stun.png',
  },
  {
    type: 'monster',
    name: 'Mummy',
    filename: 'img/monster_mummy.png',
  },
  {
    type: 'monsterStun',
    name: 'Mummy (stunned)',
    filename: 'img/monster_mummy_stun.png',
  },
  {
    type: 'monster',
    name: 'Ouroboros Head (closed)',
    filename: 'img/monster_ouro_1.png',
  },
  {
    type: 'monster',
    name: 'Ouroboros Head (open)',
    filename: 'img/monster_ouro_2.png',
  },
  {
    type: 'monsterStun',
    name: 'Ouroboros Head (stunned)',
    filename: 'img/monster_ouro_stun.png',
  },
  {
    type: 'monster',
    name: 'Spider',
    filename: 'img/monster_spider.png',
  },
  {
    type: 'monsterStun',
    name: 'Spider (stunned)',
    filename: 'img/monster_spider_stun.png',
  },
  {
    type: 'monster',
    name: 'Witch',
    filename: 'img/monster_witch.png',
  },
  {
    type: 'monsterStun',
    name: 'Witch (stunned)',
    filename: 'img/monster_witch_stun.png',
  },
  {
    type: 'monster',
    name: 'Zombie Lord',
    filename: 'img/monster_zombielord.png',
  },
  {
    type: 'monsterStun',
    name: 'Zombie Lord (stunned)',
    filename: 'img/monster_zombielord_stun.png',
  },
  {
    type: 'counter',
    name: 'Blue Zombie',
    filename: 'img/counter_blue.png',
  },
  {
    type: 'counterStun',
    name: 'Blue Zombie (stunned)',
    filename: 'img/counter_blue_stun.png',
  },
  {
    type: 'counter',
    name: 'Green Tentacle',
    filename: 'img/counter_green.png',
  },
  {
    type: 'counterStun',
    name: 'Green Tentacle (stunned)',
    filename: 'img/counter_green_stun.png',
  },
  {
    type: 'counter',
    name: 'Orange Ooze',
    filename: 'img/counter_Orange.png',
  },
  {
    type: 'counterStun',
    name: 'Orange Ooze (stunned)',
    filename: 'img/counter_Orange_stun.png',
  },
  {
    type: 'counter',
    name: 'Pink Kali',
    filename: 'img/counter_pink.png',
  },
  {
    type: 'counterStun',
    name: 'Pink Kali (stunned)',
    filename: 'img/counter_pink_stun.png',
  },
  {
    type: 'counter',
    name: 'Purple Cultist',
    filename: 'img/counter_purple.png',
  },
  {
    type: 'counterStun',
    name: 'Purple Cultist (stunned)',
    filename: 'img/counter_purple_stun.png',
  },
  {
    type: 'counter',
    name: 'Red Cat',
    filename: 'img/counter_red.png',
  },
  {
    type: 'counterStun',
    name: 'Red Cat (stunned)',
    filename: 'img/counter_red_stun.png',
  },
  {
    type: 'counter',
    name: 'Yellow Claw',
    filename: 'img/counter_yellow.png',
  },
  {
    type: 'counterStun',
    name: 'Yellow Claw (stunned)',
    filename: 'img/counter_yellow_stun.png',
  },
  {
    type: 'square',
    name: 'Below Collapsed Room',
    filename: 'img/sq_below_c_r.png',
  },
  {
    type: 'square',
    name: 'Blessing',
    filename: 'img/sq_blessing.png',
  },
  {
    type: 'square',
    name: 'Closet',
    filename: 'img/sq_closet.png',
  },
  {
    type: 'square',
    name: 'Drip',
    filename: 'img/sq_drip.png',
  },
  {
    type: 'square',
    name: 'Safe',
    filename: 'img/sq_safe.png',
  },
  {
    type: 'square',
    name: 'Secret Passage',
    filename: 'img/sq_secret_passage.png',
  },
  {
    type: 'square',
    name: 'Secret Stairs',
    filename: 'img/sq_secret_stairs.png',
  },
  {
    type: 'square',
    name: 'Skeleton',
    filename: 'img/sq_skeleton.png',
  },
  {
    type: 'square',
    name: 'Slide',
    filename: 'img/sq_slide.png',
  },
  {
    type: 'square',
    name: 'Smoke',
    filename: 'img/sq_smoke.png',
  },
  {
    type: 'square',
    name: 'Valut Empty',
    filename: 'img/sq_vault_empty.png',
  },
  {
    type: 'square',
    name: 'Wall Switch',
    filename: 'img/sq_wall_switch.png',
  },
  {
    type: 'pentagon',
    name: 'Pentagon Item',
    filename: 'img/pentagon_item.png',
  },
  {
    type: 'triangle',
    name: 'Roll Knowledge',
    filename: 'img/roll_knowledge.png',
  },
  {
    type: 'triangle',
    name: 'Roll Might',
    filename: 'img/roll_might.png',
  },
  {
    type: 'triangle',
    name: 'Roll Sanity',
    filename: 'img/roll_sanity.png',
  },
];
