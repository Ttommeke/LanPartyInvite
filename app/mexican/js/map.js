
var Map = {
    map: [],
    magicDoors: [],
    magicDoorsOpen: false
};

Map.loadMapInScene = function(map, scene) {
    for (var x = 0; x < map.length; x++) {
        for (var z = 0; z < map[x].length; z++) {
            for (var entityNr = 0; entityNr < map[x][z].entities.length; entityNr++) {
                scene.add(map[x][z].entities[entityNr]);
            }
        }
    }
};

Map.generateMapFromNumberMap = function(numMap) {
    var bufMap = [];

    for (var z = 0; z < numMap.length; z++) {
        bufMap.push([]);
        for (var x = 0; x < numMap[z].length; x++) {
            var entity = Entity.generateEntity(numMap[z][x], x, z);
            bufMap[z].push({ id: numMap[z][x], entities: entity });

            if (numMap[z][x] == 11) {
                entity[2].material.transparent = true;
                Map.magicDoors.push(entity[2]);
            }
        }
    }

    return bufMap;
};
