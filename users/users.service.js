// This file holds the Business-Logic layer, interacting with Data Layer

const passport = require('passport');
const User = require('./users.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const {NotFoundError} = require('../custom-errors/NotFoundError.error')

//login
async function login (req,res,next){
	const { username, password } = req.body;

	//Check emptyness of the incoming data
	if (!username || !password) {
		throw new NotFoundError("Please enter all the details");
	}
	
	//Check if the user already exist or not
	const userExist = await User.findOne({"username":req.body.username});
	if(!userExist) throw new NotFoundError("User does not exist");

	//Check password match
	const isPasswordMatched = await bcrypt.compare(password,userExist.password);
	if(!isPasswordMatched) throw new NotFoundError("The password is not good");

	const token = await jwt.sign({ sub: userExist._id }, process.env.SECRET_KEY/*, {expiresIn: process.env.JWT_EXPIRE}*/);
	return res.status(200).send({"token":token})

	/* -----------------------------------------  local strategy  -----------------------------------------------------------
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
}
module.exports.login = login

//register
async function register (req,res,next){
	const { username, password } = req.body;
	//Check emptyness of the incoming data
	if (!username || !password) {
		throw new NotFoundError('Please enter all the details')
	}

	//Check if the user already exist or not
	const userExist = await User.findOne({ username: req.body.username });
	if (userExist) {
		throw new NotFoundError('User already exist with the given username')
	}

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);
	const role = "user"
	const user = new User({"username":req.body.username,"password":hashPassword, "role":role});
	await user.save();
	const token = await jwt.sign({ id: user._id }, process.env.SECRET_KEY/*, {expiresIn: process.env.JWT_EXPIRE}*/);
	return res.cookie({ 'token': token }).json({ success: true, message: 'User registered successfully', data: user })

	/* -----------------------------------------  local strategy  -----------------------------------------------------------
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
}
module.exports.register = register


// Get self
async function getSelf (id) {
	const user = await User.findById(id)
	if (!user) {
		throw new NotFoundError('User not found')
	}
	return user
}
module.exports.getSelf = getSelf

// Update self
async function updateUser (id, modification) {
	const user = await getSelf(id)
	await User.findByIdAndUpdate(id,modification);
	return await getSelf(id)
}
module.exports.updateUser = updateUser

// Delete
async function deleteUser (id) {
	const user = await getSelf(id)
	await User.findByIdAndDelete(id);
	return {"message":"User deleted"}
}
module.exports.deleteUser = deleteUser

// Get all users
async function getAllUsers () {
	const users = await User.find()
	if (!users) {
		throw new NotFoundError('Users not found')
	}
	return users
}
module.exports.getAllUsers = getAllUsers