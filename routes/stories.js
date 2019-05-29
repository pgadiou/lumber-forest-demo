const Liana = require('forest-express-sequelize');
const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/stories', Liana.ensureAuthenticated, (req, res, next) => {
  res.send({"data":[{"type":"stories","id":"67565","attributes":{"email":"jessy_mills60@example.net","total_amount":97200.0,"orders_count":3, "pictures":["https://pixel.nymag.com/imgs/daily/vulture/2017/11/01/01-thor-ragnarok.w700.h467.jpg", "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg"], "videos":["https://www.youtube.com/watch?v=1TuDn4UojXo", "https://www.youtube.com/watch?v=cbstP4XMzdY"],"quotes":["Le samedi a 3h je suis? dans mon lit", "Mon film préféré? La ligue des gentlemen extraordinaires", "Mes vacances revees c'est? du soleil"]},"links":{"self":"/customerStat/67565"}}],"meta":{"count":1}});
})

module.exports = router;
