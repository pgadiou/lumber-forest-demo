const Liana = require('forest-express-sequelize');
const models = require('../models/');
const _ = require('lodash');

Liana.collection('customers', {
  fields: [{
    field: 'fullname',
    type: 'String',

    // COMPUTE CUSTOMER FULL NAME
    get: (customer) => {
      return customer.firstname + ' ' + customer.lastname;
    },
    search: function (query, search) {
      let s = models.sequelize;

      var searchCondition = s.and(
        { firstname: { $like: `%${search}%` }},
      );

      let searchConditions = _.find(query.where.$and, '$or');
      searchConditions.$or.push(searchCondition);

      return query;
    }
  }, {
    field: 'Country',
    type: 'String',

    // RETURN COUNTRY OF CUSTOMERS FIRST ADDRESS
    get: (customer, options) => {
      return models.addresses.findOne({ where : {customer_id: customer.id}}).then(address => {return address.country})
    },

    // ALLOW SEARCH ON COUNTRY
    search: function (query, search) {
        // const sequelize = models.sequelize;
        // console.log("QUERY BEFORE")
        // console.log(query)
        // query.include.push(models.addresses);
        // console.log("QUERY AFTER")
        // console.log(query)
        // console.log("MODELS")
        // console.log(models.addresses)
        // const searchAddressCondition = sequelize.and(
        // { '$addresses.country$' : { $like: `%${search}%` }},
        // );
        // console.log("SEARCH ADDRESS CONDITION")
        // console.log(searchAddressCondition)

        // const searchConditions = _.find(query.where.$and, '$or');
        // console.log("SEARCH CONDITIONS")
        // console.log(searchConditions)
        // searchConditions.$or.push(searchAddressCondition);
    }
  }]
});


