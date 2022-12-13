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
async function updateUser (id, modification) {
	try {
		await User.findByIdAndUpdate(id,modification);
		return {"message":"done"}
	} catch (err) {
		return {"message":"The user does not exist"}
	}
}
module.exports.updateUser = updateUser

// Delete
async function deleteUser (id) {
	try {
		await User.findByIdAndDelete(id);
		return {"message":"done"}
	} catch (err){
		return {"message":"The user does not exist"}
	}
}
module.exports.deleteUser = deleteUser

// Get all users
async function getAllUsers () {
	return User.find({});
}
module.exports.getAllUsers = getAllUsers