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

        // TODO: Tidy this up and do it right.
        /*
        if(controller.up.active)    { game.world_1.player.physics2D.moveUp() }
        if(controller.down.active)  { game.world_1.player.physics2D.moveDown() }
        if(controller.left.active)  { game.world_1.player.physics2D.moveLeft() }
        if(controller.right.active) { game.world_1.player.physics2D.moveRight() }
        game.world_1.player.physics2D.velocity_x *= game.world_1.gameMap.friction
        game.world_1.player.physics2D.velocity_y *= game.world_1.gameMap.friction

        console.log("y: " + game.world_1.player.physics2D.y.toFixed(0) + " x: " + game.world_1.player.physics2D.x.toFixed(0)) 
        */
        

        if(controller.up.active)    { game.world.player.physics2D.moveUp() }
        if(controller.down.active)  { game.world.player.physics2D.moveDown() }
        if(controller.left.active)  { game.world.player.physics2D.moveLeft() }
        if(controller.right.active) { game.world.player.physics2D.moveRight() }
    }
        
    /**
     * Passed into the engine, this is what gets displayed every game tick
     */
    let render = function(){

        // TODO: Transfer display functionality to the new ECS
        display.drawBG(assets.images.bg)
        display.drawImage(
            game.world.player.physics2D.x,
            game.world.player.physics2D.y, 
            game.world.player.square.width, 
            game.world.player.square.height, 
            assets.images.charImg
        )
        display.render(
            x=game.world.player.physics2D.x+(game.world.player.square.width/2), y=game.world.player.physics2D.y+(game.world.player.square.height/2)
        )


        display.context.fillStyle = "white";
        display.context.fillRect(5,15, 200, 110);

        display.context.font = "30px Arial";
        display.context.fillStyle = "black";

        display.context.fillText("Degrees: "+game.world.player.physics2D.angle().toFixed(0), 10, 50);

        display.context.fillText("vel X: " + game.world.player.physics2D.velocity_x.toFixed(0), 10, 80);

        display.context.fillText("vel_Y: " + game.world.player.physics2D.velocity_y.toFixed(0), 10, 110);
    }

    /**
     * Passed to the 'resize' event listener to process alterations in window size.
     */
    let resize = function(){
        display.resize(
            document.documentElement.clientWidth-32,
            document.documentElement.clientHeight-32,
            game.world.gameMap.height / game.world.gameMap.width
        )
        display.render()
    }

    class AssetsManager {
        constructor(){
            this.tileSheets = {}; // Where we will store all our tileSheets
            this.images     = {};
        }

        async addTileSheet(url, name) {
            const image = await this.requestImage(url, name);
            this.tileSheets[name] = image;
        }

        async addImage(url, name){
            const image = await this.requestImage(url, name);
            this.images[name] = image;
        }

        requestImage(url){
            return new Promise(function(resolve, reject){
                let image       = new Image();
                image.src       = url;
                image.onload    = () => resolve(image);
                image.onerror   = () => reject(new Error("Image at " + url + " could not load."));
            })
        }
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
    .then(() => {
        // ===============================
        // START GAME AFTER LOADING ASSETS
        // ===============================
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
