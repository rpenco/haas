import expect from 'expect'
import { HashService } from '../hash_service'
import { CalculateHashOptions } from '../pojo/CalculateHashOptions'

describe('Tests HashService', () => {

  it(`should 'generateDummyHash'`, async () => {
    const service = new HashService()
    const hash = await service.generateDummyHash()
    expect(hash.hash).toEqual('00000000000000000000000000000000')
  })

  it(`should 'calculateHash' (md5)`, async () => {
    const service = new HashService()
    const options = new CalculateHashOptions({iterations: 1, data: 'haas is awesome', algorithm: 'md5'})
    const hash = await service.calculateHash(options)
    expect(hash.hash).toEqual('efa2e29e0163e3c120cb295902602395')
  })

  it(`should 'calculateHash' (sha1)`, async () => {
    const service = new HashService()
    const options = new CalculateHashOptions({iterations: 1, data: 'haas is awesome', algorithm: 'sha1'})
    const hash = await service.calculateHash(options)
    expect(hash.hash).toEqual('2bd0a8788ab56d93f6457c356c6adec55cf6e114')
  })

  it(`should 'calculateHash' (sha256)`, async () => {
    const service = new HashService()
    const options = new CalculateHashOptions({iterations: 1, data: 'haas is awesome', algorithm: 'sha256'})
    const hash = await service.calculateHash(options)
    expect(hash.hash).toEqual('e6c37f2e443eeedcec58da44584fbd6e77849b08fbf80d708285de4c1b93b49e')
  })

  it(`should not 'calculateHash' (invalid algorithm)`, async () => {
    const service = new HashService()
    const options = new CalculateHashOptions({iterations: 1, data: 'haas is awesome', algorithm: 'oops'})
    try {
      const hash = await service.calculateHash(options)
      throw Error('should throw an error')
    } catch (e) {
      expect(e.message).toEqual('Invalid algorithm. Accepts only \'md5\', \'sha1\' or \'sha256\'')
    }
  })

  it(`should 'haas is awesome' (md5)`, async () => {
    const service = new HashService()
    const hash = await service.hashMd5('haas is awesome')
    expect(hash).toEqual('efa2e29e0163e3c120cb295902602395')
  })

  it(`should 'haas is awesome' (sha1)`, async () => {
    const service = new HashService()
    const hash = await service.hashSha1('haas is awesome')
    expect(hash).toEqual('2bd0a8788ab56d93f6457c356c6adec55cf6e114')
  })

  it(`should 'haas is awesome' (sha256)`, async () => {
    const service = new HashService()
    const hash = await service.hashSha256('haas is awesome')
    expect(hash).toEqual('e6c37f2e443eeedcec58da44584fbd6e77849b08fbf80d708285de4c1b93b49e')
  })

  it(`should 'generateSessionToken'`, async () => {
    const token = await HashService.generateSessionToken('haas is awesome')
    expect(token).toEqual('e6c37f2e443eeedcec58da44584fbd6e77849b08fbf80d708285de4c1b93b49e')
  })

  xit(`should 'validateSessionToken'`, async () => {
    const valid = await HashService.validateToken('token')
    expect(valid).toBeTruthy()
  })
})