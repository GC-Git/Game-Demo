module.exports = function GameMap(){
    this.backgroundColor = "rgba(45,48,56,0.25)";
    this.friction = 0.95;

    this.columns = 10;
    this.rows = 10;
    this.tileSize = 200;
    this.map = [
        1,0,0,0,0,0,0,0,0,0,
        1,1,0,0,0,0,0,0,0,0,
        0,1,1,1,0,0,0,0,0,0,
        0,1,1,1,0,0,0,0,0,0,
        0,0,1,1,0,0,0,0,0,0,
        0,0,0,1,0,0,0,0,0,0,
        0,0,0,1,0,0,0,0,0,0,
        0,0,0,1,1,1,0,0,0,0,
        0,0,0,0,0,1,1,0,0,0,
        0,0,0,0,0,0,1,1,0,0
    ];
    this.height = this.tileSize * this.rows;
    this.width = this.tileSize * this.columns;

    this.collisionMap = [];
}