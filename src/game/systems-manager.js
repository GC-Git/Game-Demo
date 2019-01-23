const camelcase = require('camelcase')
const _ = require('lodash');

module.exports = function(world){
    return new SystemsManager(world)
}

function SystemsManager (world) {

    // An object with all the systems in the manager. It may contain only one of each type.
    this.systems = {};
    this.world = world;

    this.updateAll = function(){
        for(let key in this.systems){
            if(!this.systems[key].update){throw new Error("System has no update function!")}
            this.systems[key].update(this.world)
        }
    }
    
    this.removeSystem = function(system){
        try {
            if (!this.systems[system.name]){ throw new Error("No such system exists!") }
            delete this.systems[system.name] 
        } catch(err){
            throw new Error(err)
        }
    }

    this.addSystem = function(system){
        try{
            // If we already have a system with that name
            if(this.systems[system.name]){ throw new Error ("A system of that type already exists!") }
            this.systems[system.name] = new system(this.world);
        } catch (err){
            throw new Error(err);
        }
    }
}