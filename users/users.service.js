// This file holds the Business-Logic layer, interacting with Data Layer

const User = require('./users.model')
const bcrypt = require("bcrypt");


// Register
async function register (newobj) {
	if (usernameIsUnique) {
		bcrypt.hash(newobj.password, 5, function (err, hash) {
			console.log(hash);
			// TODO: Store the hash in your password DB
		  });
		const toInsert = new User(newobj)
		return toInsert.save()
	} else {
		return null;
	}
}
module.exports.register = register

// Login
async function login (objToCheck) {
	// Check obj with bdd
}
module.exports.login = login

// Get self
async function getSelf (id) {
	return User.findById(id)
}
module.exports.getSelf = getSelf

// Update self
async function updateUser (id, modification) {
	return User.updateOne(id,modification);
}
module.exports.update = update

// Delete
async function deleteUser (id) {
	return User.deleteOne({sourceLocationId:id});
}
module.exports.deleteLoc = deleteUser

// Get all users
async function getAllUsers () {
	return User.find(); 
}
module.exports.getAllUsers = getAllUsers

async function usernameIsUnique (username) {
	var isUnique = true;
	getAllUsers.forEach(element => {
		if (element == username){
			isUnique = false;
		}
	});
	return isUnique;
}