const Liana = require('forest-express-sequelize');

Liana.collection('companies', {
  actions: [{
    name: 'Mark as Live'
  }],
  fields: [{
    field: "toto",
    type: "String"
  }],
});
