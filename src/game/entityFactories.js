const Vectors2D = require('./components/Vectors2D');


module.exports = {
    /**
     * 
     * @param {object World} world A nano-ecs world object.
     * @param {array} tags An array of tags to apply to objects produced by this factory.  
     * @param {array} components An array of component functions to be added to objects produced by this factory.
     */
    createFactory: function(world, tags, components){
        return function(amount = 1){
            let entities = [];

            for (let index = 0; index < amount; index++) {
                
                let entity = world.createEntity();
                
                for (const tag of tags){
                    entity.addTag(tag);
                }

                for (const component of components){
                    entity.addComponent(component)
                }

                entities.push(entity);
            }

            if(entities.length === 1){
                return entities[0];
            } else {
                return entities;
            }
        }
    },

    shipFactory: this.createFactory(world, ['ship'], [Vectors2D])

}