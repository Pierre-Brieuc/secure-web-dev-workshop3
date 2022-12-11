// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const passport = require('passport')
const userService = require('./users.service')
const User = require('./users.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

require('./strategies/local')(passport)


// Register
router.post('/users/register', (req, res, next) => {
	var res = User.findOne({"username":req.body.username}, async (err,doc) => {
		if (err){
			console.log(err)
		} else if (doc){
			console.log("This username is not available")
		} else if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);
			const toInsert = new User({
				"username":req.body.username,
				"password":hashedPassword
			})
			console.log("User created")
			await toInsert.save()
		}
	})
})

// Login
router.post('/users/login', (req, res, next) => {
	passport.authenticate('local',(err,user,info) => {
		if (err) console.log(err);//throw err
		if (!user.username) console.log("404 error")//res.send("404 error");
		if (!user.password) console.log("403 error")//res.send("403 error");
		else {
			req.logIn(user, err => {
				if(err) console.log(err);//throw err
				console.log("Successfully Authenticated")
				res.send("Successfully Authenticated");
				jwt.sign(user,)
			})
		}
	}) (req,res,next);
})


// Get self
router.get('/users/me', passport.authenticate('local',{session:false}), async (req, res) => {
	res.send(req.user)
	return res.status(200).send({user : await userService.getSelf(req.body.username)})
	//return res.status(200).send({users : await userService.getSelf(req.user.username)})
})

// update self
router.patch('/users/me', passport.authenticate('local',{session:false}), (req, res) => {
	return res.status(200).send(userService.updateUser(req.body.username, req.body))
	//return res.status(200).send(userService.updateUser(req.user, req.body))
})

// Delete self
router.delete('/users/me', passport.authenticate('local',{session:false}), (req, res) => {
	return res.status(200).send(userService.deleteUser(req.body.username))
	//return res.status(200).send(userService.deleteUser(req.user.username))
})


// Get all
router.get('/users', async (req, res) => {
	return res.status(200).send({users : await userService.getAllUsers()})
})

module.exports = router


// Patch : Remplace un bout de la donnée
// Put : Remplace toute la donnée