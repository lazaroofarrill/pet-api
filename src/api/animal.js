const express = require('express')
const router = express.Router()

const {Animal} = require('../common/db/models')


module.exports = router

router.get('/', async (req, res) => {
    try {
        let animals = await Animal.findAll()
        res.json(animals)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/', async (req, res) => {
    try {
        let newAnimal = await Animal.create(req.body)
        res.status(201).json(newAnimal)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.put('/:id', async (req, res) => {
    try {

        let animal = await Animal.findOne({where: {id: req.params.id}})
        if (animal === null) {
            res.status(404).send('elemento no encontrado')
        } else {
            await animal.update(req.body)
            let modAnimal = await Animal.findOne({where: {id: animal.id}})
            res.status(200).json(modAnimal)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})