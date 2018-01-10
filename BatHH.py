class Game():
    def __init__(self, name):
        self.name = name
        self.floors = {
            'basement': [],
            'ground': [],
            'upper': [],
        }
        self.characters = {}

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

    def toDict(self):
        return {
            'name': self.name,
            'floors': self.floors,
            'characters': self.characters,
        }
