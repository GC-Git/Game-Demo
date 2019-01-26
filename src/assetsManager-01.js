module.exports = class AssetsManager {
    constructor(){
        this.tileSheets = {}; // Where we will store all our tileSheets
        this.images     = {};
    }

    async addTileSheet(url, name, width, height, columns) {
        const image = await this.requestImage(url, name);
        this.tileSheets[name] = {
            name: name,
            columns: columns - 1,
            width: width,
            height: height,
            image: image
        };
    }

    async addImage(url, name){
        const image = await this.requestImage(url, name);
        this.images[name] = image;
    }

    getTile(tilesheet, tileNumber){
        // debugger
        // TODO: The fucking math
        let column = tileNumber % tilesheet.columns;
        console.log("column: " , column)
        let row = tileNumber / tilesheet.columns;
        console.log("row: ", row)
        let startX = column * tilesheet.width;
        let startY = row * tilesheet.height;
        let endX = startX + tilesheet.width;
        let endY = startY + tilesheet.height;

        return {
            startX: startX,
            startY: startY,
            endX: endX,
            endY: endY,
        }
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