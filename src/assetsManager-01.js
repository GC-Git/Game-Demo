module.exports = class AssetsManager {
    constructor(){
        this.tileSheets = {}; // Where we will store all our tileSheets
        this.images     = {};
    }

    /**
     * 
     * @param {string} url The link to the image
     * @param {string} name What the tilesheet should be called. It will be stored within AssetsManager.tilesheets with the key value of name given.
     * @param {number} width Width of each tile
     * @param {number} height Height of each tile
     * @param {number} columns Number of columns (starting from 1)
     * @param {array} frameSets 3D array (ie [[1,2],[3,4]]) where the deepest array is designating frames of animation within the tilesheet. If this is defined, you'll be able to run this tile sheet as an animation.
     */
    async addTileSheet(url, name, width, height, columns, frameSets=undefined) {
        const image = await this.requestImage(url, name);
        this.tileSheets[name] = {
            name: name,
            columns: columns,
            width: width,
            height: height,
            image: image,
            frameSets: frameSets
        };
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