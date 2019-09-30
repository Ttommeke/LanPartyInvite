
var Utils = {

};

Utils.calculatePointFurtherAway = function(metersAway, startPoint, direction) {
    var beginPos = new THREE.Vector3(0,0,0);
    beginPos.copy(startPoint);

    var fakeMetersAway = Math.cos(direction.x) * metersAway
    beginPos.y += Math.sin(direction.x) * metersAway;

    beginPos.x -= Math.sin(direction.y) * fakeMetersAway;
    beginPos.z -= Math.cos(direction.y) * fakeMetersAway;

    return beginPos;
};

Utils.componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

Utils.rgbToHex = function(color) {
    return Utils.stringHexToHex("0x" + Utils.componentToHex(parseInt(color.red*256)) + Utils.componentToHex(parseInt(color.green*256)) + Utils.componentToHex(parseInt(color.blue*256)));
};

Utils.newVectorToNewVector = function(original, extra, direction) {
    var newV = new THREE.Vector3(0,0,0);
    newV.copy(original);
    var length = Math.sqrt(direction.x * direction.x + direction.z * direction.z) + 0.00000001;

    newV.x += extra * direction.x / length;
    newV.z += extra * direction.z / length;

    return newV;
};

Utils.setXYZ = function( toCopyTo, toCopy) {
    toCopyTo.x = toCopy.x;
    toCopyTo.y = toCopy.y;
    toCopyTo.z = toCopy.z;
};

Utils.setXYZAudioObjectToXYZPosition = function(audioObject, position) {
    audioObject.setPosition(position.x, position.y, position.z);
};

Utils.stringHexToHex = function(stringHex) {
    return parseInt(stringHex, 16);
};
