
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
    /*var friend = Text.createText( "Explore with a", 0.4, Text.TEXT_COLOR);
    friend.position.set(1.5, 1.5, 1.35);
    friend.rotation.set(0, 0, 0);
    scene.add(friend);

    var withA = Text.createText( " friend", 0.4, Text.TEXT_COLOR);
    withA.position.set(1.5, 1.0, 1.35);
    withA.rotation.set(0, 0, 0);
    scene.add(withA);

    var dance = Text.createText( "dance", 0.4, Text.TEXT_COLOR);
    dance.position.set(0.35, 1.5, 9.2);
    dance.rotation.set(0, Math.PI/2, 0);
    scene.add(dance);

    var withDance = Text.createText( "with", 0.4, Text.TEXT_COLOR);
    withDance.position.set(0.35, 1.0, 9);
    withDance.rotation.set(0, Math.PI/2, 0);
    scene.add(withDance);

    var space = Text.createText( "space", 0.4, Text.TEXT_COLOR);
    space.position.set(0.35, 0.5, 9.2);
    space.rotation.set(0, Math.PI/2, 0);
    scene.add(space);

    var hour = Text.createText( "Doors 13h", 0.4, Text.TEXT_COLOR);
    hour.position.set(16.35, 1.5, 15);
    hour.rotation.set(0, Math.PI/2, 0);
    scene.add(hour);


    var bringYour = Text.createText( "bring", 0.4, Text.TEXT_COLOR);
    bringYour.position.set(17.5, 1.5, 1.35);
    bringYour.rotation.set(0, 0, 0);
    scene.add(bringYour);

    var laptop = Text.createText( " your laptop", 0.4, Text.TEXT_COLOR);
    laptop.position.set(17.5, 1.0, 1.35);
    laptop.rotation.set(0, 0, 0);
    scene.add(laptop);

    var euros = Text.createText( " and 5 euro", 0.4, Text.TEXT_COLOR);
    euros.position.set(17.5, 0.5, 1.35);
    euros.rotation.set(0, 0, 0);
    scene.add(euros);


    var address = Text.createText( "Nederstraat 65a", 0.3, Text.TEXT_COLOR);
    address.position.set(31.5, 1.5, 5.40);
    address.rotation.set(0, 0, 0);
    scene.add(address);

    var address2 = Text.createText( "3730 hoeselt", 0.3, Text.TEXT_COLOR);
    address2.position.set(31.5, 1.1, 5.40);
    address2.rotation.set(0, 0, 0);
    scene.add(address2);




    var date = Text.createText( "Date 26 july", 0.4, Text.TEXT_COLOR);
    date.position.set(4.35, 1.5, 38.5);
    date.rotation.set(0, Math.PI/2, 0);
    scene.add(date);*/
};
