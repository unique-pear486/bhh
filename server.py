from functools import wraps
from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, leave_room, emit
from BatHH import Game
import logging

app = Flask(__name__)
app.config['SECRET_KEY'] = '\x0e\x94p\xcc\xcfeB\x1d\x1b7\x8e\xba\xd2\xf4\xd6\xea\xf5\x80\xbe\xe0e\xbe\x90m'
socketio = SocketIO(app)

games = {}
LOBBY = '_lobby'    # room name for the lobby


def game(f):
    """
    Wraps a function that requires an active game, extracts game and data from
    the message
    """
    @wraps(f)
    def wrapper(message):
        game = games[message.pop('game')]
        return f(game, **message)
    return wrapper


def check_game_name(name):
    """
    Game names cannot begin with _
    """
    while(name[0] == '_'):
        name = name[1:]
    if name == '':
        raise ValueError('game name must not be empty')
    return name


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def connect():
    logging.info(u'{} connected'.format(request.sid))


@socketio.on('get-games')
def get_games():
    game_list = [g for g in games]
    join_room(LOBBY)
    logging.info(u'{} requested games'.format(request.sid))
    logging.info(u'current games: {}'.format(game_list))
    emit('get-games', dict(games=game_list))


@socketio.on('delete-game')
def delete_game(message):
    game = message['game']
    logging.info(u'{} deleted {}'.format(request.sid, game))
    del(games[game])
    emit('get-games', dict(games=[g for g in games]), room=LOBBY)


@socketio.on('join')
def join(message):
    game = check_game_name(message['game'])
    logging.info(u'{} joined game {}'.format(request.sid, game))
    leave_room(LOBBY)
    join_room(game)
    if game not in games:
        games[game] = Game(game)
        emit('get-games', dict(games=[g for g in games]), room=LOBBY)
    games[game].emit_game_state()


# DEBUG
@socketio.on('echo-game')
@game
def echo_game(game):
    logging.info(u'{} requested game data {}'.format(request.sid, game.name))
    emit('echo', dict(data=game.toDict()))


@socketio.on('character-select')
@game
def character_select(game, character):
    logging.info(u'{} in {} selected {}'.format(request.sid, game.name,
                 character))
    game.addCharacter(character)


@socketio.on('update-haunt')
@game
def update_haunt(game, index):
    haunt = index['x']
    logging.info(u'{} updated the haunt level to {}'.format(request.sid, haunt))
    game.haunt = haunt
    emit('update-haunt', dict(index=index), room=game.name,
         include_self=False)


@socketio.on('update-attribute')
@game
def update_attributes(game, character, attribute, value):
    logging.info(u'{} updated {}.{} to {}'.format(request.sid, character,
                 attribute, value))
    game.characters[character][attribute] = value
    emit('update-attribute',
         dict(character=character, attribute=attribute, value=value),
         room=game.name,
         include_self=False)


@socketio.on('add-tile')
@game
def add_tile(game, floor, id, tile):
    logging.info(u'{} added tile {} ({}) to {}'.format(request.sid, tile, id,
                 floor))
    game.floors[floor].append(dict(
        tile=tile,
        id=id,
        rotate=0,
        x=0,
        y=0,
        ))
    emit('add-tile',
         dict(floor=floor, id=id, tile=tile),
         room=game.name,
         include_self=False)


@socketio.on('remove-tile')
@game
def remove_tile(game, floor, id):
    logging.info(u'{} removed tile {} from {}'.format(request.sid, id, floor))
    tile = game.getTile(floor, id)
    if (tile):
        game.floors[floor].remove(tile)
        emit('remove-tile',
             dict(floor=floor, id=id),
             room=game.name, include_self=False)
    else:
        pass


@socketio.on('rotate-tile')
@game
def rotate_tile(game, floor, id, rotate):
    logging.info(u'{} rotated tile {} from {} to {}'.format(request.sid, id,
                 floor, rotate))
    tile = game.getTile(floor, id)
    tile['rotate'] = rotate
    emit('rotate-tile',
         dict(floor=floor, id=id, rotate=rotate),
         room=game.name, include_self=False)


@socketio.on('move-tile')
@game
def move_tile(game, floor, id, index):
    logging.info(u'{} moved tile {} from {} to {}'.format(request.sid, id,
                 floor, index))
    tile = game.getTile(floor, id)
    tile['x'] = index['x']
    tile['y'] = index['y']
    emit('move-tile',
         dict(floor=floor, id=id, index=index),
         room=game.name, include_self=False)


@socketio.on('add-hand-card')
@game
def add_hand_card(game, character, card, id):
    logging.info(u'{} added card {} ({}) to {}'.format(request.sid, card, id,
                 character))
    game.characters[character]['hand'].append({'name': card, 'id': id})
    emit('add-hand-card',
         dict(character=character, card=card, id=id),
         room=game.name, include_self=False)


@socketio.on('remove-hand-card')
@game
def remove_hand_card(game, character, id):
    logging.info(u'{} removed card {} from {}'.format(request.sid, id,
                 character))
    cards = [c for c in game.characters[character]['hand'] if c['id'] == id]
    if (cards):
        game.characters[character]['hand'].remove(cards[0])
        emit('remove-hand-card',
             dict(character=character, id=id),
             room=game.name,
             include_self=False)
    else:
        pass


@socketio.on('begin-haunt')
@game
def begin_haunt(game):
    logging.info(u'{} began the haunt'.format(request.sid))
    if not game.begun:
        emit('begin-haunt', {}, room=game.name, include_self=False)
        game.begun = True


if __name__ == '__main__':
    print('running server on port 5060...')
    socketio.run(app, port=5060)
