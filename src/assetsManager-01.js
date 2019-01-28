module.exports = class AssetsManager {
    constructor(){
        this.tileSheets = {}; // Where we will store all our tileSheets
        this.images     = {};
    }

    async addTileSheet(url, name, width, height, columns) {
        const image = await this.requestImage(url, name);
        this.tileSheets[name] = {
            name: name,
            columns: columns,
            width: width,
            height: height,
            image: image
        };
    }

    async addImage(url, name){
        const image = await this.requestImage(url, name);
        this.images[name] = image;
    }

    // TODO: UNDER CONSTRUCTION
    getTile(tilesheet, tileNumber){
        let x = tileNumber % tilesheet.columns;
        let y = Math.floor(tileNumber / tilesheet.columns)
        return {
            startX: x * tilesheet.width,
            startY: y * tilesheet.height,
            width: tilesheet.width,
            height: tilesheet.height,
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