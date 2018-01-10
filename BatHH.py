from flask_socketio import emit


class Game():
    def __init__(self, name):
        self.name = name
        self.floors = {
            'basement': [],
            'ground': [],
            'upper': [],
        }
        self.characters = {}
        self.haunt = 0
        self.begun = False

    def addCharacter(self, name):
        if name not in self.characters:
            self.characters[name] = {
                'speed': 0,
                'might': 0,
                'sanity': 0,
                'knowledge': 0,
                'hand': []
            }
        self.emit_character_state(name)

    def getTile(self, floor, id):
        tiles = [t for t in self.floors[floor] if t['id'] == id]
        if not tiles:
            return None
        if len(tiles) > 1:
            raise KeyError('more than one tile with the same id!')
        else:
            return tiles[0]

    def toDict(self):
        return {
            'name': self.name,
            'floors': self.floors,
            'characters': self.characters,
        }

    def emit_game_state(self):
        emit('update-haunt', {'data': {'index': {'x': self.haunt, 'y': 0}}})
        for floor in self.floors:
            for tile in self.floors[floor]:
                emit(
                    'add-tile',
                    {'data': {
                        'floor': floor,
                        'id': tile['id'],
                        'tile': tile['tile'],
                    }})
                emit(
                    'move-tile',
                    {'data': {
                        'floor': floor,
                        'id': tile['id'],
                        'index': {'x': tile['x'], 'y': tile['y']}
                    }})
                emit(
                    'rotate-tile',
                    {'data': {
                        'floor': floor,
                        'id': tile['id'],
                        'rotate': tile['rotate'],
                    }})

    def emit_character_state(self, character):
        for attr in ['speed', 'might', 'sanity', 'knowledge']:
            emit(
                'update-attribute',
                {'data': {
                    'character': character,
                    'attribute': attr,
                    'value': self.characters[character][attr],
                }})
        for card in self.characters[character]['hand']:
            emit(
                'add-hand-card',
                {'data': {
                    'character': character,
                    'card': card['name'],
                    'id': card['id'],
                }})
