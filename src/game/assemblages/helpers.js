module.exports = {
    createEntity: function(world, components, tags=[],){
            // Create the entity
            let entity = world.createEntity();
            
            // For each tag in the tag array, we will add it to the new entity
            for (const tag of tags){
                entity.addTag(tag);
            }

            // For each component in the component, we will add it to the new entity
            for (const component of components){
                entity.addComponent(component)
            }
    
            return entity;
    }
}

