const Liana = require('forest-express-sequelize');
const models = require('../models');

Liana.collection('customer_stats', {
  isSearchable: true,
  fields: [{
      field: 'email',
      type: 'String',
    }, {
      field: 'orders',
      type: 'Number',
    }, {
      field: 'amount',
      type: 'Number',
  }],
  actions: [{
    name: 'Mark as done',
    type: 'global',
    fields: [{
      field: 'deliveryIds',
      description: 'Array of Ids.',
      type: ['Number'],
      isRequired: true,
    }],
  }],

});

//mark as done triggers an action defined in the routes for orders
