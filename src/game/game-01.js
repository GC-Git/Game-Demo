const nano = require('nano-ecs');
const nanoSystems = require('./systems-manager'); 

// Systems
const Physics2DMovement = require('./systems/Physics2DMovement');
const CollisionDetection = require('./systems/CollisionDetection') 

// Assemblages
const GameMap = require('./assemblages/gameMap');

module.exports = class Game {
    constructor() {  
        this.ecs = nano()

        // Entities
        // TODO: Transfer display functionality to the new ECS        
        this.world = GameMap.default(this.ecs)
        this.ecs.world = this.world; // So we can reference things like gravity within our systems

        this.systemsManager = nanoSystems(this.ecs)
        this.systemsManager.addSystem(Physics2DMovement, this.ecs)
        this.systemsManager.addSystem(CollisionDetection, this.ecs)
    }

    update() {
        this.systemsManager.updateAll();
        this.ecs.world = this.world; // So we can reference world variables.
    }
}

