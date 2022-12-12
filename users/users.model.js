const mongoose = require('mongoose')

const user = new mongoose.Schema({
	username: String,
	password: String,
	role:String
})

const User = mongoose.model('user', user)

module.exports = User