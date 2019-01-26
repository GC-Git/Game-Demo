const helpers = require('./helpers');

const Player = require('./player');

// Components
const GameMap = require('../components/GameMap');

const tags = [
    'scene'
]

const components = [
    GameMap
]

module.exports = {
    default: function(world) {
        let entity = helpers.createEntity(world, components, tags)
        
        entity.player = Player.default(world)
        entity.gameMap.friction = .80

        return entity
    }
}
    
    