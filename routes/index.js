var express = require('express');  // import express
var router = express.Router();     // import router

const usersRouter = require('./users')    // import des routes
const catwaysRouter = require('./catways')    // import des routes
const reservationsRouter = require('./reservation')  // import des routes

router.use('/users', usersRouter)    // use des routes
router.use('/catways', catwaysRouter)    // use des routes
router.use('/catways/:catwayId/reservations', (req, res, next) => {      // use des routes
  req.catwayId = req.params.catwayId      // ajout de l'id de la catway
  next()                                  // laisse passer
}, reservationsRouter)                    // use des routes

/* GET home page. */
router.get('/', function(req, res, next) {    // route de la page d'accueil
  res.render('index', { title: 'Port Russell' });    // render de la page
});
// export
module.exports = router;
