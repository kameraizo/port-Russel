var express = require('express');  // import express
var router = express.Router();     // import router

const usersRouter = require('./users')    // import des routes
const catwaysRouter = require('./catways')    
const reservationsRouter = require('./reservation')  
const reservation = require('../models/reservation')
const jwt = require('jsonwebtoken')
const Catway = require('../models/catways')
const Reservations = require('../models/reservation')
const Users = require('../models/user');

router.use('/users', usersRouter)    // use des routes
router.use('/catways', catwaysRouter)    
router.use('/catways/:catwayId/reservations', (req, res, next) => {    
  req.catwayId = req.params.catwayId      // ajout de l'id de la catway
  next()                                  // laisse passer
}, reservationsRouter)                    // use des routes

router.get('/users-page', async function (req, res) {   // route de la page des utilisateurs
  const token = req.session.token
  if (!token) return res.redirect('/')
  const users = await Users.find()
  res.render('users', { users: users })
})

router.get('/reservations-page', async function (req, res) {   // route de la page des reservations
  const token = req.session.token
  if (!token) return res.redirect('/')
  const reservations = await Reservations.find()
  res.render('reservations', { reservations: reservations })
})

router.get('/catways-page', async function(req, res) {   // route de la page des catways
  const token =req.session.token
  if (!token) return res.redirect('/')
    const catways = await Catway.find()
  res.render('catways', { catways: catways })
})


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
    username: decoded.username,
    reservations: reservations
  })
})

// export
module.exports = router;
