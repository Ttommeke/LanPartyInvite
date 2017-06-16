
var Camera = {
    "camera": new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 ),
    "speed": 4,
    "distanceToCenter" : 4,
    "moveModus": {
        "ROTATE": "ROTATE",
        "MOVE": "MOVE"
    },
    "activeMoveModus": "ROTATE"
};

Camera.moveCamera = function(camera, cameraToMoveTo, deltaTime, speed) {

    var percentage = speed * deltaTime;

    Camera.goGraduatlyTowardsVector(camera.position, cameraToMoveTo.position, percentage);

};

Camera.thirdPersonRotateCamera = function(differenceX, differenceZ, camera, distanceToCenter, speed) {
    var focusPointToRotateAround = Utils.calculatePointFurtherAway(distanceToCenter, camera.position, camera.rotation);

    camera.rotation.x -= differenceZ*speed/window.innerHeight;
    camera.rotation.y -= differenceX*speed/window.innerWidth;
    if (camera.rotation.x > 1.57) {
        camera.rotation.x = 1.57;
    } else if (camera.rotation.x < -1.57) {
        camera.rotation.x = -1.57;
    }

    var newPositionOfCamera = Utils.calculatePointFurtherAway(-distanceToCenter, focusPointToRotateAround, camera.rotation);

    camera.position.copy(newPositionOfCamera);
};

Camera.goGraduatlyTowardsVector = function(v1, v2, percentage) {
    var difference = new THREE.Vector3(0,0,0);
    difference.subVectors(v2, v1);

    v1.x = v1.x + difference.x * percentage;
    v1.y = v1.y + difference.y * percentage;
    v1.z = v1.z + difference.z * percentage;
    //v1.addScaledVector(difference, percentage);
};

Camera.setCameraPositionAndRotation = function(cameraToSet, cameraJson) {
    Utils.setXYZ(cameraToSet.position, cameraJson.position);
	Utils.setXYZ(cameraToSet.rotation, cameraJson.rotation);
};
