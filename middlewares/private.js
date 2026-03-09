const jwt = require('jsonwebtoken')

const checkJWT = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Token requis !' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next() // laisse passer ✅
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide !' })
    }
}

module.exports = { checkJWT }