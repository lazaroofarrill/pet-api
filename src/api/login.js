const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()


const {Person} = require('../common/db/models')
const bcrypt = require("bcrypt")
const saltRounds = 10;

module.exports = router

router.post('/', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password
        console.log(`saltrounds are ${saltRounds}`)
        // const encryptedPassword = await bcrypt.hash(password, 10)

        let user = await Person.findOne({where: {username: username}})
        if (!user) {
            res.status(404).send("user not found")
        } else {
            const comparison = bcrypt.compare(password, user.password)
            if (!comparison) {
                res.status(401).send("credentials don't match")
            } else {
                const token = generateAccessToken(username)
                res.json(token)
            }
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})

function generateAccessToken(username) {
    return jwt.sign({user: username}, process.env.SECRET, {expiresIn: '1800s'});
}