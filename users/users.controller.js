// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const userService = require('./users.service')

// Register
router.post('/users/register', (req, res) => {
	return res.status(200).send(userService.register(req.body))
})

// Login
router.post('/users/login', async (req, res) => {
	return res.status(200).send(await userService.login(req.body))
})

// Get self
router.get('/users/me', async (req, res) => {
	console.log(req.body)
	return res.status(200).send( await userService.getSelf(req.body))
})

// update self
router.patch('/users/me', (req, res) => {
	return res.status(200).send(userService.updateUser(req.params.me))
})

// Delete self
router.delete('/users/me', (req, res) => {
	return res.status(200).send(userService.deleteUser(req.params.me))
})

// Get all
router.get('/users', (req, res) => {
	return res.status(200).getAllUsers()
})

module.exports = router


// Patch : Remplace un bout de la donnée
// Put : Remplace toute la donnée