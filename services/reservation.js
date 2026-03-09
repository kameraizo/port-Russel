const Reservation = require('../models/reservation')

const getReservationsByCatway = async (catwayNumber) => {
    const reservations = await Reservation.find({ catwayNumber: catwayNumber })
    return reservations
}

const getReservationById = async (id) => {
    const reservation = await Reservation.findById(id)
    return reservation
}

const addReservation = async (reservationData) => {
    const reservation = new Reservation(reservationData)
    await reservation.save()
    return reservation
}

const updateReservation = async (id, reservationData) => {
    const reservation = await Reservation.findByIdAndUpdate(id, reservationData, { new: true })
    return reservation
}

const deleteReservation = async (id) => {
    await Reservation.findByIdAndDelete(id)
    return { message: 'Reservation supprimé !' }
}

module.exports = { getReservationsByCatway, getReservationById, addReservation, updateReservation, deleteReservation }