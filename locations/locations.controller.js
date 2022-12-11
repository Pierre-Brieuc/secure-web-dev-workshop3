// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

//router.use(checkUser)
function checkUser (user){
	//Vérifier que le jeton jwt est le même
}

router.get('/locations', async (req, res) => {
	return res.status(200).send({locations : await locationsService.getAll()})
})

router.get('/locations/:id', async (req, res) => {
	return res.status(200).send(await locationsService.getOne(req.params.id))
})

router.post('/locations', async (req, res) => {
	console.log(req.body)
	return res.status(200).send( await locationsService.create(req.body))
})

router.patch('/locations/:id', async (req, res) => {
	return res.status(200).send(await locationsService.update(req.params.id, req.body))
})

router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send(await locationsService.deleteLoc(req.params.id))
})

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

module.exports = router
