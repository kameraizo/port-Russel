const mongoose = require('mongoose') //import mongoose
const Schema = mongoose.Schema  //schema

//strucuture de reservation
const reservationSchema = new Schema({
    catwayNumber: {
        type: Number,   //numero de ponton reservé
        required: true     
    },
    clientName: {
        type: String,            //nom du client
       required: true
    },
    boatName: {
        type: String,    //nom du bateau 
        required: true
    },
    startDate: {
        type: Date,   //date de debut
        required: true
    },
    endDate: {
        type: Date,     //date de fin
        required: true
    }
    
})
//creation du model
const reservation = mongoose.model('Reservation', reservationSchema)
//export
module.exports = reservation