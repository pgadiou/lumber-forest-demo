const P = require('bluebird');
const express = require('express');
const router = express.Router();
const Liana = require('forest-express-sequelize');
const models = require('../models');

router.get('/customers/:customer_id/relationships/deliveries',
  Liana.ensureAuthenticated, (req, res, next) => {
    let limit = parseInt(req.query.page.size) || 10;
    let offset = (parseInt(req.query.page.number) - 1) * limit;

    let queryType = models.sequelize.QueryTypes.SELECT;

    let countQuery = `
      SELECT COUNT(*)
      FROM deliveries
      JOIN orders ON orders.delivery_id = deliveries.id
      JOIN customers ON orders.customer_id = customers.id
      WHERE customer_id = ${req.params.customer_id}
    `;

    let dataQuery = `
      SELECT deliveries.*
      FROM deliveries
      JOIN orders ON orders.delivery_id = deliveries.id
      JOIN customers ON orders.customer_id = customers.id
      WHERE customer_id = ${req.params.customer_id}
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return P
      .all([
        models.sequelize.query(countQuery, { type: queryType }),
        models.sequelize.query(dataQuery, { type: queryType })
      ])
      .spread((count, deliveries) => {
        return new Liana.ResourceSerializer(Liana, models.deliveries, deliveries, null, {}, {
          count: count[0].count
        }).perform();
      })
      .then((customers) => {
        res.send(customers);
      })
      .catch((err) => next(err));
  });

router.post('/actions/export-etiquettes', Liana.ensureAuthenticated,
  (req, res) => {
    console.log(req.body.data.attributes)
});

module.exports = router;
