const express = require('express')   // import express 
const router = express.Router()      // import router

const { getAllUsers, addUser, getUserByEmail, updateUser, deleteUser, authenticate } = require('../services/users')  // import des services
const { checkJWT } = require('../middlewares/private')            // import des middlewares


router.post('/login', async (req, res) => {            // route de login 
    try {
        const token = await authenticate(req.body.email, req.body.password)    // appel de la fonction authentification 
        req.session.token = token                                           
        res.setHeader('Authorization', token)                               // ajoute le token au header de la requête
        res.status(200).json({ message: 'Connexion réussie !' })             //retourne un message de connexion succeed
    } catch (error) {
        res.status(401).json({ message: error.message })                       // retourne une erreur
    }
})

router.get('/logout', (req, res) => {                                // route de logout 
  req.session.destroy()                                             // destroy la session
res.status(200).json({ message: 'Deconnexion réussie !' })        // retourne un message de deconnexion succeed
})

router.get('/', checkJWT, async (req, res) => {                 // route de tous les utilisateurs 
  try {

    const users = await getAllUsers()                                 // appel de la fonction getAllUsers
    res.status(200).json(users)                                       // retourne la liste des utilisateurs
  } catch (error) {                                                    // si il y a une erreur
    res.status(500).json({ message: error.message })                   // retourne une erreur
  }
})

router.get('/:email', checkJWT, async (req, res) => {            // route de l'utilisateur par email
  try { 
    const user = await getUserByEmail(req.params.email)            // appel de la fonction getUserByEmail
    res.status(200).json(user)                                    // retourne l'utilisateur
  } catch (error) {
    res.status(500).json({ message: error.message })              // retourne une erreur
  }
})

router.post('/', async (req, res) => {                 // route d'ajout d'utilisateur
  try {
    const user = await addUser(req.body)                    // appel de la fonction addUser
    res.status(201).json(user)
  } catch (error) {            
    res.status(500).json({ message: error.message })           // retourne une erreur
  }
})

router.put('/:email', checkJWT, async (req, res) => {                  // route de mise à jour d'utilisateur
  try {
    const user = await updateUser(req.params.email, req.body)                // appel de la fonction updateUser
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })                      // retourne une erreur
  }
})

router.delete('/:email', checkJWT, async (req, res) => {                   // route de suppression d'utilisateur
  try {
    const user = await deleteUser(req.params.email)                                               // appel de la fonction deleteUser
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })                              // retourne une erreur
  }
})
// export
module.exports = router