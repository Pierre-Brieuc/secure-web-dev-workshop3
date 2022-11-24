// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', (req, res) => {
	return res.status(200).send(locationsService.getAll())
})

router.get('/locations/:id', async (req, res) => {
	return res.status(200).send(await locationsService.getOne(req.params.id))
})

router.post('/locations', async (req, res) => {
	console.log(req.body)
	return res.status(200).send( await locationsService.create(req.body))
})

router.patch('/locations/:id', (req, res) => {
	return res.status(200).send(locationsService.update(req.params.id))
})

router.delete('/locations/:id', (req, res) => {
	return res.status(200).send(locationsService.deleteLoc())
})

router.get('/helloWorld', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router