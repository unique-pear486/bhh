# Betrayal at House on the Hill
Betrayal at House on the Hill is a great boardgame from Wizards of the Coast and Avalon Hill.
You explore a haunted mansion, gathering useful items and building the house around you as you explore. Only, at some point,
one of the players will inevitably betray the others in one of 50 random ways (in the base game). Wil Wheaton and Geek and Sundry
have a youtube video [here](https://www.youtube.com/watch?v=MINNKyE4fjs) if you want to see what it's all about.

This repo contains the python server for an online multiplayer version of the game. It uses SocketIO as the main transport
which gives you real-time collaboration with the other players. None of the rules are enforced, you'll have to do that 
youselves.

## Installing
### Development
Clone this repo with `git clone https://github.com/unique-pear486/bhh.git` initialise the pipenv in the folder with
`pipenv install; pipenv shell` then run the server `python server.py`. You should be able to see the game on localhost port 5060.

### On a webserver
I use Centos and nginx on my webserver, so I've included the config files for reference.

Clone this repo onto your web server with:
```sh
mkdir -p /var/www/bhh
git clone https://github.com/unique-pear486/BaHH.git /var/www/bhh
```

**Centos 6**

On Centos 6 you need to install python 2.7 via the SCL, and use an init.d file to run the server as a daemon.
See `/conf/init.d.conf` for details.

**Centos 7**

Centos 7 comes with a more up-to-date version of python, so it is simpler.
```sh
cd /var/www/bhh
venv .venv
. .venv/bin/activate
pip install -r requirements.txt
deactivate
```

You'll need to adjust `bhh.service` (in particular, the service user name `wiki`), and place it in `/etc/systemd/system/`.
And adjust `nginx.conf` (in particular the servername `localhost`) and save it as `/etc/nginx/conf.d/bhh.conf` or similar

## Images
You will still need a copy of the game to play this. You can either scan in the images and replace the placeholders in
`/static/img`, or just look at the cards as you play.

Also, in `/static/pdf` you should replace each of the files with the relevant pages from the Traitor's Tome, Secrets of Survival
and the base Rulebook.

## Licence
These files are covered by the MIT License, see `LICENSE`.

Betrayal at House on the Hill is owned by Wizards of the Coast and Avalon Hill.
