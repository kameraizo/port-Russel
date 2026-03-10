const jwt = require('jsonwebtoken')   // import jwt
const bcrypt = require('bcrypt')      // import bcrypt


const User = require('../models/user')     // import du model

const getAllUsers = async () => {    //fonction
    const users = await User.find()  // chercher tous les users
    return users
}
const addUser = async (userData) => {   //fonction
    const user = new User(userData)        // création de l'utilisateur
    await user.save()                       // sauvegarde
    return user                             // retourne l'utilisateur
}

const getUseByEmail = async (email) => {    //fonction
    const user = await User.findOne({ email: email })  // chercher email
    return user                                 // retourne email
}

const updateUser = async (email, userData) => {      //fonction
    const user = await User.findOneAndUpdate({ email: email }, userData, { new: true })    // chercher l'utilisateur et le mettre à jour
    return user                                     // retourne l'utilisateur
}

const deleteUser = async (email) => {                    //fonction suppression
    await User.findOneAndDelete({email: email})           // chercher l'utilisateur et le supprimer
    return { message: 'User supprimé !' }               // retourne un message de suppression
}

const authenticate = async (email, password) => {           //fonction authentification
    const user = await User.findOne({ email: email })       // chercher l'utilisateur par son email
    if (!user) throw new Error('Utilisateur non trouvé')    // si l'utilisateur n'est pas trouvé retourne une erreur

    const isValid = await bcrypt.compare(password, user.password)  // comparer le mot de passe envoyé et celui de la BDD
    if (!isValid) throw new Error('Mot de passe incorrect')        // si le mot de passe est incorrect retourne une erreur

    const token = jwt.sign(
        { email: user.email },      // infos dans le token
        process.env.SECRET_KEY,     // clé secrète
        { expiresIn: '24h' }        // durée de validité
    )

    return token
}




//export
module.exports = { getAllUsers, authenticate, addUser, getUseByEmail, updateUser, deleteUser }