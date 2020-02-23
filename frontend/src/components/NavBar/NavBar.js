import React, { Component } from 'react'
import './style.css'
import { APIService } from '../../services/APIService'

/**
 * @description Navigation Bar.
 * Display logo and user bar
 */
export class NavBar extends Component {

  constructor (props) {
    super(props)
    this.service = new APIService()
  }

  /**
   * @description On click on 'disconnect' button
   */
  handleDisconnect () {
    this.service.logout()
    window.location = '/'
  }

  renderProfile () {
    const profile = this.service.getProfile()

    if (profile) {
      return <div className="profile">
        <div className="button">{profile.username}</div>
        <div className="button disconnect" onClick={this.handleDisconnect.bind(this)}>Disconnect</div>
      </div>
    }
    return ''
  }

  render () {
    return <nav className="navbar">
      <div className="logo"></div>
      {this.renderProfile()}
    </nav>
  }
}