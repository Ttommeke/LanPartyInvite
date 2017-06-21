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

	if (deltaTime > 1) {
		deltaTime = 1;
	}

	var arrowLeftEvent = Events.keys.ArrowLeft.readOutUpdate();
	var arrowRightEvent = Events.keys.ArrowRight.readOutUpdate();
	var arrowUpEvent = Events.keys.ArrowUp.readOutUpdate();
	var arrowDownEvent = Events.keys.ArrowDown.readOutUpdate();
	var spaceDownEvent = Events.keys[" "].readOutUpdate();

	if (Player.playerId !== -1) {
		var wantedPos = Player.playerList[Player.playerId].wantedPosition;


		if (arrowRightEvent.pressed && arrowRightEvent.updated && !Player.checkCubeCollision(Map.map,wantedPos.x + 1, wantedPos.z)) {

			Player.playerList[Player.playerId].wantedPosition.x += 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowLeftEvent.pressed && arrowLeftEvent.updated && !Player.checkCubeCollision(Map.map,wantedPos.x - 1, wantedPos.z)) {

			Player.playerList[Player.playerId].wantedPosition.x -= 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowUpEvent.pressed && arrowUpEvent.updated && !Player.checkCubeCollision(Map.map,wantedPos.x, wantedPos.z - 1)) {

			Player.playerList[Player.playerId].wantedPosition.z -= 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (arrowDownEvent.pressed && arrowDownEvent.updated && !Player.checkCubeCollision(Map.map,wantedPos.x, wantedPos.z + 1)) {

			Player.playerList[Player.playerId].wantedPosition.z += 1;
			SocketInfo.socket.emit("move", Player.playerList[Player.playerId].wantedPosition);
		}
		if (spaceDownEvent.pressed && spaceDownEvent.updated) {

			Player.playerList[Player.playerId].dancing = true;
			SocketInfo.socket.emit("dance", { id: Player.playerId } );
		}
		if (!spaceDownEvent.pressed && spaceDownEvent.updated) {

			Player.playerList[Player.playerId].dancing = false;
			SocketInfo.socket.emit("stop dance", { id: Player.playerId } );
		}

		Camera.moveCamera(Camera.camera, {
			position: new THREE.Vector3(
				wantedPos.x + 3,
				6,
				wantedPos.z + 5
			)
		}, deltaTime, Camera.speed);
	}

	for (var player in Player.playerList) {
		Animation.movePosition(Player.playerList[player].playerCube, Player.playerList[player].wantedPosition, deltaTime);
		if (Player.playerList[player].dancing) {
			Animation.danceAnimation(Player.playerList[player].playerCube, TimeClock.elapsedTime);
			Animation.dancingLights(Player.playerList[player], TimeClock.elapsedTime);
		} else {
			Animation.stopDancingLights(Player.playerList[player]);
		}
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
        //Events.mouseDownEvent(event);
    });
    $('#bodyId').on("vmousemove", function(event) {
		//Events.mouseMove(event);
    });
    $('#bodyId').on("vmouseup", function(event) {
		//Events.mouseUpEvent(event);
    });

	$('#upButton').on("vmousedown", function(event) {
        Button.up();
    });
	$('#upButton').on("vmouseup", function(event) {
		Button.upReleased();
    });

	$('#downButton').on("vmousedown", function(event) {
        Button.down();
    });
	$('#downButton').on("vmouseup", function(event) {
		Button.downReleased();
    });

	$('#leftButton').on("vmousedown", function(event) {
        Button.left();
    });
	$('#leftButton').on("vmouseup", function(event) {
		Button.leftReleased();
    });

	$('#danceButton').on("vmousedown", function(event) {
        Button.space();
    });
	$('#danceButton').on("vmouseup", function(event) {
		Button.spaceReleased();
    });

	$('#rightButton').on("vmousedown", function(event) {
        Button.right();
    });
	$('#rightButton').on("vmouseup", function(event) {
		Button.rightReleased();
    });
});

SocketInfo.initSocket();

renderer.domElement.addEventListener('mousewheel',function(event){ Events.scrollEvent(event); }, false);
renderer.domElement.addEventListener("DOMMouseScroll",function(event){ Events.scrollEvent(event); }, false);
