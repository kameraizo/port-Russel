//import mongoose pour interagir avec mongo
const mongoose = require('mongoose')


// plan de catways   //création de catways
const catwaySchema = new mongoose.Schema({ 
    catwayNumber: {
        type: Number,   //nombre
        required: true, //obligatoire
        unique: true    //unique dans la BDD
    },
    catwayType: {
        type: String,   //long ou court
        required: true
    },
    catwayState: {
        type: String,      //description de l'etat du ponton
        required: true
    }
})
 //creation du model a partir du schema
 // ce modele permet de créer, chercher, modifier et supprimer des catways
const Catway = mongoose.model('Catway', catwaySchema)
module.exports = Catway