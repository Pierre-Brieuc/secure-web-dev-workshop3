require("dotenv").config();

const mongoose = require("mongoose");
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')

const app = express()
const port = 3000

app.use(bodyParser.json())  
app.use(locationController)
app.use(userController)
app.use(cors({
	origin:"http://localhost:3000",
	credentials: true
}))
app.use(session({
	secret:"secretcode",
	resave:true,
	saveUninitialized: true
}))
app.use(cookieParser("secretcode"))
app.use(passport.initialize())
app.use(passport.session())
app.use((err,req,res,next) => {
	console.log(err.stack)
	switch (err.name){
		case "NotFoundError":
			return res.status(404).send(err.message)
		default:
			return res.status(500).send('Something broke!')
	}
})

app.get('/', (req, res) => {res.setEncoding(req)});

async function main () {
	await mongoose.connect(process.env.MONGO_URI)
	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
}
main()