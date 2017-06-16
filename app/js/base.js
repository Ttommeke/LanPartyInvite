var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-4);
document.body.appendChild( renderer.domElement );
var TimeClock = new THREE.Clock();
var fpsCounter = new Stats();
fpsCounter.showPanel(0);
document.body.appendChild( fpsCounter.dom );

var render = function() {
	fpsCounter.begin();
	var deltaTime = TimeClock.getDelta();

	var arrowLeftEvent = Events.keys.ArrowLeft.readOutUpdate();
	var arrowRightEvent = Events.keys.ArrowRight.readOutUpdate();
	var arrowUpEvent = Events.keys.ArrowUp.readOutUpdate();
	var arrowDownEvent = Events.keys.ArrowDown.readOutUpdate();

	if (Player.playerId !== -1) {
		var x = Player.playerList[Player.playerId].wantedPosition.x;
		var z = Player.playerList[Player.playerId].wantedPosition.z;

		if (arrowRightEvent.pressed && arrowRightEvent.updated && !Player.checkCubeCollision(Map.map,x + 1, z)) {

			Player.playerList[Player.playerId].wantedPosition.x += 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowLeftEvent.pressed && arrowLeftEvent.updated && !Player.checkCubeCollision(Map.map,x - 1, z)) {

			Player.playerList[Player.playerId].wantedPosition.x -= 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowUpEvent.pressed && arrowUpEvent.updated && !Player.checkCubeCollision(Map.map,x, z - 1)) {

			Player.playerList[Player.playerId].wantedPosition.z -= 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowDownEvent.pressed && arrowDownEvent.updated && !Player.checkCubeCollision(Map.map,x, z + 1)) {

			Player.playerList[Player.playerId].wantedPosition.z += 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}

		Camera.moveCamera(Camera.camera, {
			position: new THREE.Vector3(
				Player.playerList[Player.playerId].playerCube.position.x + 3,
				Player.playerList[Player.playerId].playerCube.position.y + 5,
				Player.playerList[Player.playerId].playerCube.position.z + 5
			)
		}, deltaTime, Camera.speed);
	}

	for (var player in Player.playerList) {
		Utils.movePosition(Player.playerList[player].playerCube, Player.playerList[player].wantedPosition, deltaTime);
	}

	renderer.render( scene, Camera.camera );
	fpsCounter.end();

	requestAnimationFrame( render );
}

$.getJSON("map.json", function(data) {

	Camera.camera.rotation.order = "YXZ";

	Camera.camera.position.x = 3;
	Camera.camera.position.y = 2;
	Camera.camera.position.z = 7;
	Camera.camera.rotation.x = -Math.PI/4;
	Camera.camera.rotation.y = Math.PI*1/8;

	data.lights.forEach(function(light) {
		scene.add(Light.generateLight(light));
	});

	var emap = Map.generateMapFromNumberMap(data.map);
	Map.loadMapInScene(emap, scene);

	Map.map = emap;

	renderer.setClearColor( Utils.stringHexToHex( data.clearcolor ), 1 );

	TimeClock.getDelta();
	render();
});

//hide "Loading"-div
$.mobile.loading().hide();

$( function() {
    $('#bodyId').on("vmousedown", function(event) {
        Events.mouseDownEvent(event);
    });
    $('#bodyId').on("vmousemove", function(event) {
		Events.mouseMove(event);
    });
    $('#bodyId').on("vmouseup", function(event) {
		Events.mouseUpEvent(event);
    });
});

SocketInfo.initSocket();

renderer.domElement.addEventListener('mousewheel',function(event){ Events.scrollEvent(event); }, false);
renderer.domElement.addEventListener("DOMMouseScroll",function(event){ Events.scrollEvent(event); }, false);
