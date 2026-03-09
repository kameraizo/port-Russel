const Catway = require('../models/catway')

const getAllCatways = async () => {
    const catways = await Catway.find()
    return catways
}

const getCatwaysById = async (id) => {
    const catway = await Catway.findById(id)
    return catway
}

const addCatway = async (catwayData) => {
    const catway = new Catway(catwayData)
    await catway.save()
    return catway
}

const updateCatway = async (id, catwayData) => {
    const catway = await Catway.findByIdAndUpdate(id, catwayData, { new: true })
    return catway
}


const deleteCatway = async (id) => {
    await Catway.findByIdAndDelete(id)
    return { message: 'Catway supprimé !' }
}

module.exports = { getAllCatways, getCatwaysById, addCatway, updateCatway, deleteCatway }