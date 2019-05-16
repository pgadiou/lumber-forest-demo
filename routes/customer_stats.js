const Liana = require('forest-express-sequelize');
const express = require('express');
const router = express.Router();
const models = require('../models');
const P = require('bluebird');
const JSONAPISerializer = require('jsonapi-serializer').Serializer

router.get('/customer_stats', Liana.ensureAuthenticated, (req, res, next) => {
  const limit = parseInt(req.query.page.size) || 20;
  const offset = (parseInt(req.query.page.number) - 1) * limit;
  const queryType = models.sequelize.QueryTypes.SELECT;
  const searchTerm = '%' + req.query.search + '%'

  const dataQuery = `
    SELECT customers.id,
    customers.email,
    count(orders.*) AS orders,
    sum(products.price) AS amount,
    customers.created_at,
    customers.updated_at
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    JOIN products ON orders.product_id = products.id
    GROUP BY customers.id
    ORDER BY customers.id
    limit ${limit}
    offset ${offset}
  `;

    const countQuery = `
      SELECT COUNT(*)
      FROM customers
      WHERE EXISTS (SELECT *
        FROM orders
        WHERE orders.customer_id = customers.id);
    `;

  const searchQuery = `
    SELECT customers.id,
    customers.email,
    count(orders.*) AS orders,
    sum(products.price) AS amount,
    customers.created_at,
    customers.updated_at
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    JOIN products ON orders.product_id = products.id
    WHERE customers.email
    LIKE '${searchTerm}'
    GROUP BY customers.id
    limit ${limit}
    offset ${offset}
  `;

    if (req.query.search) {

      return P
          .all([
            models.sequelize.query(searchQuery, { type: queryType })
          ])
          .then((customer_stats_data) => {
            const customerStatsSerializer = new JSONAPISerializer('customer_stats', {
              attributes: ["email", "orders", "amount"]
            });
            const customer_stats = customerStatsSerializer.serialize(customer_stats_data[0]);
            res.send(customer_stats);
          })
          .catch((err) => next(err));
    }

    else {
      return P
          .all([
            models.sequelize.query(countQuery, { type: queryType }),
            models.sequelize.query(dataQuery, { type: queryType })
          ])
          .spread((count_data, customer_stats_data) => {
            return customer_stats_info = {data: customer_stats_data, count: count_data[0].count}
          })
          .then((customer_stats_info) => {
            const customerStatsSerializer = new JSONAPISerializer('customer_stats', {
              attributes: ["email", "orders", "amount"]
            });
            const customer_stats = customerStatsSerializer.serialize(customer_stats_info.data);
            const count = customer_stats_info.count
            res.send({...customer_stats, meta:{ count: count}});
          })
          .catch((err) => next(err));
    }

});

// router.get('/customer_stats/count', Liana.ensureAuthenticated, (req, res, next) => {
//   res.send({count: 50})
// });

router.get('/customer_stats/:id', Liana.ensureAuthenticated, function (req, res) {
  res.status(400).send('Implement the GET in /forest/customer_stats/:id.');
});

router.post('/customer_stats', Liana.ensureAuthenticated, function (req, res) {
  res.status(400).send('Implement the POST in /forest/customer_stats');
});

router.put('/customer_stats/:id', Liana.ensureAuthenticated, function (req, res) {
  res.status(400).send('Implement the PUT in /forest/customer_stats/:id.');
});

module.exports = router;
