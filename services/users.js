const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const User = require('../models/user')

const getAllUsers = async () => {
    const users = await User.find()
    return users
}
const addUser = async (userData) => {
    const user = new User(userData)
    await user.save()
    return user
}

const getUseByEmail = async (email) => {
    const user = await User.findOne({ email: email })
    return user
}

const updateUser = async (email, userData) => {
    const user = await User.findOneAndUpdate({ email: email }, userData, { new: true })
    return user
}

const deleteUser = async (email) => {
    await User.findOneAndDelete({email: email})
    return { message: 'User supprimé !' }
}

const authenticate = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) throw new Error('Utilisateur non trouvé')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Mot de passe incorrect')

    const token = jwt.sign(
        { email: user.email },      // infos dans le token
        process.env.SECRET_KEY,     // clé secrète
        { expiresIn: '24h' }        // durée de validité
    )

    return token
}





module.exports = { getAllUsers, authenticate, addUser, getUseByEmail, updateUser, deleteUser }