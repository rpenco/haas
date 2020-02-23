import React, { Component } from 'react'
import { NavBar } from '../NavBar/NavBar'
import './style.css'
import { APIService } from '../../services/APIService'

/**
 * Sign in component
 */
export class SignIn extends Component {

  state = {
    username: null,
    password: null,
    errors: null,
    created: false,
  }

  service = new APIService()

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
   * @description Call API when click on "Login" button
   * @param e event
   */
  signIn (e) {
    const {username, password} = this.state

    // Stop propagation (stop form reload page)
    e.preventDefault()

    if (username && password) {

      //TODO these checks must be done with a service
      if (password.length < 6) {
        this.setState({errors: 'Password at least 6 characters.'})
        return
      }

      // reset errors message
      this.setState({errors: null})
      this.service.signIn({username, password})
        .then((profile) => {
          window.location = '/hash'
        })
        .catch(e => this.setState({errors: e.response.data.message}))
    } else {
      this.setState({errors: 'Please fill username and password'})
    }

  }

  /**
   * @description Render default form with 2 inputs 'username' and 'password'
   * @returns {*}
   */
  render () {
    const {errors} = this.state

    return <div className="signin-page">
      <NavBar></NavBar>
      <div className="center-screen">
        <h1>Sign In</h1>
        <h2>Welcome back.</h2>
        <form onSubmit={this.signIn.bind(this)}>

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

          <button onClick={this.signIn.bind(this)} className="btn primary">Login</button>

          <p className="get-started">Don't have an account? <a href="/register">Get started</a></p>
        </form>
      </div>
    </div>
  }
}