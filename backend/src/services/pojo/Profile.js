/**
 * @description User profile.
 */
export class Profile {

  constructor ({username}) {
    this.username = username
    this.token = null
  }

  setToken (token) {
    // for simplification returns both
    // profile and token in same object
    this.token = token
  }

  toString () {
    return `(Profile username=${this.username})`
  }
}