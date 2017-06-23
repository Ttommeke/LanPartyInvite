var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-4);
document.body.appendChild( renderer.domElement );
var TimeClock = new THREE.Clock();
var fpsCounter = new Stats();
fpsCounter.showPanel(0);
document.body.appendChild( fpsCounter.dom );

Audio.initAudioContext();

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
	var aDownEvent = Events.keys["a"].readOutUpdate();

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

			if (Player.playerList[Player.playerId].dancingAudio !== undefined) {
				Player.playerList[Player.playerId].dancingAudio.audioSource.stop();
			}

			Player.playerList[Player.playerId].dancingAudio = Audio.createAudio(Audio.audioList.dance);
			Utils.setXYZAudioObjectToXYZPosition(Player.playerList[Player.playerId].dancingAudio.audioPannerNode, Player.playerList[Player.playerId].playerCube.position);
			Player.playerList[Player.playerId].dancingAudio.audioSource.start(0);
		}
		if (!spaceDownEvent.pressed && spaceDownEvent.updated) {

			Player.playerList[Player.playerId].dancing = false;
			SocketInfo.socket.emit("stop dance", { id: Player.playerId } );

			Player.playerList[Player.playerId].dancingAudio.audioSource.stop();
		}


		if (aDownEvent.pressed && aDownEvent.updated) {


		}
		if (!aDownEvent.pressed && aDownEvent.updated) {


		}

		var positionListener = {
			x: Player.playerList[Player.playerId].playerCube.position.x,
			y: Player.playerList[Player.playerId].playerCube.position.y + 0.3,
			z: Player.playerList[Player.playerId].playerCube.position.z
		};

		Utils.setXYZAudioObjectToXYZPosition( Audio.audioContext.listener, positionListener);

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
			Utils.setXYZAudioObjectToXYZPosition(Player.playerList[player].dancingAudio.audioPannerNode, Player.playerList[player].playerCube.position);
			Animation.danceAnimation(Player.playerList[player].playerCube, TimeClock.elapsedTime);
			Animation.dancingLights(Player.playerList[player], TimeClock.elapsedTime);
		} else {
			Animation.stopDancingLights(Player.playerList[player]);
		}
	}

	renderer.render( scene, Camera.camera );
	fpsCounter.end();

	requestAnimationFrame( render );
};

var modulesToLoad = 0;
var modulesLoaded = 0;

var loadModuleDone = function() {
	modulesLoaded++;

	if (modulesLoaded >= modulesToLoad) {
		TimeClock.getDelta();
		render();
	}
};

$.getJSON("map.json", function(data) {

	Camera.camera.rotation.order = "YXZ";

	Camera.camera.position.x = 3;
	Camera.camera.position.y = 2;
	Camera.camera.position.z = 7;
	Camera.camera.rotation.x = -Math.PI/4;
	Camera.camera.rotation.y = Math.PI*1/8;

	modulesToLoad += data.lights.length;
	for (var audio in data.audio) {
		modulesToLoad += 1;
	};
	modulesToLoad += 1; //for the rendering of all the blocks


	data.lights.forEach(function(light) {
		scene.add(Light.generateLight(light));
		loadModuleDone();
	});

	for (var audio in data.audio) {
		Audio.loadAudio(audio, data.audio[audio]).then(function() {
			loadModuleDone();
		});
	}

	var emap = Map.generateMapFromNumberMap(data.map);
	Map.loadMapInScene(emap, scene);

	Map.map = emap;

	renderer.setClearColor( Utils.stringHexToHex( data.clearcolor ), 1 );

	loadModuleDone();
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
