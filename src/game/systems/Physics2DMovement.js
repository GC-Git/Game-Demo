const Physics2D = require('../components/Physics2D');

module.exports = function Physics2DMovement(ecs){
    // All systems must have an update function.
    this.update = function (){ 
        var candidates = ecs.queryTag('player');

        candidates.forEach(function(entity) {

            if(entity.physics2D.old_y == entity.physics2D.y || entity.physics2D.old_x == entity.physics2D.x){ // If touching the ground
                entity.physics2D.velocity_y *= ecs.world.gameMap.friction
                entity.physics2D.velocity_x *= ecs.world.gameMap.friction
            } else {
                // entity.physics2D.velocity_x *= ecs.world.gameMap.friction
            }

            entity.physics2D.old_x = entity.physics2D.x;
            entity.physics2D.old_y = entity.physics2D.y;

            entity.physics2D.x += entity.physics2D.velocity_x;

            entity.physics2D.velocity_y += ecs.world.gameMap.gravity;
            entity.physics2D.y += entity.physics2D.velocity_y;
        });
    }
}