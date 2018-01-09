class Character():
    speed = 0
    might = 0
    sanity = 0
    knowledge = 0

    def __init__(self, name):
        self.name = name
        self.hand = []

    def toDict(self):
        return {
            'name': self.name,
            'speed': self.speed,
            'might': self.might,
            'sanity': self.sanity,
            'knowledge': self.knowledge,
            'hand': self.hand,
        }


class Game():
    def __init__(self, name):
        self.name = name
        self.floors = {
            'basement': [],
            'ground': [],
            'upper': [],
        }
        self.characters = []

    def toDict(self):
        return {
            'name': self.name,
            'floors': self.floors,
            'characters': [c.toDict for c in self.characters],
        }
