const Liana = require('forest-express-sequelize');
const models = require('../models');

Liana.collection('customer_stats', {
  isSearchable: true,
  fields: [{
      field: 'amount',
      type: 'String'
    }, {
      field: 'orders',
      type: 'String',
    }, {
      field: 'email',
      type: 'String',
    }]
});
