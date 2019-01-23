const Physics2D = require('../components/Physics2D');
const Square = require('../components/Square');

module.exports = function CollisionDetection(world){
    this.update = function(){
        this.playerWallCollision();
    }

    this.playerWallCollision = function(){
        let scene = world.queryTag('scene');

        scene.forEach(function(currentScene){
            if(!currentScene.player.hasAllComponents([Physics2D, Square])) throw "Player has invalid components for collision detection"
            let x1 = currentScene.player.physics2D.x;
            let x2 = currentScene.player.physics2D.x + currentScene.player.square.width;
            let y1 = currentScene.player.physics2D.y;
            let y2 = currentScene.player.physics2D.y + currentScene.player.square.height;

            if (x1 < 0) {
                currentScene.player.physics2D.x = 0;
                currentScene.player.physics2D.velocity_x = -currentScene.player.physics2D.velocity_x;
            } else if (x2 > currentScene.gameMap.width) {
                currentScene.player.physics2D.x = currentScene.gameMap.width - currentScene.player.square.width;
                currentScene.player.physics2D.velocity_x = -currentScene.player.physics2D.velocity_x;
            }

            if (y1 < 0) {
                currentScene.player.physics2D.y = 0;
                currentScene.player.physics2D.velocity_y = -currentScene.player.physics2D.velocity_y;
            } else if (y2 > currentScene.gameMap.height) {
                currentScene.player.physics2D.y = currentScene.gameMap.height - currentScene.player.square.height;
                currentScene.player.physics2D.velocity_y = -currentScene.player.physics2D.velocity_y;
            }
        })

    }
}