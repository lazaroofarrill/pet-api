const express = require('express')
const router = express.Router()
const {verifyToken} = require('../common/middleware/auth')

const {Shop, Animal, Person, Pet} = require('../common/db/models')

module.exports = router
router.use(verifyToken)


router.get('/', async (req, res) => {
    try {
        let shops = await Shop.findAll()
        res.json(shops)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let shop = await Shop.findAll(
            {
                include: [{
                    model: Animal,
                    as: 'animals'
                }]
            },
            {where: {id: req.params.id}},
        )
        if (!shop) {
            res.sendStatus(404)
        } else {
            res.json(shop)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/', async (req, res) => {
    try {
        let newShop = await Shop.create(req.body)
        res.status(201).json(newShop)
    } catch (e) {
        req.status(500).send(e.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let shop = await Shop.findOne({where: {id: req.params.id}})

        if (!shop) {
            res.status(404).send('raza no encontrada')
        } else {
            await shop.update(req.body)
            let modShop = await Shop.findOne({where: {id: req.params.id}})
            res.json(modShop)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.post('/sell/:id', async (req, res) => {
    try {
        let body = req.body
        let animalId = body.animal
        let name = body.name

        let person = await Person.findOne({where: {username: req.user.user}})
        let animal = await Animal.findOne({where: {id: animalId}})

        if (!animal || !person) {
            res.status(404).send("elemento no encontrado")
            return
        }
        if (animal.amount === 0) {
            res.status(400).send('no hay ejemplares disponibles')
        } else {
            animal.amount--
            await animal.update({amount: animal.amount})
            let newPet = await Pet.create({
                name: name,
                OwnerId: person.id,
                BreedId: animal.BreedId
            })
            res.status(201).json(newPet)
        }
    } catch (e) {
        res.status(500).send(e.message)
    }
})
