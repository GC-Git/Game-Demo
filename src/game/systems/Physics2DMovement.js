const Physics2D = require('../components/Physics2D');

module.exports = function Physics2DMovement(world){
    // All systems must have an update function.
    this.update = function (){ 
        var candidates = world.queryTag('player');

        candidates.forEach(function(entity) {
            entity.physics2D.x += entity.physics2D.velocity_x;
            entity.physics2D.y += entity.physics2D.velocity_y;
        });
    }
}