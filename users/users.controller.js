// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

require('dotenv').config()
const router = require('express').Router()
const passport = require('passport')
const userService = require('./users.service')
const User = require('./users.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_KEY

require('./strategies/local')(passport)

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()


// Register
router.post('/users/register', async (req, res, next) => {
	try {
        const { username, password } = req.body;
        //Check emptyness of the incoming data
        if (!username || !password) {
            return res.json({ message: 'Please enter all the details' })
        }

        //Check if the user already exist or not
        const userExist = await User.findOne({ username: req.body.username });
        if (userExist) {
            return res.json({ message: 'User already exist with the given username' })
        }
        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({"username":req.body.username,"password":hashPassword});
        await user.save();
        const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY/*, {expiresIn: process.env.JWT_EXPIRE}*/);
        return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })
    } catch (error) {
        return res.json({ error: error });
    }

	/* Register with Local strategy
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
	*/
})

// Login
router.post('/users/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //Check emptyness of the incoming data
        if (!username || !password) {
            return res.json({ message: 'Please enter all the details' })
        }
        //Check if the user already exist or not
        const userExist = await User.findOne({"username":req.body.username});
        if(!userExist) return res.status(404);

        //Check password match
        const isPasswordMatched = await bcrypt.compare(password,userExist.password);
        if(!isPasswordMatched) return res.status(403);

        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY/*, {expiresIn: process.env.JWT_EXPIRE}*/);
        return res.cookie({"token":token}).json({success:true,message:'LoggedIn Successfully'})
    } catch (error) {
        return res.json({ error: error });
    }


	/* local strategy
	passport.authenticate('local',(err,user,info) => {
		if (err) console.log(err);//throw err
		if (!user.username) res.status(404);
		if (!user.password) res.status(403);
		else {
			req.logIn(user, err => {
				if(err) console.log(err);//throw err
				console.log("Successfully Authenticated")
				res.send("Successfully Authenticated");
				//const accessToken = jwt.sign({"username":user.username, "password":user.password})
			})
		}
	}) (req,res,next);
	*/
})


// Get self
router.get('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), async (req, res) => {
	res.send(req.user)
	return res.status(200).send({user : await userService.getSelf(req.body.username)})
	//return res.status(200).send({users : await userService.getSelf(req.user.username)})
})

// update self
router.patch('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), (req, res) => {
	return res.status(200).send(userService.updateUser(req.body.username, req.body))
	//return res.status(200).send(userService.updateUser(req.user, req.body))
})

// Delete self
router.delete('/users/me', passport.authenticate('jwt',{session:false}), roleMiddleware(['user']), (req, res) => {
	return res.status(200).send(userService.deleteUser(req.body.username))
	//return res.status(200).send(userService.deleteUser(req.user.username))
})


// Get all
router.get('/users', passport.authenticate('jwt',{session:false}), roleMiddleware(['admin']), async (req, res) => {
	return res.status(200).send({users : await userService.getAllUsers()})
})

module.exports = router


// Patch : Remplace un bout de la donnée
// Put : Remplace toute la donnée