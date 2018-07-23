'use strict';

const S = require('stampit');

const BaseRole = S()
  .props({
    creep: null,
  })
  .init(function ({
    creep = this.creep,
  }) {
    this.creep = creep;
  })
  .methods({
    run: function () {
      throw new Error('Virtual method call');
    }
  });

const Harvester = S(BaseRole)
  .methods({
    run: function () {
      if(this.creep.carry.energy < this.creep.carryCapacity) {
        var sources = this.creep.room.find(FIND_SOURCES);
        if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
      else {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
          }
        });
        if(targets.length > 0) {
          if(this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
    }
  });

const roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    Harvester({ creep }).run();
	}
};

const roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

const roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

const loop = function () {
  if (!Game.creeps['Harvester1']) {
    Game.spawns['Spawn1']
      .createCreep(
        [ MOVE, WORK, CARRY ],
        'Harvester1',
        { role: 'harvester' }
      );
  }

//  const tower = Game.getObjectById('4fccefd8622e92019e80d52a');
//  if(tower) {
//    const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
//      filter: (structure) => structure.hits < structure.hitsMax
//    });
//        
//    if(closestDamagedStructure) {
//      tower.repair(closestDamagedStructure);
//    }
//
//    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
//    if(closestHostile) {
//      tower.attack(closestHostile);
//    }
//  }

  const roleMap = {
    'harvester': roleHarvester,
    'upgrader': roleUpgrader,
    'builder': roleBuilder,
  };
  Object.values(Game.creeps)
    .map(creep => () => 
      roleMap[creep.memory.role]
        .run(creep))
    .forEach(creepAction => creepAction());
}

module.exports = {
  loop,
};

