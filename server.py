from functools import wraps
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, emit
from BatHH import Game

app = Flask(__name__)
app.config['SECRET_KEY'] = '\x0e\x94p\xcc\xcfeB\x1d\x1b7\x8e\xba\xd2\xf4\xd6\xea\xf5\x80\xbe\xe0e\xbe\x90m'
socketio = SocketIO(app)


games = {}


def game(f):
    """
    Wraps a function that requires an active game, extracts game and data from
    the message
    """
    @wraps(f)
    def wrapper(message):
        try:
            game = games[message['game']]
        except Exception as e:
            print(message)
            raise(e)
        if 'data' in message:
            return f(game, message['data'])
        else:
            return f(game)
    return wrapper



@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def connect():
    print('{} connected'.format(request.sid))


@socketio.on('join')
def join(message):
    game = message['game']
    print('{} joined game {}'.format(request.sid, game))
    join_room(game)
    if game not in games:
        games[game] = Game(game)


# DEBUG
@socketio.on('echo-game')
@game
def echo_game(game):
    print('{} requested game data {}'.format(request.sid, game.name))
    emit('echo', {'data': game.toDict()})


@socketio.on('character-select')
@game
def character_select(game, data):
    character = data['character']
    print('{} in {} selected {}'.format(request.sid, game.name, character))
    game.addCharacter(character)


@socketio.on('update-haunt')
@game
def update_haunt(game, data):
    haunt = data['index']['x']
    print('{} updated the haunt level to {}'.format(request.sid, haunt))
    game.haunt = haunt
    emit('update-haunt', {'data': data}, room=game.name,
         include_self=False)


@socketio.on('update-attribute')
@game
def update_attributes(game, data):
    character = data['character']
    attribute = data['attribute']
    value = data['value']
    print('{} updated {}.{} to {}'.format(request.sid, character, attribute,
          value))
    game.characters[character][attribute] = value
    emit('update-attribute', {'data': data}, room=game.name,
         include_self=False)


@socketio.on('add-tile')
@game
def add_tile(game, data):
    floor = data['floor']
    id = data['id']
    tile = data['tile']
    print('{} added tile {} ({}) to {}'.format(request.sid, tile, id, floor))
    game.floors[floor].append({
        'tile': tile,
        'id': id,
        'rotate': 0,
        'x': 0,
        'y': 0,
        })
    emit('add-tile', {'data': data}, room=game.name, include_self=False)


@socketio.on('remove-tile')
@game
def remove_tile(game, data):
    floor = data['floor']
    id = data['id']
    print('{} removed tile {} from {}'.format(request.sid, id, floor))
    tile = game.getTile(floor, id)
    if (tile):
        game.floors[floor].remove(tile)
        emit('remove-tile', {'data': data}, room=game.name, include_self=False)
    else:
        pass


@socketio.on('rotate-tile')
@game
def rotate_tile(game, data):
    floor = data['floor']
    id = data['id']
    rotate = data['rotate']
    print('{} rotated tile {} from {} to {}'.format(request.sid, id, floor,
          rotate))
    tile = game.getTile(floor, id)
    tile['rotate'] = rotate
    emit('rotate-tile', {'data': data}, room=game.name, include_self=False)


@socketio.on('move-tile')
@game
def move_tile(game, data):
    floor = data['floor']
    id = data['id']
    index = data['index']
    print('{} moved tile {} from {} to {}'.format(request.sid, id, floor,
          index))
    tile = game.getTile(floor, id)
    tile['x'] = index['x']
    tile['y'] = index['y']
    emit('move-tile', {'data': data}, room=game.name, include_self=False)


if __name__ == '__main__':
    socketio.run(app, debug=True)
