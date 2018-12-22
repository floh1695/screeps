'use strict';

const S = require('stampit');

/** RoleCreep ~> IO () */
const run = function () {
  throw new Error('Virtual method call');
};

/** RoleCreep */
const AbstractRoleCreep = S()
  .props({
    creep: null,
  })
  .init(function ({
    creep = this.creep,
  }) {
    this.creep = creep;
  })
  .methods({
    run,
  });

module.exports = AbstractRoleCreep;

