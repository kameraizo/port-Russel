const express = require('express')
const router = express.Router()

const { getAllUsers, addUser, getUserByEmail, updateUser, deleteUser, authenticate } = require('../services/users')
const { checkJWT } = require('../middlewares/private')


router.post('/login', async (req, res) => {
    try {
        const token = await authenticate(req.body.email, req.body.password)
        req.session.token = token
        res.status(200).json({ message: 'Connexion réussie !' })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

router.get('/logout', (req, res) => {
  req.session.destroy()
res.status(200).json({ message: 'Deconnexion réussie !' })
})

router.get('/', checkJWT, async (req, res) => {
  try {

    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:email', checkJWT, async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await addUser(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:email', checkJWT, async (req, res) => {
  try {
    const user = await updateUser(req.params.email, req.body)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:email', checkJWT, async (req, res) => {
  try {
    const user = await deleteUser(req.params.email)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router