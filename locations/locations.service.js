// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')
const {NotFoundError} = require('../custom-errors/NotFoundError.error')


async function create (newobj) {
	try{
		const toInsert = new Location(newobj)
		await toInsert.save()
		return {"message":"location created"}
	} catch (err){
		return {"message":err}
	}
}
module.exports.create = create

async function update(id,modification) {
	const loc = await getOne(id)
	await Location.findByIdAndUpdate(id,modification);
	return await getAll()
}
module.exports.update = update

async function getAll () {
	const locations = await Location.find()
	if (!locations) {
		throw new NotFoundError('Locations not found')
	}
	return locations
}
module.exports.getAll = getAll

async function getOne (id) {
	const loc = await Location.findById(id)
	if (!loc) {
		throw new NotFoundError('Location not found')
	}
	return loc
}
module.exports.getOne = getOne

async function deleteLoc (id) {
	const loc = await getOne(id)
	await Location.findByIdAndDelete(id);
	return await getAll()
}
module.exports.deleteLoc = deleteLoc


//req.params = c'est le id dans : /locations/:id
//req.body = create, update