const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (token === null) {
            return res.sendStatus(401)
        }

        console.log(token)
        jwt.verify(token, process.env.SECRET, (err, user) => {
            console.log(err)

            if (err) return res.sendStatus()

            req.user = user
            console.log(user)
            next()
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    verifyToken
}