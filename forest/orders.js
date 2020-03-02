const Liana = require('forest-express-sequelize');
const models = require('../models/');
const express = require('express');
const router = express.Router();

Liana.collection('orders', {

  // FIELDS - TESTS SMART FIELDS
  fields: [

  {
    field: "state",
    type: "Number",
    get: (order) => {
      return 4;
    }
  },

    // smart fields - jauge
  {
    field: "html example",
    type: "String",
    get: (order) => {
      return `<div style="background-color:#00000057; color:white; padding:20px;">

      <h2>London</h2>
      <p>London is the capital city of England. It is the most populous city in the United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
      <a href="https://www.google.com/maps/place/London,+UK/data=!4m2!3m1!1s0x47d8a00baf21de75:0x52963a5addd52a99?sa=X&ved=2ahUKEwj21tWMo5TnAhUSHxoKHastC6UQ8gEwAHoECAsQAQ">Go to map</a>
      </div>`;
    }
  },

  // smart fields - jauge
  {
    field: "jauge",
    type: "String",
    get: (order) => {
      var progressValue = 120;
      var maxValue = 200;
      var percentage = (progressValue / maxValue) * 100;
      return `<div style='position:relative;'><span style='text-align:left; width:100%;'>0</span><span style='text-align:right; width:100%; position:absolute;'>${maxValue}</span><meter min='0' low='40' high='80' max='${maxValue}' value='${progressValue}' style='width:100%'></meter><br><span style='width:10%; position:absolute; left:calc(${percentage}% - 5%); text-align:center;'>${progressValue}</span></div>`;
    }
  },

  // smart fields - file upload
  {
    field: "file",
    type: "File",
    set: (order, file) => {
      // Don't forget to return the order.
      console.log(file);
      return order;
    }
  },

  // smart fields - simple string
  {
    field: "hello",
    type: "String",
    get: (order) => `hello`
  },

  // smart fields - JSON
  {
    field:'json',
    type: 'JSON',
    get: (order) => {
      return {
        "glossary": {
          "title": "example glossary",
          "GlossDiv": {
            "title": "S",
            "GlossList": {
              "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                  "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                },
                 "GlossSee": "markup"
              }
            }
          }
        }
      }
    },
  }

  ],

  // SEGMENTS
  // segments: [{
  //   name: 'Test req.user',
  //   where: (order) => {
  //     return models.sequelize.query(`
  //       SELECT *
  //       FROM orders
  //     `, { type: models.sequelize.QueryTypes.SELECT })
  //     .then((orders) => {
  //       console.log(req.user)
  //       return orders
  //     });
  //   }
  // }]


  // ACTIONS PREFILL
  // actions: [{
  //      name: 'Update company info',
  //      endpoint: 'forest/actions/organization-update-company-info',
  //      type: 'single',
  //      fields: [{
  //          field: 'companyName',
  //          type: 'String',
  //          isRequired: true,
  //          description: 'Company name',
  //        },
  //        {
  //          field: 'contactFirstName',
  //          type: 'String',
  //          isRequired: true,
  //          description: 'Contact first name',
  //        },
  //        {
  //          field: 'contactLastName',
  //          type: 'String',
  //          isRequired: true,
  //          description: 'Contact last name',
  //        },
  //        {
  //          field: 'phone',
  //          type: 'String',
  //          isRequired: true,
  //        },
  //      ],
  //      values: context => ({
  //        companyName: context.companyName,
  //        contactFirstName: context.contactFirstName,
  //        contactLastName: context.contactLastName,
  //        phone: context.phone,
  //      }),
  //    }],


  // ACTIONS ARRAY OF IDs
  // actions: [{
  //   name: 'Mark as done',
  //   type: 'Global',
  //   fields: [{
  //     field: 'deliveryIds',
  //     description: 'Array of Ids.',
  //     type: ['Number'],
  //     isRequired: true,
  //   }],
  // }, {
  //   name: 'Test smart field',
  // }],


});
