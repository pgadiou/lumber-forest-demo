const express = require('express');
const router = express.Router();
const Liana = require('forest-express-sequelize');
const models = require('../models');

router.post('/actions/mark-as-live', Liana.ensureAuthenticated,
  (req, res) => {
    let companyId = req.body.data.attributes.ids[0];
    console.log(req.body.data.attributes)

    return models.companies
      .update({ status: 'live' }, { where: { id: companyId }})
      .then(() => {
        res.send({ success: 'Company is now live!' });
      });
});

module.exports = router;
