const Reservation = require('../models/reservation')  //import du model

const getReservationsByCatway = async (catwayNumber) => {      //fonction chercher par num de ponton
    const reservations = await Reservation.find({ catwayNumber: parseInt(catwayNumber) })  // chercher par num de ponton 
    return reservations                                                                      // retourne les reservations
}

const getReservationById = async (id) => {     //fonction chercher par id
    const reservation = await Reservation.findById(id)  // chercher par id
    return reservation                                  // retourne la reservation
}

const addReservation = async (reservationData) => {      //fonction ajout
    const reservation = new Reservation(reservationData)        // creation de la reservation
    await reservation.save()                            // sauvegarde
    return reservation                                  // retourne la reservation
}

const updateReservation = async (id, reservationData) => {           //fonction mise à jour
    const reservation = await Reservation.findByIdAndUpdate(id, reservationData, { new: true })    // chercher la reservation et la mettre à jour
    return reservation                                                                               // retourne la reservation
}

const deleteReservation = async (id) => {       //fonction suppression
    await Reservation.findByIdAndDelete(id)     // chercher la reservation et la supprimer
    return { message: 'Reservation supprimé !' }    // retourne un message de suppression
}
// export
module.exports = { getReservationsByCatway, getReservationById, addReservation, updateReservation, deleteReservation }