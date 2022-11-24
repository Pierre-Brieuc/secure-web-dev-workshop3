// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')


async function create (newobj) {
	const toInsert = new Location(newobj)
	return toInsert.save()
}
module.exports.create = create

async function update (id, modification) {
	await Location.updateOne(id,modification);
}
module.exports.update = update

async function getAll () {
	await Location.find({});
}
module.exports.getAll = getAll

async function getOne (id) {
	await Location.findById(id)
}
module.exports.getOne = getOne

async function deleteLoc () {
	await Location.deleteOne({sourceLocationId:id});
}
module.exports.deleteLoc = deleteLoc