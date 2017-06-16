
var Button = {};

Button.move = function(e) {
    Camera.activeMoveModus = Camera.moveModus.MOVE;
};

Button.rotate = function(e) {
    Camera.activeMoveModus = Camera.moveModus.ROTATE;
}
