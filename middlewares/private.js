const jwt = require('jsonwebtoken')   // import jwt

const checkJWT = (req, res, next) => {     // middleware privé
    const token = req.headers['authorization'] // extrait le token du header de la requête

    if (!token) {                               // si le token n'est pas trouvé 
        return res.status(401).json({ message: 'Token requis !' }) // retourne une erreur
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)     // decode le token et extrait les infos
        req.user = decoded                                            // ajoute les infos au corps de la requête
        next() // laisse passer ✅              
    } catch (error) {                                               // si le token est invalide
        return res.status(401).json({ message: 'Token invalide !' })    // retourne une erreur
    }
}
// export
module.exports = { checkJWT }