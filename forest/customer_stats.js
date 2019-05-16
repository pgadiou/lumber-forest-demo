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
    }]
});
