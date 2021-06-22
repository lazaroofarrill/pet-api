const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token === null) {
            return res.sendStatus(401)
        }

        jwt.verify(token, process.env.SECRET, (err, user) => {
            console.log(err)

            if (err) return res.sendStatus()

            req.user = user
            console.log(user)
            next()
        })
    } catch (e) {
        if (e.code.indexOf('INVALID_STATUS_CODE')) {
            return res.sendStatus(401)
        }
        res.status(500).json(e)
    }
}

module.exports = {
    verifyToken
}