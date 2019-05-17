const Liana = require('forest-express-sequelize');
const express = require('express');
const router = express.Router();
const models = require('../models');


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
