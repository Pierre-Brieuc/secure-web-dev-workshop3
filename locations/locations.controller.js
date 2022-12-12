// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
require('../users/strategies/jwt')(passport)

router.get('/locations', passport.authenticate('jwt',{session:false}), async (req, res) => {
	return res.status(200).send({locations : await locationsService.getAll()})
})

router.get('/locations/:id', passport.authenticate('jwt',{session:false}), async (req, res) => {
	return res.status(200).send(await locationsService.getOne(req.params.id))
})

router.post('/locations', passport.authenticate('jwt',{session:false}), async (req, res) => {
	console.log(req.body)
	return res.status(200).send( await locationsService.create(req.body))
})

router.patch('/locations/:id', passport.authenticate('jwt',{session:false}), async (req, res) => {
	return res.status(200).send(await locationsService.update(req.params.id, req.body))
})

router.delete('/locations/:id', passport.authenticate('jwt',{session:false}), async (req, res) => {
	return res.status(200).send(await locationsService.deleteLoc(req.params.id))
})

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router
