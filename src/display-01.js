// The display controls everything the user sees
const $ = require('jquery');

module.exports = class Display {
    constructor(canvas) {
        this.buffer =   document.createElement("canvas").getContext("2d"),
        this.canvas =   canvas;
        this.context =  this.canvas.getContext("2d");   

        // Bindings for when we need to reference this class. Sets 'this' to this class.
        this.resizeToFitWindow  = this.resize.bind(this)
        this.drawRect           = this.drawRect.bind(this)

        this.camera             = new Display.Camera(1300, 1300)
    }

    /**
     * Takes an image or color and draws it to the entire buffer.
     * @param {String || Image} bg A string containing the color OR an image element.
     */
    drawBG(bg){
        if(typeof bg == 'string'){
            this.buffer.fillStyle = color;
            this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        } else {
            this.buffer.drawImage(bg, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
        }
    }

    getTile(tilesheet, tileNumber){
        let x = tileNumber % tilesheet.columns;
        let y = Math.floor(tileNumber / tilesheet.columns)
        return {
            startX: x * tilesheet.width,
            startY: y * tilesheet.height,
            width: tilesheet.width-1,
            height: tilesheet.height-1,
        }
    }

    drawMap(world, tilesheet=undefined){
        
        let mapHeight = world.rows;
        let mapWidth = world.columns;
        let tileSize = world.tileSize;

        for(let index = 0; index < mapWidth*mapHeight; index++){
            let tileValue = world.map[index];
            if(tileValue == 32){debugger}
            let tileColor;
            switch(tileValue) {
                case 0: tileColor   = "#4CAF50"; break;
                case 1: tileColor   = "#007ACC"; break;
                case 2: tileColor   = "#FFCD42"; break;
                default: tileColor  = "#090909"; break;
            }
        
            let x = index % mapWidth;
            let y = Math.floor(index / mapHeight);
            let startXCoord = x * tileSize;
            let startYCoord = y * tileSize;

            if(tilesheet){
                let tileImageInfo = this.getTile(tilesheet, tileValue)
                this.buffer.drawImage(
                    tilesheet.image,
                    tileImageInfo.startX,
                    tileImageInfo.startY,
                    tileImageInfo.width,
                    tileImageInfo.height,
                    startXCoord,
                    startYCoord,
                    tileSize,
                    tileSize
                )
            } else {
                this.drawRect(startXCoord, startYCoord, tileSize, tileSize, tileColor);
            }
        }
    }

    /**
     * Draws an image to the buffer at the x and y coordinates. Images will scale with height / width
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {Image} image 
     */
    drawImage(x,y,width,height, image){
        this.buffer.drawImage(
            image,
            x,
            y,
            width,
            height
        )
    }

    /**
     * Draws a rectangle of the designated color. 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     * @param {string} color 
     */
    drawRect(x, y, width, height, color) {
        console.log(this)
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };


    /**
     * Resizes the canvas to fit the width / height ratio of the game map 
     * @param {number} width Width of the screen
     * @param {number} height Height of the screen
     * @param {number} height_width_ratio Desired ratio between width / height
     */
    resize(width, height, height_width_ratio){
        if(height / width > height_width_ratio){ // If display is greater than our ratio
            this.canvas.height  = width * height_width_ratio 
            this.canvas.width   = width 
        } else { // If display is less than our ratio
            this.canvas.height  = height
            this.canvas.width   = height / height_width_ratio
        }
    }

    /**
     * Pull what you want to display buffer and put it on the canvas context
     * @param {*} x 
     * @param {*} y 
     */
    render(x=0, y=0){ 
        // Draws the buffer to the context

        if(x-(this.camera.width/2)<0)     x = this.camera.width/2;
        if(y-(this.camera.height/2)<0)    y = this.camera.height/2;
        if(x+(this.camera.width/2)>this.buffer.canvas.width)     x = this.buffer.canvas.width-(this.camera.width/2);
        if(y+(this.camera.height/2)>this.buffer.canvas.height)   y = this.buffer.canvas.height-(this.camera.height/2);

    
        this.context.drawImage(
            this.buffer.canvas, 
            x-(this.camera.width/2),
            y-(this.camera.height/2), 
            this.camera.width, 
            this.camera.height, 
            0, 
            0, 
            this.context.canvas.width, 
            this.context.canvas.height
        ); 
    };

    
    static get Camera(){
        return Camera;
    }

    static get TileSet(){
        return TileSet;
    }
}

class Camera {
    constructor(width, height){
        this.width = width;
        this.height = height;
        // this.x = 0;
        // this.y = 0;
    }
}