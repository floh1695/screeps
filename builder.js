'use strict';

const S = require('stampit');
const BaseRole = require('baseRole');

const Builder = S(BaseRole)
  .methods({
    run: function () {
      if(this.creep.memory.building && creep.carry.energy == 0) {
        this.creep.memory.building = false;
        this.creep.say('harvest');
      }

      if(!this.creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        this.creep.memory.building = true;
        this.creep.say('build');
      }

      if(this.creep.memory.building) {
        var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
          if(this.creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
      else {
        var sources = this.creep.room.find(FIND_SOURCES);
        if(this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
    },
  });

module.exports = Builder;

