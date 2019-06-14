const Liana = require('forest-express-sequelize');
const express = require('express');
const router = express.Router();
const models = require('../models');


// SMART ACTION RETRIEVING A SMART FIELD VALUE
router.post('/actions/test-smart-field', Liana.ensureAuthenticated, (req, res) => {
    let attrs = req.body.data.attributes.values;
    let orderId = req.body.data.attributes.ids[0];
    console.log(orderId)
    return models.orders
    .findOne({ where : {ref: orderId}})
    .then(order => new Liana.ResourceSerializer(Liana, models.orders, order, null, {}, {}).perform())
    .then((orderSerialized) => {
      // NOTICE: Liana.ResourceSerializer will compute all Smart Field values of the record.
      console.log(orderSerialized);
      res.send({ success: `State of order is ${orderSerialized.data.attributes.state}` });
    });
});


// SMART ACTION UPDATING THE SHIPPING STATUS TO DONE
router.post('/actions/mark-as-done', Liana.ensureAuthenticated, (req, res) => {
    let attrs = req.body.data.attributes.values;
    console.log(attrs)
    let deliveryIds = attrs['deliveryIds']
    console.log(typeof deliveryIds)
    console.log(deliveryIds)
    console.log(deliveryIds[0])

    return models.orders
     .update({ status: 'Shipped' }, { where: { delivery_id: deliveryId }})
     then(() => {
        res.send({ success: 'Done - the world will know it is shipped!' });
      });
});

module.exports = router;
