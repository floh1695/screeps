'use strict';

const Builder = require('role.Builder');
const Harvester = require('role.Harvester');
const Upgrader = require('role.Upgrader');

const roles = {
  Builder,
  Harvester,
  Upgrader,
};

/** Creep -> RoleCreep */
const realizeRole = function (creep) {
  const roleNameMap = {
    'builder': Builder,
    'harvester': Harvester,
    'upgrader': Upgrader,
  };
  const roleName = creep.memory['role'];

  const Role = roleNameMap[roleName];

  return Role({ creep, });
};

const functions = {
  realizeRole,
};

module.exports = {
  roles,
  functions,
};

