'use strict';

const RoleApi = require('role');
const { 
  realizeRole,
} = RoleApi.functions;

/** IO () */
const loop = function () {
  verifyCreepExists('harvester1');
  haveCreepsWork();
};

/** String -> IO () */
const verifyCreepExists = function (creepName) {
  if (!Game.creeps[creepName]) {
    Game.spawns['Spawn1']
      .createCreep([ MOVE, WORK, CARRY ],
        creepName,
        { 
          role: 'harvester',
        }
      );
  }
};

/** IO () */
const haveCreepsWork = function () {
  Object.values(Game.creeps)
    .map(realizeRole)
    .forEach(roleCreep => roleCreep.run());
};

module.exports = {
  loop,
};

