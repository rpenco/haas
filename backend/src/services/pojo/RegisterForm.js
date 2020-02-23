/**
 * @description Register form.
 */
export class RegisterForm {
  constructor ({username, password}) {
    this.username = username
    this.password = password
  }

  toString () {
    return `(RegisterForm username=${this.username})`
  }
}