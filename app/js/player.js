var Player = {
    playerList: {},
    playerId: -1
};

Player.checkCubeCollision = function(map,x,z) {
    var xToUse = x;
    var zToUse = z;

    if (xToUse < 0 || zToUse < 0 || zToUse >= map.length || xToUse >= map[zToUse].length
        || map[zToUse][xToUse].id == 0 ||  map[zToUse][xToUse].id == 3 || map[zToUse][xToUse].id == 6 ) {
        return true;
    }
    else {
        return false;
    }
};

Player.generatePlayerCube = function(color, position) {
    var cube = Entity.createCube(Utils.rgbToHex(color), new THREE.Vector3( 0.8, 1.8, 0.8 ), new THREE.Vector3( position.x, 0.9, position.z ), new THREE.Vector3(0,0,0));

    return cube;
};

Player.addPlayerToList = function(playerInfo, playerList) {
    playerList[playerInfo.id] = playerInfo;
};
