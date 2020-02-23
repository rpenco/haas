import expect, { createSpy, isSpy, spyOn } from 'expect'
import { Authorized } from '../authorized_middleware'
import sinon from 'sinon'

describe('Tests Authorized Middleware', () => {

  it(`should authorized`, async () => {

    // fake 'valid' header
    const req = {
      header: (header) => {
        expect(header).toEqual('Authorization')
        return 'user-token'
      }
    }

    // fake res callback
    const res = {
      send: () => {
        sinon.assert.fail('Authorized should not call res.send')
      }
    }

    await Authorized(req, res, () => {
      sinon.assert.pass('User is authorized')
    })
  })


  it(`should not authorized (no header)`, async () => {

    // fake 'valid' header
    const req = {
      header: (header) => {
        expect(header).toEqual('Authorization')
        return undefined
      }
    }

    // fake res callback
    const res = {
      send: () => {
        sinon.assert.pass('User is unauthorized')
      }
    }

    await Authorized(req, res, () => {
      sinon.assert.fail('Authorized should not call next()')
    })
  })

})