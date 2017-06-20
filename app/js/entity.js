
var Entity = {

};

Entity.createCube = function( myColor, scale, pos, rotation) {

    pos = pos || new THREE.Vector3( 0, 0, 0 );
    rotation = rotation || new THREE.Vector3( 0, 1, 0 );

    var geometry = new THREE.BoxGeometry( scale.x, scale.y, scale.z );
    var material = new THREE.MeshLambertMaterial( { color: myColor } );
    var cube = new THREE.Mesh( geometry, material );
    Utils.setXYZ(cube.position, pos);
    Utils.setXYZ(cube.rotation, rotation);

    return cube;
};

Entity.generateEntity = function(id, x, z) {

    if (id === 1) {
        return [Entity.createCube(0x343A44, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 2) {
        return [Entity.createCube(0x344244, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 3) {
        return [Entity.createCube(0x363444, new THREE.Vector3( 1, 3, 1 ), new THREE.Vector3( x, 0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 4) {
        var ground = Entity.createCube(0x343A44, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var stick = Entity.createCube(0x443023, new THREE.Vector3( 0.1, 2, 0.1 ), new THREE.Vector3( x, 1, z ), new THREE.Vector3(0,0,0));
        var lantern = Entity.createCube(0xfcc623, new THREE.Vector3( 0.2, 0.2, 0.2 ), new THREE.Vector3( x, 2, z ), new THREE.Vector3(0,0,0));
        var light = Light.createPointLight(0xfcc623, 1, 7, new THREE.Vector3( x, 2, z ));

        return [ground, stick, lantern, light];
    } else if (id === 5) {
        var ground = Entity.createCube(0x343A44, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var bigRockCube = Entity.createCube(0x9abad3, new THREE.Vector3(0.3,0.14,0.2),new THREE.Vector3(x-0.3,0.07,z-0.3), new THREE.Vector3(0,0,0));
        var smallBigRockCube = Entity.createCube(0x9abad3, new THREE.Vector3(0.2,0.1,0.20),new THREE.Vector3(x+0.2,0.05,z-0.2), new THREE.Vector3(0,0,0));
        var smallRockCube = Entity.createCube(0x9abad3, new THREE.Vector3(0.12,0.08,0.21), new THREE.Vector3(x-0.15,0.04,z+0.3), new THREE.Vector3(0,0,0));

        var light = Light.createPointLight(0xc9e6fc, 1, 10, new THREE.Vector3( x, 0.2, z ));

        return [ground, bigRockCube, smallBigRockCube, smallRockCube, light];
    } else {
        return [];
    }
}
