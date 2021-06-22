const express = require('express')
const router = express.Router()
const {verifyToken} = require('../common/middleware/auth')

const {Pet} = require('../common/db/models')


module.exports = router
router.use(verifyToken)


router.get('/', async (req, res) => {
    try {
        let pets = await Pet.findAll()
        res.json(pets)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/', async (req, res) => {
    try {
        let newPet = await Pet.create(req.body)
        res.status(201).json(newPet)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.put('/:id', async (req, res) => {
    try {

        let pet = await Pet.findOne({where: {id: req.params.id}})
        if (pet === null) {
            res.status(404).send('elemento no encontrado')
        } else {
            await pet.update(req.body)
            let modPet = await Pet.findOne({where: {id: pet.id}})
            res.status(200).json(modPet)
        }
    } catch (e) {
        if (e.toString().indexOf("invalid signature")) {
            return res.status(401).send(e.message)
        }
        res.status(500).send(e.message)
    }
})