require('dotenv').config()

const JwtStrategy = require('passport-jwt').Strategy,ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const bcrypt = require("bcrypt")
const User = require('../users.model')
const secret_key = process.env.SECRET_KEY

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret_key;

module.exports = function(passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}