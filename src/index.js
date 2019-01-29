const Display =     require('./display-01.js');
const Controller =  require('./controller-01.js')
const Engine =      require('./engine-01.js')
const Game =        require('./game/game-01.js')
const AssetsManager = require('./assetsManager-01.js')

window.onload = function(){

    /**
     * Passed into the engine, this is what occurs every game tick
     */
    let update = function(){
        game.update();

        // USER INPUT
        if(controller.up.active)    {
             game.world.player.physics2D.moveUp();
            }
        if(controller.down.active)  {
             game.world.player.physics2D.moveDown();
            }
        if(controller.left.active)  {
             game.world.player.physics2D.moveLeft();
            }
        if(controller.right.active) {
             game.world.player.physics2D.moveRight();
            }
    }
        
    /**
     * Passed into the engine, this is what gets displayed every game tick
     */
    let render = function(){
        let ts = assets.tileSheets

        /*============================
              DRAW THE BACKGROUND
        ==============================*/        
        // display.drawBG(assets.images.bg)
        display.drawMap(game.world.gameMap, ts.floors)

        /*============================
                DRAW THE PLAYER
        ==============================*/
        let playerSpriteSheet = ts.male
        let playerSprite;
        let frameNumber;

        let playerVel_X = game.world.player.physics2D.velocity_x;
        let playerVel_Y = game.world.player.physics2D.velocity_y;  

        if(controller.up.active)    {
            game.world.player.animation.change(playerSpriteSheet.frameSets[0], 2)
            frameNumber = game.world.player.animation.frame;
            playerSprite = display.getTile(playerSpriteSheet, frameNumber)
        }
        else if(controller.down.active)  {
            game.world.player.animation.change(playerSpriteSheet.frameSets[2], 2)
            frameNumber = game.world.player.animation.frame;
            playerSprite = display.getTile(playerSpriteSheet, frameNumber)
        }
        else if(controller.left.active)  {
            game.world.player.animation.change(playerSpriteSheet.frameSets[3], 2)
            frameNumber = game.world.player.animation.frame;
            playerSprite = display.getTile(playerSpriteSheet, frameNumber)
        }
        else if(controller.right.active) {
            game.world.player.animation.change(playerSpriteSheet.frameSets[1], 2)
            frameNumber = game.world.player.animation.frame;
            playerSprite = display.getTile(playerSpriteSheet, frameNumber)
        }
        else {
            // Defaults the player sprite to the first tile of the last frameset of the players sprite sheet. This should always be an idle image IF we are using this. Realistically we should have an idle animation.
            playerSprite = display.getTile(playerSpriteSheet, playerSpriteSheet.frameSets[playerSpriteSheet.frameSets.length-1])
        }

        display.buffer.drawImage(
            playerSpriteSheet.image, 
            playerSprite.startX,
            playerSprite.startY,
            playerSprite.width,
            playerSprite.height,
            game.world.player.physics2D.x,
            game.world.player.physics2D.y, 
            game.world.player.square.width, 
            game.world.player.square.height, 
        )
        
        game.world.player.animation.update();

        
        /*============================
             DRAW BUFFER TO CANVAS
        ==============================*/
        display.render(
            x=game.world.player.physics2D.x+(game.world.player.square.width/2),
            y=game.world.player.physics2D.y+(game.world.player.square.height/2)
        )

        /*============================
                DRAW THE HUD
        ==============================*/
        display.context.fillStyle = "white";
        display.context.fillRect(5,15, 200, 110);
        display.context.font = "30px Arial";
        display.context.fillStyle = "black";
        display.context.fillText("Degrees: "+game.world.player.physics2D.angle().toFixed(0), 10, 50);
        display.context.fillText("vel X: " + game.world.player.physics2D.velocity_x.toFixed(0), 10, 80);
        display.context.fillText("vel_Y: " + game.world.player.physics2D.velocity_y.toFixed(0), 10, 110);
    }

    /**
     * Resizes to window size and re-renders
     */
    let resize = function(){
        display.resize(
            document.documentElement.clientWidth-32,
            document.documentElement.clientHeight-32,
            game.world.gameMap.height / game.world.gameMap.width
        )
        display.render()
    }

    
    // ============================
    //     DECLARE GAME PARTS
    // ============================
    let assets      = new AssetsManager();
    let display     = new Display(document.getElementById('display'));
    let controller  = new Controller();
    let engine      = new Engine(1000/30, render, update);
    let game        = new Game();

    /* This is very important. The buffer canvas must be pixel for pixel the same
    size as the world dimensions to properly scale the graphics. All the game knows
    are player location and world dimensions. We have to tell the display to match them. */
    display.buffer.canvas.height =  game.world.gameMap.height;
    display.buffer.canvas.width =   game.world.gameMap.width;

    // ============================
    //        LOAD ASSETS
    // ============================
    assets.addImage('images/bg-town-01.jpg', 'bg')
    .then(() => assets.addImage('images/char-01.png', 'charImg'))
    .then(() => assets.addTileSheet('images/tilesheet-01.png', 'human', 32, 32, 2))
    .then(() => assets.addTileSheet('images/floors.png', 'floors', 32, 32, 8))
    .then(() => assets.addTileSheet('images/BODY_male.png', 'male', 64, 64, 9,[
        // Designating frame sets (the frames in an animation)
        [ 1,  2,  3,  4,  5,  6,  7,  8],   // 0 Walk up
        [27, 28, 29, 30, 31, 32, 33, 34, 35],  // 1 Walk right
        [19, 20, 21, 22, 23, 24, 25, 26],  // 2 Walk down
        [ 9, 10, 11, 12, 13, 14, 15, 16, 17],   // 3 Walk left
        [18]                                    // 4 Idle facing down
    ]))
    .then(() => {
        // -------------------------------------
        //    START GAME AFTER LOADING ASSETS
        // -------------------------------------        
        resize();
        display.render();
        engine.start();
        render();
    })

    // ============================
    //    INITIALIZE LISTENERS
    // ============================
    window.addEventListener("keydown",  controller.handleKeyDownUp);
    window.addEventListener("keyup",    controller.handleKeyDownUp);
    window.addEventListener("resize",   resize)

}
