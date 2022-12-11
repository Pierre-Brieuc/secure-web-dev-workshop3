// This file holds the Business-Logic layer, interacting with Data Layer

const User = require('./users.model');
const bcrypt = require("bcrypt");
const passport = require('passport');


// Get self
async function getSelf (username) {
	return User.find({"username":username})
}
module.exports.getSelf = getSelf

// Update self
async function updateUser (chosenUsername, modification) {
	try {
		return User.findOneAndUpdate({"username":chosenUsername},modification);
	} catch (err) {
		console.log("No user")
	}
}
module.exports.updateUser = updateUser

// Delete
async function deleteUser (chosenUsername) {
	try {
		return User.findOneAndDelete({"username":chosenUsername});
	} catch (err){
		console.log("The user does not exist")
		//throw "The user does not exist"
	}
}
module.exports.deleteUser = deleteUser

// Get all users
async function getAllUsers () {
	return User.find();
}
module.exports.getAllUsers = getAllUsers

function verifyPassword(password) {
	temp = /^[a-z0-9]+$/i
	if(password.length < 8 && temp.test(password)){
		return true
	}
	return false
}