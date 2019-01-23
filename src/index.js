const Display =     require('./display-01.js');
const Controller =  require('./controller-01.js')
const Engine =      require('./engine-01.js')
const Game =        require('./game/game-01.js')

window.onload = function(){

    /**
     * Passed into the engine, this is what occurs every game tick
     */
    let update = function(){
        game.update();
        if(controller.up.active)    { game.world.player.moveUp() }
        if(controller.down.active)  { game.world.player.moveDown() }
        if(controller.left.active)  { game.world.player.moveLeft() }
        if(controller.right.active) { game.world.player.moveRight() }
    }
        
    /**
     * Passed into the engine, this is what gets displayed every game tick
     */
    let render = function(){
        display.drawBG(bg)
        display.drawImage(
            game.world.player.x,
            game.world.player.y, 
            game.world.player.width, 
            game.world.player.height, 
            charImg
        )
        display.render(x=game.world.player.x+(game.world.player.width/2), y=game.world.player.y+(game.world.player.height/2))

        // Show degree of direction
        display.context.font = "30px Arial";
        display.context.fillStyle = "white";
        display.context.fillRect(5,15, 200, 110)
        display.context.fillStyle = "black";
        display.context.fillText(game.world.player.angle.toFixed(0), 10, 50);
        display.context.fillText("vel_ x: " + game.world.player.velocity_x.toFixed(0), 10, 80);
        display.context.fillText("vel_ y: " + game.world.player.velocity_y.toFixed(0), 10, 110);
    }

    /**
     * Passed to the 'resize' event listener to process alterations in window size.
     */
    let resize = function(){
        display.resize(
            document.documentElement.clientWidth-32,
            document.documentElement.clientHeight-32,
            game.world.height / game.world.width
        )
        display.render()
    }

    // ============================
    //        LOAD ASSETS
    // ============================
    class AssetsManager {
        constructor(){
            this.tileSetImage = undefined;
        }

        loadTileSetImage(url, callback){
            let newTileSetImage = new Image();
            this.tileSetImage.addEventListener("load", function(){
                callback();
            }, {once: true});
            newTileSetImage.src = url;
        }
    }

    let dvdLogo     = new Image()
    dvdLogo.src     = "images/pain.png"
    let bg          = new Image()
    bg.src          = "images/bg-town-01.jpg"
    let charImg     = new Image()
    charImg.src     = "images/char-01.png"

    // ============================
    //     DECLARE GAME PARTS
    // ============================
    let display     = new Display(document.getElementById('display'));
    let controller  = new Controller();
    let engine      = new Engine(1000/30, render, update);
    let game        = new Game();


    /* This is very important. The buffer canvas must be pixel for pixel the same
    size as the world dimensions to properly scale the graphics. All the game knows
    are player location and world dimensions. We have to tell the display to match them. */
    display.buffer.canvas.height =  game.world.height;
    display.buffer.canvas.width =   game.world.width;

    // On page load, resize the canvas to fit the window
    display.resize(
        document.documentElement.clientWidth-32,
        document.documentElement.clientHeight-32,
        game.world.height / game.world.width
    )

    // ============================
    //    INITIALIZE LISTENERS
    // ============================
    window.addEventListener("keydown",  controller.handleKeyDownUp);
    window.addEventListener("keyup",    controller.handleKeyDownUp);
    window.addEventListener("resize",   resize)


    // ============================
    //         START GAME
    // ============================
    display.render();
    engine.start();
    render();
}
