
var Text = {
    TEXT_COLOR: 0xc1c1c1,
    font: undefined
};


Text.loadFont = function(myFont) {
    Text.font = myFont;

    Text.initText();
};

Text.createText = function(text, size, color) {
    var geometry = new THREE.TextGeometry(text, {
            font: Text.font,
            size: size,
            height: size/2
        });
    var material = new THREE.MeshLambertMaterial({"color": color});
    var textM = new THREE.Mesh( geometry, material );

    return textM;
};

Text.initText = function() {
    var test = Text.createText( "testje...", 0.6, Text.TEXT_COLOR);
    test.position.set(0, 3, 0);
    scene.add(test);
};
