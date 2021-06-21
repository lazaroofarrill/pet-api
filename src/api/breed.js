const express = require('express')
const router = express.Router()

const {Breed} = require('../common/db/models')


module.exports = router

router.get('/', async (req, res) => {
    try {
        let breeds = await Breed.findAll()
        res.json(breeds)
    } catch (e) {
        console.log(e)
        res.status(500).send('error del servidor')
    }
})

router.post('/', async (req, res) => {
    try {
        let newBreed = await Breed.create(req.body)
        res.status(201).json(newBreed)
    } catch (e) {
        req.status(500).send(e.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let breed = await Breed.findOne({where: {id: req.params.id}})

        if (!breed) {
            res.status(404).send('raza no encontrada')
        } else {
            await breed.update(req.body)
            let modBreed = await Breed.findOne({where: {id: req.params.id}})
            res.json(modBreed)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})