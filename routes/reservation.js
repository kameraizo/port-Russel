const express = require('express') // import express
const router = express.Router()    // import router

const { getReservationsByCatway, getReservationById, addReservation, updateReservation, deleteReservation } = require('../services/reservation') // import des services
const { checkJWT } = require('../middlewares/private')        // import des middlewares

router.get('/', checkJWT, async (req, res) => {   // route de tous les reservations
    try {
        const reservations = await getReservationsByCatway(req.catwayId)  // appel de la fonction getReservationsByCatway
        res.status(200).json(reservations)                        // retourne la liste des reservations
    } catch (error) {                                             // si il y a une erreur
        res.status(500).json({ message: error.message })        // retourne une erreur
    }
})

router.get('/:id', checkJWT, async (req, res) => {                     // route de la reservation par id
    try {
        const reservation = await getReservationById(req.params.id)      // appel de la fonction getReservationById
        res.status(200).json(reservation)
    } catch (error) {                                                   // si il y a une erreur
        res.status(500).json({ message: error.message })                // retourne une erreur
    }
})

router.post('/', checkJWT, async (req, res) => {                       // route d'ajout de reservation
    try {
        const reservation = await addReservation(req.body)             // appel de la fonction addReservation
        res.status(200).json(reservation)                           
    } catch (error) {                                                   // si il y a une erreur
        res.status(500).json({ message: error.message })                // retourne une erreur
    }
})

router.put('/:id', checkJWT, async (req, res) => {                     // route de mise à jour de reservation
    try {
        const reservation = await updateReservation(req.params.id, req.body)            // appel de la fonction updateReservation
        res.status(200).json(reservation)
    } catch (error) {                                                   // si il y a une erreur
        res.status(500).json({ message: error.message })                // retourne une erreur
    }
})

router.delete('/:id', checkJWT, async (req, res) => {                  // route de suppression de reservation
    try {
        const reservation = await deleteReservation(req.params.id)            // appel de la fonction deleteReservation
        res.status(200).json(reservation)
    } catch (error) {                                                     // si il y a une erreur
        res.status(500).json({ message: error.message })                // retourne une erreur
    }
})
// export
module.exports = router