const Catway = require('../models/catways')  //import du model

const getAllCatways = async () => {       //fonction chercher
    const catways = await Catway.find()  // chercher toutes les catways
    return catways                       // retourne toutes les catways
} 

const getCatwaysById = async (id) => {     //fonction chercher par id
    const catway = await Catway.findById(id)  // chercher par id
    return catway                              // retourne la catway
}

const addCatway = async (catwayData) => {       //fonction ajout d'une catway
    const catway = new Catway(catwayData)       // creation de la catway
    await catway.save()                             // sauvegarde
    return catway                                  // retourne la catway
}

const updateCatway = async (id, catwayData) => {        //fonction mise à jour d'une catway
    const catway = await Catway.findByIdAndUpdate(id, catwayData, { new: true })    // chercher la catway et la mettre à jour
    return catway                                                                       // retourne la catway
}


const deleteCatway = async (id) => {            //fonction suppression d'une catway
    await Catway.findByIdAndDelete(id)           // chercher la catway et la supprimer
    return { message: 'Catway supprimé !' }      // retourne un message de suppression
}
//export
module.exports = { getAllCatways, getCatwaysById, addCatway, updateCatway, deleteCatway }