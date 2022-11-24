require("dotenv").config();
const mongoose = require("mongoose");

const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())  

app.use(locationController)

async function main () {
	await mongoose.connect(process.env.MONGO_URI)
	app.listen(port, () => {
		console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
	})
}

main()