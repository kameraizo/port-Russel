const express = require('express') // import express
const router = express.Router()      // import router

const { getAllCatways, getCatwaysById, addCatway, updateCatway, deleteCatway } = require('../services/catways')   // import des services
const { checkJWT } = require('../middlewares/private')   // import des middlewares

router.get('/', checkJWT, async (req, res) => {
    try {                                               // route de tous les catways
        const catways = await getAllCatways()     // appel de la fonction getAllCatways
        res.status(200).json(catways)
    } catch (error) {                     // si il y a une erreur
        res.status(500).json({ message: error.message })  //    retourne une erreur
    }
})

router.get('/:id', checkJWT, async (req, res) => { // route de la catway par id
    try {
        const catway = await getCatwaysById(req.params.id) // appel de la fonction getCatwaysById
        res.status(200).json(catway)
    } catch (error) {                                       // si il y a une erreur
        res.status(500).json({ message: error.message })          // retourne une erreur
    }
})

router.post('/', checkJWT, async (req, res) => {        // route d'ajout de catway
    try {
        const catway = await addCatway(req.body)         // appel de la fonction addCatway
        res.status(200).json(catway)                
    } catch (error) {                                           // si il y a une erreur
        res.status(500).json({ message: error.message })        // retourne une erreur
    }
})

router.put('/:id', checkJWT, async (req, res) => {       // route de mise à jour de catway
    try {
        const catway = await updateCatway(req.params.id, req.body) // appel de la fonction updateCatway
        res.status(200).json(catway)
    } catch (error) {                                             // si il y a une erreur
        res.status(500).json({ message: error.message })      // retourne une erreur
    }
})

router.delete('/:id', checkJWT, async (req, res) => {        // route de suppression de catway
    try { 
        const catway = await deleteCatway(req.params.id)        // appel de la fonction deleteCatway
        res.status(200).json(catway)
    } catch (error) {                                     //si il y a une erreur
        res.status(500).json({ message: error.message })   // retourne une erreur
    }
})
// export
module.exports = router