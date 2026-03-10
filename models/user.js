const mongoose = require('mongoose') // import mongoose
const bcrypt = require('bcrypt')     // import bcrypt

const userSchema = new mongoose.Schema({     // structure de l'utilisateur
    username: {
        type: String,
        required: true          // obligatoire nom de l'utilisateur
    },
    email: {
        type: String,   // email
        required: true,
        unique: true            // unique dans la BDD
    },
    password: {
        type: String,   // mot de passe
        required: true
    }
})
userSchema.pre('save', async function() { //avant la sauvegarde dans Mongo
    if (this.isModified('password')) {  // si le mot de passe a changé
        this.password = await bcrypt.hash(this.password, 10) //chiffrage avec bcrypt
    }                                                        // 10 = niveau de secur du chiffrmeent 
})
//creation du model
const User = mongoose.model('User', userSchema)
//export
module.exports = User