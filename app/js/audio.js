
var Audio = {
    audioContext: undefined,
    audioList: {

    }
};

Audio.initAudioContext = function() {
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    Audio.audioContext = new AudioContext();

};

Audio.loadAudio = function(name, fileName) {
    return new Promise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', fileName, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            Audio.audioContext.decodeAudioData(request.response, function(buffer) {
                Audio.audioList[name] = buffer;
                resolve();
            }, function() {
                reject();
            });
        };
        request.send();
    });
};

Audio.createAudio = function(audioBufferToPlay) {
    var source = Audio.audioContext.createBufferSource();
    var pannerNode = Audio.audioContext.createPanner();
    pannerNode.panningModel = 'HRTF';
    pannerNode.coneInnerAngle = 360;
    pannerNode.coneOuterAngle = 0;
    pannerNode.coneOuterGain = 0;

    pannerNode.setPosition(0,0,0);

    source.buffer = audioBufferToPlay;
    source.connect(pannerNode);
    pannerNode.connect(Audio.audioContext.destination);

    return { audioSource: source, audioPannerNode: pannerNode };
};
