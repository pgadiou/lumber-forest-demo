const Liana = require('forest-express-sequelize');

Liana.collection('orders', {
  actions: [{
    name: 'Mark as done',
    type: 'single',
    fields: [{
      field: 'deliveryIds',
      description: 'Array of Ids.',
      type: ['Number'],
      isRequired: true
    }],
  }],
});
