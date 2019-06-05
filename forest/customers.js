const Liana = require('forest-express-sequelize');

Liana.collection('customers', {
  fields: [{
    field: 'fullname',
    type: 'String',
    get: (customer) => {
      return "<strong>" + customer.firstname + "</strong>" + ' ' + customer.lastname;
    }
  }],
});
