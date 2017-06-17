
var Animation = {

};

Animation.danceAnimation = function( cube, elapseTime) {
    var cycleTime = 0.85;
    var difference = (elapseTime%cycleTime) / cycleTime;

    var scaleY = 1 + Math.sin(difference*Math.PI*2)/2;
    cube.scale.y = scaleY;
    cube.scale.x = 1 / (scaleY);
    cube.scale.z = 1 / (scaleY);
    cube.position.y = (1.8 * scaleY) / 2;
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
