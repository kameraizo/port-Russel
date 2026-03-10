var express = require('express');  // import express
var router = express.Router();     // import router

const usersRouter = require('./users')    // import des routes
const catwaysRouter = require('./catways')    // import des routes
const reservationsRouter = require('./reservation')  // import des routes
const reservation = require('../models/reservation')
const jwt = require('jsonwebtoken')


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

router.get('/dashboard', async function(req, res){
  const token = req.query.token || req.session.token
  if (!token) {
    return res.redirect('/')                   // redirige vers la page de login
  }
  req.session.token = token
  const jwt = require('jsonwebtoken')   // import jwt
  const decoded = jwt.verify(token, process.env.SECRET_KEY)   // decode le token

  //recup des reservations 
  const today = new Date()
  const reservations = await reservation.find({
    endDate: { $gte: today },
})

  res.render('dashboard', { 
    email: decoded.email,
    reservations: reservations
  })
})
// export
module.exports = router;
