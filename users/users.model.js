const mongoose = require('mongoose')

const user = new mongoose.Schema({
	idUser: Int16Array,
	username: String,
	password: String
})

const User = mongoose.model('Location', user)

module.exports = User