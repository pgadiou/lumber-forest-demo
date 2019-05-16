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
  let conditionSearch = '';

  if (req.query.search) {
    conditionSearch = `customers.email LIKE '%${req.query.search}%'`;
  }

  const queryData = `
    SELECT customers.id,
      customers.email,
      count(orders.*) AS orders,
      sum(products.price) AS amount,
      customers.created_at,
      customers.updated_at
    FROM customers
    JOIN orders ON customers.id = orders.customer_id
    JOIN products ON orders.product_id = products.id
    ${conditionSearch ? `WHERE ${conditionSearch}` : ''}
    GROUP BY customers.id
    ORDER BY customers.id
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  console.log(queryData)

  const queryCount = `
    SELECT COUNT(*)
    FROM customers
    WHERE
      EXISTS (
        SELECT *
        FROM orders
        WHERE orders.customer_id = customers.id
      )
      ${conditionSearch ? `AND ${conditionSearch}` : ''}
  `;

  console.log(queryCount)

  return P
    .all([
      models.sequelize.query(queryData, { type: queryType }),
      models.sequelize.query(queryCount, { type: queryType }),
    ])
    .spread((customerStatsList, customerStatsCount) => {
      const customerStatsSerializer = new JSONAPISerializer('customer_stats', {
        attributes: ['email', 'orders', 'amount']
      });
      const customerStats = customerStatsSerializer.serialize(customerStatsList);
      const count = customerStatsCount[0].count
      res.send({ ...customerStats, meta:{ count: count }});
    })
    .catch((err) => next(err));
});

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
