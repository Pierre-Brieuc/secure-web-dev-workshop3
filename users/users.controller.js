// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')
const userService = require('./users.service')

const secret_key = process.env.SECRET_KEY

require('./strategies/local')(passport)

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()


// Register
router.post('/users/register', async (req, res, next) => registerFunctionRoute(req, res, next))

// Login
router.post('/users/login', async (req, res, next) => loginFunctionRoute(req, res, next))

// Get self
router.get('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => getSelfRoute(req, res, next))

// update self
router.put('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => updateSelfRoute(req, res, next))

// Delete self
router.delete('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user','admin']), async (req, res, next) => deleteSelfRoute(req, res, next))

// Get all
router.get('/users', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async (req, res, next) => getAllUsersRoute(req, res, next))

module.exports = router



//------------------------------------ Functions for routes --------------------------------------------------//

async function registerFunctionRoute (req, res, next) {
	try {
		return res.status(200).send({message : await userService.register(req,res,next)})
    } catch (error) {
		next(error);
    }
}

async function loginFunctionRoute (req, res, next){
    try {
		return res.status(200).send({token : await userService.login(req,res,next)})
    } catch (error) {
		next(error)
    }
}

async function getSelfRoute (req, res, next) {
	try {
		return res.status(200).send({user : await userService.getSelf(req.user._id)})
	} catch (err){
		next(err)
	}
}

async function updateSelfRoute (req, res, next) {
	try {
		return res.status(200).send({user : await userService.updateUser(req.user._id, req.body)})
	} catch (err){
		next(err)
	}
}

async function deleteSelfRoute(req, res, next) {
	try {
		return res.status(200).send(userService.deleteUser(req.user._id))
	} catch (err){
		next(err)
	}
}

async function getAllUsersRoute(req, res, next) {
	try{
		return res.status(200).send({users : await userService.getAllUsers()})
	} catch (err){
		next(err)
	}
}