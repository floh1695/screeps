'use strict';

const S = require('stampit');
const AbstractRoleCreep = require('role.AbstractRoleCreep');

/** Upgrader ~> IO () */
const run = function () {
  if(this.creep.memory.upgrading && creep.carry.energy == 0) {
    this.creep.memory.upgrading = false;
    this.creep.say('harvest');
  }
  if(!this.creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
    this.creep.memory.upgrading = true;
    this.creep.say('upgrade');
  }
  
  if(this.creep.memory.upgrading) {
    if(this.creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    this.creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  }
  else {
    var sources = this.creep.room.find(FIND_SOURCES);
    if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
};

const Upgrader = S(AbstractRoleCreep)
  .methods({
    run,
  });

module.exports = Upgrader;

