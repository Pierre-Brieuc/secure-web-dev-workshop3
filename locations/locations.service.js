// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return [1,2,3,4]
}
module.exports.findAll = findAll

async function create (neobj) {
	const toInsert = new Location({"filmType": newobj.fields.type_tournage, 
								   "filmProducerName": newobj.fields.nom_producteur,
									"endDate": newobj.fields.endDate,
									"filmName": newobj.fields.filmName,
									"district": newobj.fields.district,
									"sourceLocationId": newobj.fields.sourceLocationId,
									"filmDirectorName": newobj.fields.filmDirectorName,
									"address": newobj.fields.address,                                    
									"startDate": newobj.fields.startDate,                                      
									"year": newobj.fields.year,
									"geolocation": newobj.fields.geo_shape})
	await toInsert.save()
}

async function update (id, modification) {
	await Location.updateOne(id,modification);
}

async function getAll () {
	await Location.find({});
}

async function getOne (id) {
	await Location.findById(id)
}

async function deleteLoc () {
	await Location.deleteOne({sourceLocationId:id});
}