const Liana = require('forest-express-sequelize');
const models = require('../models/');

Liana.collection('orders', {
  fields: [{
    field: "state",
    type: "Number",
    get: (order) => {
      return 4;
    }
  }],

  actions: [{
    name: 'Mark as done',
    type: 'Global',
    fields: [{
      field: 'deliveryIds',
      description: 'Array of Ids.',
      type: ['Number'],
      isRequired: true,
    }],
  }, {
    name: 'Test smart field',
  }],
});
