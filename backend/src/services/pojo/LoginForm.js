/**
 * @description Login form.
 */
export class LoginForm {
  constructor ({username, password}) {
    this.username = username
    this.password = password
  }

  toString () {
    return `(Login username=${this.username})`
  }
}