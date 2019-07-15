const Liana = require('forest-express-sequelize');
const models = require('../models');

Liana.collection('customer_stats', {
  isSearchable: true,

  //FIELDS
  fields: [{
      field: 'email',
      type: 'String',
    }, {
      field: 'orders_count',
      type: 'Number',
    }, {
      field: 'total_amount',
      type: 'Number',
  }],

  //ACTIONS
  actions: [{
    name: 'Mark as done',
    type: 'global',
    fields: [{
      field: 'deliveryIds',
      description: 'Array of Ids.',
      type: ['Number'],
      isRequired: true,
    }]
    }, {
    name: 'levente',
    type: 'global',
    fields: [{
      field: 'columnData',
      widget: 'dropdown',
      description: 'Data of column',
      type: 'String',
      isRequired: true,
    }]
  }]

});
