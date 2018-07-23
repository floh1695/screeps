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
    },
  });

module.exports = BaseRole;

