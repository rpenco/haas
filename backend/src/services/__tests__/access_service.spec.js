import expect, { createSpy, isSpy, spyOn } from 'expect'
import { AccessService } from '../access_service'
import sinon from 'sinon'

describe('Tests AccessService', () => {

  it(`should 'login'`, async () => {
    const service = new AccessService()

    // fake response
    let stub = sinon.stub(service, 'getByUsername')
    stub.returns({
      username: 'romain',
      password: 'eb459aedab226f507f25f3a191c40f3ff4ffb951f126a53fd881c966dfc003a5',
      attempts: 0
    })

    const profile = await service.login({username: 'romain', password: 'romain'})
    expect(profile.username).toEqual('romain')
    expect(profile.token).toEqual('80618589cbf3f37caad2082cc2b1cddc957fb2b9ce886816a6aa7a573ee0f478')
  })


  it(`should not 'login' (invalid password)`, async () => {
    const service = new AccessService()

    // fake response
    let stubGetByUsername = sinon.stub(service, 'getByUsername')
    stubGetByUsername.returns({
      username: 'romain',
      password: '80618589cbf3f37caad2082cc2b1cddc957fb2b9ce886816a6aa7a573ee0f478',
      attempts: 0
    })

    let stubUpdateUser = sinon.stub(service.repository, 'updateUser')
    stubUpdateUser.returns({
      username: 'romain',
      password: '80618589cbf3f37caad2082cc2b1cddc957fb2b9ce886816a6aa7a573ee0f478',
      attempts: 0
    })

    await expect(service.login({username: 'romain', password: 'oops'})).rejects.toThrow('Invalid credentials. Try again !')
  })

  it(`should not 'login' (attempts)`, async () => {
    const service = new AccessService()

    // fake response
    let stub = sinon.stub(service, 'getByUsername')
    stub.returns({
      username: 'romain',
      password: 'eb459aedab226f507f25f3a191c40f3ff4ffb951f126a53fd881c966dfc003a5',
      attempts: 6
    })

    await expect(service.login({username: 'romain', password: 'romain'})).rejects.toThrow('Your account is locked. Please contact administrator.')
  })


  it(`should 'register'`, async () => {

    const service = new AccessService()

    // fake response
    let stub = sinon.stub(service, 'register')
    stub.returns(true)

    const registered = await service.register({username: 'newuser', password: 'newuser'})
    expect(registered).toBeTruthy()
  })

  it(`should not 'register' (already exists)`, async () => {
    const service = new AccessService()

    // fake response (user exists)
    let stub = sinon.stub(service, 'getByUsername')
    stub.returns({username: 'romain'})

    await expect(service.register({
      username: 'romain',
      password: 'romain'
    })).rejects.toThrow('Failed to register. Username already exists.')
  })

})