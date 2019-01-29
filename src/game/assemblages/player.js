const helpers = require('./helpers');

// Components
const Physics2D = require('../components/Physics2D');
const Square = require('../components/Square');
const Animation = require('../components/Animation');

const tags = [
    'player'
]

const components = [
    Physics2D,
    Square,
    Animation
]

module.exports = {
    default: function(world) {
        let entity = helpers.createEntity(world, components, tags)
    
        entity.square.width = 100;
        entity.square.height = 100;

        entity.square.color = '#000000';
        entity.physics2D.speed = 2;

        return entity
    }
}
    
    