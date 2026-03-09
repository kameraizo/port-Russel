const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URL_MONGO)
        console.log('Connexion à MongoDB réussie ! ✅')
    } catch (error) {
        console.error('Erreur de connexion ❌', error.message)
    }
}

module.exports = connectDB