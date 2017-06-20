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
        var dancingLightRed = Light.createPointLight( 0xFF0000, 0, 5, data.position);
        var dancingLightGreen = Light.createPointLight( 0x00FF00, 0, 5, data.position);
        var dancingLightBlue = Light.createPointLight( 0x0000FF, 0, 5, data.position);

        data.redDancingLight = dancingLightRed;
        data.greenDancingLight = dancingLightGreen;
        data.blueDancingLight = dancingLightBlue;

        data.playerCube = playerCube;
        data.wantedPosition = { x: 0, z: 0 };
        Player.addPlayerToList(data, Player.playerList);
        scene.add(data.playerCube);
        scene.add(data.redDancingLight);
        scene.add(data.greenDancingLight);
        scene.add(data.blueDancingLight);
    });

    SocketInfo.socket.on("startup info",function(data) {

        for (var player in Player.playerList) {
            scene.remove(Player.playerList[player].playerCube);
            delete Player.playerList[player];
    	}

        var players = data.playerList;

        for (var i = 0; i < players.length; i++) {
            var playerCube = Player.generatePlayerCube(players[i].color, players[i].position);
            var dancingLightRed = Light.createPointLight( 0xFF0000, 0, 15, players[i].position);
            var dancingLightGreen = Light.createPointLight( 0x00FF00, 0, 15, players[i].position);
            var dancingLightBlue = Light.createPointLight( 0x0000FF, 0, 15, players[i].position);

            players[i].redDancingLight = dancingLightRed;
            players[i].greenDancingLight = dancingLightGreen;
            players[i].blueDancingLight = dancingLightBlue;

            players[i].playerCube = playerCube;
            players[i].wantedPosition = players[i].position;
            Player.addPlayerToList(players[i], Player.playerList);
            scene.add(players[i].playerCube);
            scene.add(players[i].redDancingLight);
            scene.add(players[i].greenDancingLight);
            scene.add(players[i].blueDancingLight);
        }

        Player.playerId = data.playerData.id;
    });

    SocketInfo.sendNewPosition = function(position) {
        SocketInfo.socket.emit("move", position);
    };

};
