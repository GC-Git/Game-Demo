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
        if(controller.up.active)    { game.world.player.physics2D.moveUp() }
        if(controller.down.active)  { game.world.player.physics2D.moveDown() }
        if(controller.left.active)  { game.world.player.physics2D.moveLeft() }
        if(controller.right.active) { game.world.player.physics2D.moveRight() }
    }
        
    /**
     * Passed into the engine, this is what gets displayed every game tick
     */
    let render = function(){
        let ts = assets.tileSheets

        // DRAW BACKGROUND
        display.drawBG(assets.images.bg)

        let playerVel_X = game.world.player.physics2D.velocity_x;
        let playerVel_Y = game.world.player.physics2D.velocity_y;
        let playerSprite;
  

        if(playerVel_X > playerVel_Y && playerVel_X > -playerVel_Y)         {playerSprite = assets.getTile(ts.human, 1); console.log('Right')}
        else if(-playerVel_X > playerVel_Y && -playerVel_X > -playerVel_Y)  {playerSprite = assets.getTile(ts.human, 3); console.log('Left')}
        else if(playerVel_Y > playerVel_X && playerVel_Y > -playerVel_X)    {playerSprite = assets.getTile(ts.human, 0); console.log('Down')}
        else if(-playerVel_Y > playerVel_X && -playerVel_Y > -playerVel_X)  {playerSprite = assets.getTile(ts.human, 2); console.log('Up')}
        else {playerSprite = assets.getTile(ts.human, 0); console.log('Not Moving')}
        
        console.log(playerSprite.startX)
        console.log(playerSprite.endX)
        console.log(playerSprite.startY)
        console.log(playerSprite.endY)

        // DRAW PLAYER
        display.buffer.drawImage(
            ts.human.image, 
            playerSprite.startX,
            playerSprite.startY,
            playerSprite.endX - playerSprite.startX,
            playerSprite.endY - playerSprite.startY,
            game.world.player.physics2D.x,
            game.world.player.physics2D.y, 
            game.world.player.square.width, 
            game.world.player.square.height, 
            )

        // display.drawImage(
        //     game.world.player.physics2D.x,
        //     game.world.player.physics2D.y, 
        //     game.world.player.square.width, 
        //     game.world.player.square.height, 
        //     playerSprite
        // )
        
        // DRAW FROM BUFFER TO CANVAS
        display.render(
            x=game.world.player.physics2D.x+(game.world.player.square.width/2),
            y=game.world.player.physics2D.y+(game.world.player.square.height/2)
        )

        // DRAW HUD
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
