const locationsService = require('./locations.service')
const locationsModel = require('./locations.model')
const {NotFoundError} = require('../custom-errors/NotFoundError.error')

jest.mock('./locations.model')


test('Should get all locations', async () => {
    locationsModel.find.mockResolvedValue([])
    const findSpy = jest.spyOn(locationsModel, 'find')
    expect(await locationsService.getAll()).toEqual([])
    expect(findSpy).toHaveBeenCalledTimes(1)
})

describe('Location getOne', () => {
    it('Should find a location', async () => {
        const mockLocation = {_id:'634c01f1d73e82764d81cb62'}
        locationsModel.findById.mockResolvedValue(mockLocation)
        expect(locationsModel.findById).toHaveBeenCalledTimes(1)
        expect(await locationsService.getOne('634c01f1d73e82764d81cb62')).toEqual(mockLocation)
    })
    it('Should throw NotFoundError', async () => {
        const mockLocation = null
        locationsModel.findById.mockResolvedValue(mockLocation)
        expect(async () => await locationsService.getOne('634c01f1d73e82764d81cb62')).rejects.toThrowError(NotFoundError)
        expect(locationsModel.findById).toHaveBeenCalledTimes(1)
    })
})
