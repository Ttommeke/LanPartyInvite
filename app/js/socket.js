"use strict";
var SocketInfo = {
    socket: undefined
};

SocketInfo.initSocket = function() {
    SocketInfo.socket = io();

    SocketInfo.socket.on("move", function(data){

        if (data.id != Player.playerId) {

            Player.playerList[data.id].wantedPosition.x = data.position.x;
            Player.playerList[data.id].wantedPosition.z = data.position.z;
        }
    });

    SocketInfo.socket.on("dance", function(data){
        Player.playerList[data.id].dancing = true;
    });

    SocketInfo.socket.on("stop dance", function(data){
        Player.playerList[data.id].dancing = false;
    });

    SocketInfo.socket.on("player left", function(data) {

        scene.remove(Player.playerList[data.id].playerCube);
        delete Player.playerList[data.id];
    });

    SocketInfo.socket.on("new player", function(data) {
        var playerCube = Player.generatePlayerCube(data.color, data.position);

        data.playerCube = playerCube;
        data.wantedPosition = { x: 0, z: 0 };
        Player.addPlayerToList(data, Player.playerList);
        scene.add(data.playerCube);
    });

    SocketInfo.socket.on("startup info",function(data) {

        for (var player in Player.playerList) {
            scene.remove(Player.playerList[player].playerCube);
            delete Player.playerList[player];
    	}

        var players = data.playerList;

        for (var i = 0; i < players.length; i++) {
            var playerCube = Player.generatePlayerCube(players[i].color, players[i].position);

            players[i].playerCube = playerCube;
            players[i].wantedPosition = players[i].position;
            Player.addPlayerToList(players[i], Player.playerList);
            scene.add(players[i].playerCube);
        }

        Player.playerId = data.playerData.id;
    });

    SocketInfo.sendNewPosition = function(position) {
        SocketInfo.socket.emit("move", position);
    };

};
