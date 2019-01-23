const nano = require('nano-ecs');
const nanoSystems = require('./systems-manager'); 

// Systems
const Physics2DMovement = require('./systems/Physics2DMovement');
const CollisionDetection = require('./systems/CollisionDetection') 

// Assemblages
const GameMap = require('./assemblages/gameMap');

module.exports = class Game {
    constructor() {
        this.world = {
            backgroundColor: "rgba(45,48,56,0.25)",
            friction: 0.95,
            player: new Game.Player(),
            height: 3000,
            width: 3000,
        }
        this.ecs = nano()

        // Entities
        // TODO: Transfer display functionality to the new ECS        
        this.world_1 = GameMap.default(this.ecs)
        this.systemsManager = nanoSystems(this.ecs)
        this.systemsManager.addSystem(Physics2DMovement, this.ecs)
        this.systemsManager.addSystem(CollisionDetection, this.ecs)
    }

    update() {
        this.systemsManager.updateAll();
        this.world.player.update();
        this.world.player.velocity_x *= this.world.friction
        this.world.player.velocity_y *= this.world.friction
        this.detectWallCollision(this.world.player);
    }

    detectWallCollision(object) {
        // Four points of our square
        let x1 = object.x;
        let x2 = object.x + object.width;
        let y1 = object.y;
        let y2 = object.y + object.height;

        if (x1 < 0) {
            object.x = 0;
            object.velocity_x = -object.velocity_x;
        } else if (x2 > this.world.width) {
            object.x = this.world.width - object.width;
            object.velocity_x = -object.velocity_x;
        }

        if (y1 < 0) {
            object.y = 0;
            object.velocity_y = -object.velocity_y;
        } else if (y2 > this.world.height) {
            object.y = this.world.height - object.height;
            object.velocity_y = -object.velocity_y;
        }
    }

    static get Player() {
        return Player;
    }
}

class Player {
    constructor(x, y) {
        this.color = '#000000';
        this.height = 100;
        this.width = 100;
        this.x = (x ? x : 100);
        this.y = (y ? y : 100);
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.speed = .4;

        // Bindings so 'this' references the player object
        this.moveDown = this.moveDown.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveUp = this.moveUp.bind(this);
        this.update = this.update.bind(this);
    }

    get angle() {
        var addDeg = 0;
        if (this.velocity_x < 0)
            addDeg = this.velocity_y >= 0 ? 180 : 270;
        else if (this.velocity_y <= 0) addDeg = 360;

        let deg = Math.abs(Math.abs(Math.atan(this.velocity_y / this.velocity_x) * 180 / Math.PI) - addDeg)
        return deg
    }

    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    moveUp() {
        this.velocity_y -= this.speed;
    }

    moveDown() {
        this.velocity_y += this.speed;
    }

    moveRight() {
        this.velocity_x += this.speed;
    }

    moveLeft() {
        this.velocity_x -= this.speed;
    }
}