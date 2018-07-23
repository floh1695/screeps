'use strict';

const S = require('stampit');
const AbstractRoleCreep = require('role.AbstractRoleCreep');

/** Harvester ~> IO () */
const run = function () {
  /* If can carry more */
  if(this.creep.carry.energy < this.creep.carryCapacity) {
    /* Find closest source */
    const  sources = this.creep.room.find(FIND_SOURCES);
    /* If can reach source */
    if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      /* Move towards source */
      this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
  /* If can't carry more */
  else {
    /* Find all targets in room */
    const targets = this.creep.room.find(FIND_STRUCTURES, {
      /* Filtered to Extensions, Spawns, and Towers, that can hold more */
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
      }
    });
   
    /* If there are targets */ 
    if(targets.length > 0) {
      /* If can reach first target */
      if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
  }
};

const Harvester = S(AbstractRoleCreep)
  .methods({
    run,
  });

module.exports = Harvester;

