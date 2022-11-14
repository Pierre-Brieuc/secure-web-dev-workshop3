// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return [1,2,3,4]
}
module.exports.findAll = findAll

function create () {

}

async function update (id, modification) {
	await Location.updateOne(id,modification);
}

function getAll () {

}

function getOne (id) {
	return Location.findById(id)
}

async function deleteLoc () {
	await Location.deleteOne({sourceLocationId:id});
}