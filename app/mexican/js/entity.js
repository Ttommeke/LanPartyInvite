
var Entity = {
    "Colors": {
        "GROUND_GRAY": 0x5e5748,//0xa39475,//0x343A44,
        "WALL_GRAY": 0x6b6354,//0x363444,
        "GLOW_STONE": 0x9abad3,
        "TORCH_GLOW": 0xfcc623,
        "SAND_STONE": 0xddd8af
    }
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
        return [Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 2) {
        return [Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 3) {
        return [Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 1, 3.3, 1 ), new THREE.Vector3( x, 0.65, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 4) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var stick = Entity.createCube(0x443023, new THREE.Vector3( 0.1, 2, 0.1 ), new THREE.Vector3( x, 1, z ), new THREE.Vector3(0,0,0));
        var lantern = Entity.createCube(Entity.Colors.TORCH_GLOW, new THREE.Vector3( 0.2, 0.2, 0.2 ), new THREE.Vector3( x, 2, z ), new THREE.Vector3(0,0,0));
        var light = Light.createPointLight(Entity.Colors.TORCH_GLOW, 0.6, 7, new THREE.Vector3( x, 2.3, z ));

        return [ground, stick, lantern, light];
    } else if (id === 5) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var bigRockCube = Entity.createCube(Entity.Colors.GLOW_STONE, new THREE.Vector3(0.3,0.14,0.2),new THREE.Vector3(x-0.3,0.07,z-0.3), new THREE.Vector3(0,0,0));
        var smallBigRockCube = Entity.createCube(Entity.Colors.GLOW_STONE, new THREE.Vector3(0.2,0.1,0.20),new THREE.Vector3(x+0.2,0.05,z-0.2), new THREE.Vector3(0,0,0));
        var smallRockCube = Entity.createCube(Entity.Colors.GLOW_STONE, new THREE.Vector3(0.12,0.08,0.21), new THREE.Vector3(x-0.15,0.04,z+0.3), new THREE.Vector3(0,0,0));

        var light = Light.createPointLight(Entity.Colors.GLOW_STONE, 1, 10, new THREE.Vector3( x, 0.2, z ));

        return [ground, bigRockCube, smallBigRockCube, smallRockCube, light];
    } else if (id === 6) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var lampHolder = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3(0.7,1.1,0.7),new THREE.Vector3(x,0.6,z), new THREE.Vector3(0,0,0));
        var lamp = Entity.createCube(Entity.Colors.GLOW_STONE, new THREE.Vector3(0.5,0.2,0.5), new THREE.Vector3(x,1.2,z), new THREE.Vector3(0,0,0));

        var light = Light.createPointLight(Entity.Colors.GLOW_STONE, 1, 10, new THREE.Vector3( x, 1.5, z ));

        return [ground, lampHolder, lamp, light];
    } else if (id === 7) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var head = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 1, 0.3, 1 ), new THREE.Vector3( x, 2.15, z ), new THREE.Vector3(0,0,0));

        return [ground, head];
    } else if (id === 8) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var head = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 1, 0.3, 1 ), new THREE.Vector3( x, 2.15, z ), new THREE.Vector3(0,0,0));
        var headBroken = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 0.4, 0.15, 1 ), new THREE.Vector3( x-0.3, 1.93, z ), new THREE.Vector3(0,0,0));
        var headBroken2 = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 0.2, 0.2, 1 ), new THREE.Vector3( x+0.4, 1.9, z ), new THREE.Vector3(0,0,0));
        var groundBroken = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 0.3, 0.2, 1 ), new THREE.Vector3( x+0.35, 0.1, z ), new THREE.Vector3(0,0,0));
        var groundBroken2 = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 0.3, 0.15, 1 ), new THREE.Vector3( x-0.35, 0.07, z ), new THREE.Vector3(0,0,0));

        return [ground, head, headBroken, groundBroken, groundBroken2, headBroken2];
    } else if (id === 9) {
        return [Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, 0.5, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 10) {
        return [Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 5.5, 0.8 ), new THREE.Vector3( x, 1.75, z ), new THREE.Vector3(0,0,0))];
    } else if (id === 11) {
        var topArch = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 0.8 ), new THREE.Vector3( x, 4, z ), new THREE.Vector3(0,0,0));
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 0.8 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var teleportStone = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 3.5, 0.8 ), new THREE.Vector3( x, 1.75, z ), new THREE.Vector3(0,0,0));

        return [topArch, ground, teleportStone];
    }else if (id === 12) {
        var ground = Entity.createCube(Entity.Colors.GROUND_GRAY, new THREE.Vector3( 1, 1, 1 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));
        var button = Entity.createCube(Entity.Colors.WALL_GRAY, new THREE.Vector3( 0.7, 1.2, 0.7 ), new THREE.Vector3( x, -0.5, z ), new THREE.Vector3(0,0,0));

        return [ground, button];
    } else {
        return [];
    }
}
