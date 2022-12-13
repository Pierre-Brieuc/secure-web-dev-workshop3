// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
require('../users/strategies/jwt')(passport)


const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()


router.get('/locations', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => getAllLocationsRoute(req,res))

router.get('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => getOneLocationRoute(req,res))

router.post('/locations', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => createLocationRoute(req,res))

router.put('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => updateOneLocationRoute(req,res))

router.delete('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => deleteOneLocationRoute(req,res))

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router


//------------------------------------ Functions for roots --------------------------------------------------//


async function getAllLocationsRoute (req, res) {
	return res.status(200).send({locations : await locationsService.getAll()})
} 

async function getOneLocationRoute (req, res) {
	return res.status(200).send(await locationsService.getOne(req.params.id))
}

async function createLocationRoute (req, res) {
	return res.status(200).send( await locationsService.create(req.body))
}

async function updateOneLocationRoute (req, res) {
	return res.status(200).send(await locationsService.update(req.params.id, req.body))
}

async function deleteOneLocationRoute(req, res) {
	return res.status(200).send(await locationsService.deleteLoc(req.params.id))
}