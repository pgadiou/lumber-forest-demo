const Liana = require('forest-express-sequelize');
const models = require('../models');

Liana.collection('stories', {
  isSearchable: true,
  fields: [{
      field: 'email',
      type: 'String',
    }, {
      field: 'pictures',
      type: ['String'],
    }, {
      field: 'videos',
      type: ['String'],
    }, {
      field: 'quotes',
      type: ['String'],
  }],
  actions: [{
    name: 'Mark as accepted',
    type: 'bulk',
  }],

});
