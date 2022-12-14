// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
require('../users/strategies/jwt')(passport)


const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()


router.get('/locations', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => getAllLocationsRoute(req,res,next))

router.get('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => getOneLocationRoute(req,res,next))

router.post('/locations', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => createLocationRoute(req,res,next))

router.put('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => updateOneLocationRoute(req,res,next))

router.delete('/locations/:id', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => deleteOneLocationRoute(req,res,next))

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router


//------------------------------------ Functions for routes --------------------------------------------------//


async function getAllLocationsRoute (req, res, next) {
	try{
		return res.status(200).send({locations : await locationsService.getAll()})
	} catch (err){
		next(err)
	}
} 

async function getOneLocationRoute (req, res, next) {
	try{
		return res.status(200).send({location : await locationsService.getOne(req.params.id)})
	} catch (err){
		next(err)
	}
}

async function createLocationRoute (req, res, next) {
	try {
		return res.status(200).send(await locationsService.create(req.body))
	}catch (err){
		next(err)
	}
}

async function updateOneLocationRoute (req, res, next) {
	try{
		return res.status(200).send({locations : await locationsService.update(req.params.id, req.body)})
	} catch (err){
		next(err)
	}
}

async function deleteOneLocationRoute(req, res, next) {
	try{
		return res.status(200).send({locations : await locationsService.deleteLoc(req.params.id)})
	} catch (err){
		next(err)
	}
}