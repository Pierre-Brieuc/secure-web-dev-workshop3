const locationsService = require('./location.service')
const locationsModel = require('./locations.model')

jest.mock('./locations.model')

test('Should create a location', async () => {
    locationsModel.find.mockResolvedValue([])
    const findSpy = jest.spyOn(locationsModel, 'find')
    expect(await locationsService.getAll())
})