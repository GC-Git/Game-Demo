module.exports = function GameMap(){
    this.backgroundColor = "rgba(45,48,56,0.25)";
    this.friction = 0.95;
    this.height = 3000;
    this.width = 3000;
    this.map = [];
    this.collisionMap = [];
    this.tileLabels = {};
}