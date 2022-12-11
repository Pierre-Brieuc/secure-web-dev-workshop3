const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const bcrypt = require("bcrypt")
const User = require('../users.model')

module.exports = function(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			User.findOne({ "username": username }, function (err, user) {
				if (err) console.log(err); //throw err
				if (!user) return done(null, false);
				bcrypt.compare(password,user.password, (err, result) => {
					if (err) console.log(err); //throw err
					if (result === true) return done(null,user);
					else return done(null,false);
				})
		  	})
		})
	);
}