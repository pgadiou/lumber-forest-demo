const Liana = require('forest-express-sequelize');
const models = require('../models/');
const _ = require('lodash');
const moment = require('moment');

Liana.collection('customers', {

  // FIELDS

  fields: [

  {
    field: 'deliveries',
    type: ['String'],
    reference: 'deliveries.id'
  },


  {
    field: 'fullname',
    type: 'String',

    // COMPUTE CUSTOMER FULL NAME
    get: (customer) => {
      return customer.firstname + ' ' + customer.lastname;
    },
    //SEARCH ON FIRST NAME
    search: function (query, search) {
      let s = models.sequelize;

      var searchCondition = s.and(
        { firstname: { $like: `%${search}%` }},
      );

      let searchConditions = _.find(query.where.$and, '$or');
      searchConditions.$or.push(searchCondition);

      return query;
    }
  },


  {
    field: 'Country',
    type: 'String',

    // RETURN COUNTRY OF CUSTOMERS FIRST ADDRESS
    get: (customer, options) => {
      return models.addresses.findOne({ where : {customer_id: customer.id}}).then(address => {return address.country})
    },

    // ALLOW SEARCH ON COUNTRY
  //   search: function (query, search) {
  //     const sequelize = models.sequelize;
  //     console.log("QUERY BEFORE")
  //     console.log(query)
  //     query.include.push(models.addresses);
  //     console.log("QUERY AFTER")
  //     console.log(query)
  //     console.log("MODELS")
  //     console.log(models.addresses)
  //     const searchAddressCondition = sequelize.and(
  //     { '$addresses.country$' : { $like: `%${search}%` }},
  //     );
  //     console.log("SEARCH ADDRESS CONDITION")
  //     console.log(searchAddressCondition)

  //     const searchConditions = _.find(query.where.$and, '$or');
  //     console.log("SEARCH CONDITIONS")
  //     console.log(searchConditions)
  //     searchConditions.$or.push(searchAddressCondition);
  //   }
  }

  // FIELD TEST OF ENUMS
  // {
  //   field: 'enums',
  //   type:'Enum',
  //   enums: ["draft", "ongoing", "done"],
  //   get: (customer) => {
  //     return "test"
  //   }
  // },

  ],





  // ACTION

  actions: [

  {
    name: 'Export etiquettes pdf',
    endpoint: '/forest/actions/export-etiquettes',
    type: 'global',
    download: true,
    fields: [
            {
          field: 'start',
          description: 'Date de début',
          type: 'Date',
          isRequired: true,
        defaultValue: moment().add('-7', 'd').toDate(),
        },
            {
          field: 'end',
          description: 'Date de fin',
          type: 'Date',
          isRequired: true,
        defaultValue: new Date(),
        },
        ],
  },



// TEST ACTION WITH PREFILLED VALUE
  {
    name: 'levente',
    type: 'single',
    fields: [{
      field: 'columnData',
      description: 'Data of column',
      type: 'String',
      reference: 'orders',
      // widget: 'belongsto select',
      // enums: ['toto', 'tata'],
      isRequired: true,
    }, {
      field: 'phone',
      description: 'prefill',
      type: 'String',
    }, {
      field: 'email',
      type: 'String',
    }],
    values: (context) => {
      console.log(context)
      return {
        phone: 'test',
        email: context.email,
      }
    }
  }

  ],

});


