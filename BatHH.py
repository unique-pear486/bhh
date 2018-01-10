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

    def addCharacter(self, name):
        if name in self.characters:
            return
        else:
            self.characters[name] = {
                'speed': 0,
                'might': 0,
                'sanity': 0,
                'knowledge': 0,
                'hand': []
            }

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
