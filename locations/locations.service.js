// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')


async function create (newobj) {
	const toInsert = new Location(newobj)
	return toInsert.save()
}
module.exports.create = create

async function update(id,obj) {
	return Location.findOneAndUpdate(id,obj);
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
	return Location.deleteOne(id);
}
module.exports.deleteLoc = deleteLoc


//req.params = c'est le id dans : /locations/:id
//req.body = create, update