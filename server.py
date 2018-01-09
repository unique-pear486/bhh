from flask import Flask, render_template, request
from flask_socketio import SocketIO, join_room, emit
from BatHH import Game

app = Flask(__name__)
app.config['SECRET_KEY'] = '\x0e\x94p\xcc\xcfeB\x1d\x1b7\x8e\xba\xd2\xf4\xd6\xea\xf5\x80\xbe\xe0e\xbe\x90m'
socketio = SocketIO(app)


games = {}


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('connect')
def connect():
    print('{} connected'.format(request.sid))


@socketio.on('join')
def join(message):
    room = message['room']
    print('{} joined room {}'.format(request.sid, room))
    join_room(room)
    if room not in games:
        games[room] = Game(room)
    emit('new_game', {'data': games[room].toDict()})


# DEBUG
@socketio.on('echo-game')
def echo_game(message):
    room = message['room']
    print('{} requested game data {}'.format(request.sid, room))
    emit('echo', {'data': games[room].toDict()})


@socketio.on('character-select')
def character_select(message):
    room = message['room']
    data = message['data']
    print('{} in {} selected {}'.format(request.sid, room, data['character']))


if __name__ == '__main__':
    socketio.run(app, debug=True)
