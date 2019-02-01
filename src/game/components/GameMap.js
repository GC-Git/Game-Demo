module.exports = function GameMap(){
    this.backgroundColor = "rgba(45,48,56,0.25)";
    this.friction = 0.95;
    this.gravity = 9.81;
    this.bounce = 0.3;

    this.columns = 10;
    this.rows = 10;
    this.tileSize = 100;
    this.map = [
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,
        2,2,2,2,2,2,2,2,2,2,        
    ];
    this.height = this.tileSize * this.rows;
    this.width = this.tileSize * this.columns;

    this.collisionMap = [];
}