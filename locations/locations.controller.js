// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

router.get('/locations', (req, res) => {
	return res.status(200).send(locationsService.getAll())
})

router.get('/locations:id', (req, res) => {
	return res.status(200).send(locationsService.getOne(id))
})

router.get('/locations/create', (req, res) => {
	return res.status(200).send(locationsService.create())
})

router.get('/locations/update', (req, res) => {
	return res.status(200).send(locationsService.update())
})

router.get('/locations/delete', (req, res) => {
	return res.status(200).send(locationsService.deleteLoc())
})

router.get('/helloWorld', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router
