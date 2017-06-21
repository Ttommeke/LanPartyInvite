
var Animation = {
    DANCE_CYCLE_TIME: 0.85,
    DANCE_LIGHT_CYCLE_TIME: 0.85
};

Animation.danceAnimation = function( cube, elapseTime) {
    var cycleTime = Animation.DANCE_CYCLE_TIME;
    var difference = (elapseTime%cycleTime) / cycleTime;

    var scaleY = 1 + Math.sin(difference*Math.PI*2)/2;
    cube.scale.y = scaleY;
    cube.scale.x = 1 / (scaleY);
    cube.scale.z = 1 / (scaleY);
    cube.position.y = (1.8 * scaleY) / 2;
};

Animation.stopDancingLights = function(player) {

    player.redDancingLight.intensity = 0;
    player.greenDancingLight.intensity = 0;
    player.blueDancingLight.intensity = 0;
}

Animation.dancingLights = function(player, elapseTime) {
    var cycleTime = Animation.DANCE_LIGHT_CYCLE_TIME;
    var difference = (elapseTime%cycleTime) / cycleTime;

    if (difference < cycleTime/3) {
        Utils.setXYZ(player.redDancingLight.position, player.playerCube.position);

        player.redDancingLight.intensity = 1;
        player.greenDancingLight.intensity = 0;
        player.blueDancingLight.intensity = 0;
    } else if (difference < 2*cycleTime/3) {
        Utils.setXYZ(player.greenDancingLight.position, player.playerCube.position);

        player.redDancingLight.intensity = 0;
        player.greenDancingLight.intensity = 1;
        player.blueDancingLight.intensity = 0;
    } else {
        Utils.setXYZ(player.blueDancingLight.position, player.playerCube.position);

        player.redDancingLight.intensity = 0;
        player.greenDancingLight.intensity = 0;
        player.blueDancingLight.intensity = 1;
    }
};

Animation.movePosition = function( cube, positionWant, delta) {
    var posX = cube.position.x;
    var posZ = cube.position.z;
    var wanX = positionWant.x;
    var wanZ = positionWant.z;
    var deltaX = (wanX - posX);
    var deltaZ = (wanZ - posZ);

    cube.position.x = posX + deltaX * delta * 20;
    cube.position.z = posZ + deltaZ * delta * 20;

    var deltaAbs = Math.abs(deltaZ);
    if (deltaAbs < Math.abs(deltaX)) {
        deltaAbs = Math.abs(deltaX);
    }

    var scaleY = - 4 * Math.pow(deltaAbs,2) + 4 * deltaAbs + 1;

    cube.scale.y = scaleY;
    cube.scale.x = 1 / scaleY;
    cube.scale.z = 1 / scaleY;
    cube.position.y = scaleY*2 - 1;
}
