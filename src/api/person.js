const express = require('express')
const router = express.Router()

const {Person} = require('../common/db/models')

router.get('/', async (req, res) => {
    try {
        let persons = await Person.findAll()
        res.json(persons)
    } catch (e) {
        res.sendStatus(500).send("Error de servidor")

    }
})

router.post('/', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    if (!username || !password) {
        res.status(400).send('Dato requerido')
    } else {
        let newPerson = await Person.create(req.body).catch(e => {
            console.log(e.message)
            res.status(500).send('error de servidor')
        })
        res.status(201).send(newPerson)
    }
})

router.put('/:id', async (req, res) => {
    try {

        let person = await Person.findOne({where: {id: req.params.id}})
        if (person === null) {
            res.status(404).send('elemento no encontrado')
        } else {
            await person.update(req.body)
            let modPerson = await Person.findOne({where: {id: person.id}})

            res.status(200).json(modPerson)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = router