import { Hash } from './pojo/dummy_hash'
import * as CryptoJS from 'crypto-js'
import MD5 from 'crypto-js/md5'
import SHA1 from 'crypto-js/sha1'
import SHA256 from 'crypto-js/sha256'
import { Profile } from './pojo/Profile'
import { DatabaseRepository } from '../repositories/database_repository'
import { HashService } from './hash_service'

/**
 * Access Service.
 * Register and login users.
 */
export class AccessService {

  constructor () {
    this.repository = new DatabaseRepository()
    this.hashService = new HashService()

    // TODO in configuration service obliviously...
    this.allowedAttempts = 5
  }

  /**
   * @description Register an user
   * Check if user already not exists and create user.
   * @param options {username, password} username and password
   * @returns {Promise<*>} boolean true if created
   */
  async register (options) {
    const {username, password} = options

    const user = await this.getByUsername(username)

    if (user) {
      throw Error(`Failed to register. Username already exists.`)
    }

    return this.repository.insert({username, password: await this.hashService.hashSha256(password), attempts: 0})
  }

  /**
   * @description Login an user.
   * Check if user already exists and if his credentials are rights.
   * Returns user profile with "secure session token"
   * @param options {username, password} username and password
   * @returns {Promise<Profile>}
   */
  async login (options) {
    const {username, password} = options

    const user = await this.getByUsername(username)

    if (!user) {
      throw Error('Oops, account not exists!')
    }

    if (user.attempts >= this.allowedAttempts) {
      throw Error('Your account is locked. Please contact administrator.')
    }

    const hashedPassword = await this.hashService.hashSha256(password)

    if (hashedPassword === user.password) {
      const profile = new Profile({username})

      // because is more simple in this POC, returns profile and user session token
      // in same response
      profile.token = await HashService.generateSessionToken(profile.toString())

      return profile

    } else {
      // update attempts counter to lock account after N attents..
      user.attempts += 1
      await this.repository.updateUser(user)
      throw Error('Invalid credentials. Try again !')
    }
  }

  async getByUsername (username) {
    return this.repository.getByUsername(username)
  }
}