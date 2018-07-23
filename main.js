'use strict';

const Builder = require('builder');
const Harvester = require('harvester');
const Upgrader = require('upgrader');

const roleBuilder = {
  /** @param {Creep} creep **/
  run: function(creep) {
    Builder({ creep }).run();
  },
};

const roleHarvester = {
  /** @param {Creep} creep **/
  run: function(creep) {
    Harvester({ creep }).run();
	},
};

const roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    Upgrader({ creep }).run();
	},
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

