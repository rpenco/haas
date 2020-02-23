import React, { Component } from 'react'
import { NavBar } from '../NavBar/NavBar'
import './style.css'
import { APIService } from '../../services/APIService'

/**
 * Register
 */
export class Register extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      errors: null,
      created: false,
    }

    this.service = new APIService()
  }

  /**
   * @description On username input change
   * @param e event
   */
  handleChangeUsername (e) {
    this.setState({username: e.target.value})
  }

  /**
   * @description On password input change
   * @param e event
   */
  handleChangePassword (e) {
    this.setState({password: e.target.value})
  }

  /**
   * @description Call API when click on "Register" button
   * @param e event
   */
  register (e) {
    const {username, password} = this.state
    e.preventDefault()

    console.log('user', username, 'pass', password, 'bool', username && password)

    if (username && password) {

      //TODO these checks must be done with a service
      if (password.length < 6) {
        this.setState({errors: 'Password at least 6 characters.'})
        return
      }

      this.setState({errors: null})

      this.service.register({username, password})
        .then(() => this.setState({created: true}))
        .then(() => this.setState({errors: e.response.data.message}))

    } else {
      this.setState({errors: 'Please fill username and password'})
    }

  }

  renderForm () {
    const {errors} = this.state
    return <form onSubmit={this.register.bind(this)}>

      {errors && errors !== null ? <p className="errors">{errors}</p> : ''}
      <div className="form-control">
        <label className="label">Username <span className="required">*</span></label>
        <input type="text" className="type" placeholder="Jane Doe"
               onChange={this.handleChangeUsername.bind(this)}/>
      </div>

      <div className="form-control">
        <label className="label">Password<span className="required">*</span></label>
        <input type="password" className="type" placeholder="Password (at least 6 chars)"
               onChange={this.handleChangePassword.bind(this)}/>
      </div>

      <button onClick={this.register.bind(this)} className="btn primary">Create an account</button>

      <p className="get-started">Already have an account? <a href="/">Sign in</a></p>
    </form>
  }

  renderCreated () {
    return <div>
      <h3>Account created!</h3>
      <p className="get-started"><a href="/">Sign in!</a></p>
    </div>
  }

  render () {
    const {created} = this.state

    return <div className="signin-page">
      <NavBar></NavBar>
      <div className="center-screen">
        <h1>Create an account</h1>
        <h2>Use the form below to create an account.</h2>
        {created ? this.renderCreated() : this.renderForm()}
      </div>
    </div>
  }
}