const usersService = require('./users.service')
const usersModel = require('./users.model')
const {NotFoundError} = require('../custom-errors/NotFoundError.error')

jest.mock('./users.model')


test('Should get all users', async () => {
    usersModel.find.mockResolvedValue([])
    const findSpy = jest.spyOn(usersModel, 'find')
    expect(await usersService.getAllUsers()).toEqual([])
    expect(findSpy).toHaveBeenCalledTimes(1)
})

describe('User getSelf', () => {
    it('Should find a user', async () => {
        const mockUser = {_id:'6399a671c165061c0ca95643'}
        usersModel.findById.mockResolvedValue(mockUser)
        expect(usersModel.findById).toHaveBeenCalledTimes(1)
        expect(await usersService.getSelf('634c01f1d73e82764d81cb62')).toEqual(mockUser)
    })
    it('Should throw NotFoundError', async () => {
        const mockUser = null
        usersModel.findById.mockResolvedValue(mockUser)
        expect(async () => await usersService.getSelf('634c01f1d73e82764d81cb62')).rejects.toThrowError(NotFoundError)
        expect(usersModel.findById).toHaveBeenCalledTimes(1)
    })
})
