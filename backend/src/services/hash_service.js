import { Hash } from './pojo/dummy_hash'
import MD5 from 'crypto-js/md5'
import SHA1 from 'crypto-js/sha1'
import SHA256 from 'crypto-js/sha256'

/**
 * Hash Service.
 * Calculates hash based on different algorithm.
 * Full "fake" asynchronous hashes functions
 */
export class HashService {

  /**
   * the generated hash is always the same. . .
   * and the application does nothing else. . .
   */
  async generateDummyHash () {
    return new Hash('00000000000000000000000000000000')
  }

  /**
   * the generated hash based on hash, algorithm and iterations
   * @param options CalculateHashOptions
   * @returns {Promise<*>} Hashed data
   */
  async calculateHash (options) {
    const {data, iterations, algorithm} = options

    switch (algorithm) {
      case 'md5':
        return new Hash(await this.iterateHash({data, iterations, hashFn: this.hashMd5}))
      case 'sha1':
        return new Hash(await this.iterateHash({data, iterations, hashFn: this.hashSha1}))
      case 'sha256':
        return new Hash(await this.iterateHash({data, iterations, hashFn: this.hashSha256}))
      default:
        throw Error('Invalid algorithm. Accepts only \'md5\', \'sha1\' or \'sha256\'')
    }
  }

  /**
   * Generate MD5 hash
   * @param data the data that need to be hashed
   * @returns {Promise<*>}
   */
  async hashMd5 (data) {
    return MD5(data).toString()
  }

  /**
   * Generate SHA1 hash
   * @param data the data that need to be hashed
   * @returns {Promise<*>}
   */
  async hashSha256 (data) {
    return SHA256(data).toString()
  }

  /**
   * Generate SHA256 hash
   * @param data the data that need to be hashed
   * @returns {Promise<*>}
   */
  async hashSha1 (data) {
    return SHA1(data).toString()
  }

  /**
   * Iterate on hash function
   * @protected
   * @param data the data that need to be hashed
   * @param iterations the number of iteration of the hash
   * @param hashFn the hash function that need to be used
   * @returns {Promise<*>} Hashed data
   */
  async iterateHash ({data, iterations, hashFn}) {
    let hashed = data
    for (let i = 0; i < iterations; i++) {
      hashed = await hashFn(hashed)
    }
    return hashed
  }

  /**
   * @description Generate a 'unique' and (not) secure webtoken
   * @param data token content
   * @returns {Promise<*>}
   */
  static async generateSessionToken (data) {
    // TODO It's obviously better to use a mechanism like JWT, but I do not have time.. :)
    return (new HashService()).hashSha256(`${data}`)
  }

  /**
   * @description Validate a 'unique' and (not) secure webtoken
   * @param data token content
   * @returns {Promise<*>}
   */
  static async validateToken (token) {
    // Dummy test :)
    return !!token
  }
}