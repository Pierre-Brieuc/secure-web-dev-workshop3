// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')


async function create (newobj) {
	const toInsert = new Location(newobj)
	await toInsert.save()
	return {"message":"location created"}
}
module.exports.create = create

async function update(id,obj) {
	await Location.findByIdAndUpdate(id,obj);
	return {"message":"done"}
}
module.exports.update = update

async function getAll () {
	return Location.find();
}
module.exports.getAll = getAll

async function getOne (id) {
	return Location.findById(id)
}
module.exports.getOne = getOne

async function deleteLoc (id) {
	await Location.findByIdAndDelete(id);
	return {"message":"done"}
}
module.exports.deleteLoc = deleteLoc


//req.params = c'est le id dans : /locations/:id
//req.body = create, update