
var Button = {};

Button.move = function(e) {
    Camera.activeMoveModus = Camera.moveModus.MOVE;
};

Button.rotate = function(e) {
    Camera.activeMoveModus = Camera.moveModus.ROTATE;
};

Button.up = function(e) {
    Events.keys["ArrowUp"].setPressed(true);
};
Button.upReleased = function(e) {
    Events.keys["ArrowUp"].setPressed(false);
};

Button.down = function(e) {
    Events.keys["ArrowDown"].setPressed(true);
};
Button.downReleased = function(e) {
    Events.keys["ArrowDown"].setPressed(false);
};

Button.left = function(e) {
    Events.keys["ArrowLeft"].setPressed(true);
};
Button.leftReleased = function(e) {
    Events.keys["ArrowLeft"].setPressed(false);
};

Button.right = function(e) {
    Events.keys["ArrowRight"].setPressed(true);
};
Button.rightReleased = function(e) {
    Events.keys["ArrowRight"].setPressed(false);
};

Button.space = function(e) {
    Events.keys[" "].setPressed(true);
};

Button.spaceReleased = function(e) {
    Events.keys[" "].setPressed(false);
};
