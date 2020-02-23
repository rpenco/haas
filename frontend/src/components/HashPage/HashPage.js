import React, { Component } from 'react'
import { NavBar } from '../NavBar/NavBar'
import './style.css'
import { APIService } from '../../services/APIService'

/**
 * Hash Page
 */
export class HashPage extends Component {

  state = {
    data: null,
    algorithm: 'md5',
    iterations: 0,
    hash: null,
    errors: null,
  }

  service = new APIService()

  /**
   * @description On 'text to hash' input change
   * @param e event
   */
  handleChangeTextToHash (e) {
    this.setState({data: e.target.value})
  }

  /**
   * @description On 'method' select change
   * @param e event
   */
  handleChangeMethod (e) {
    this.setState({algorithm: e.target.value})
  }

  /**
   * @description On 'Number of iterations' input change
   * @param e event
   */
  handleChangeNumberOfIterations (e) {
    this.setState({iterations: e.target.value})
  }

  /**
   * @description Call API when click on "Login" button
   * @param e event
   */
  doHash (e) {
    const {data, algorithm, iterations} = this.state

    // remouve displayed result
    this.setState({hash: null})

    // Stop propagation (stop form reload page)
    e.preventDefault()

    if (data && iterations) {

      if (data.length < 1) {
        this.setState({errors: 'No text to hash.'})
        return
      }

      if (iterations < 1) {
        this.setState({errors: 'Iteration greather than 0.'})
        return
      }

      // reset errors message
      this.setState({errors: null})

      this.service.hash({data, algorithm, iterations})
        .then((hash) => this.setState({hash}))
        .catch(e => this.setState({errors: e.response.data.message}))

    } else {
      this.setState({errors: 'Please fill text to hash and number of iterations'})
    }
  }

  /**
   * @description Render default form with 2 inputs 'username' and 'password'
   * @returns {*}
   */
  render () {
    const {errors, hash} = this.state

    return <div className="hash-page">
      <NavBar></NavBar>
      <div className="center-screen">
        <h1>Hash As A Service</h1>
        <h2>Hash anything in a second! Let's play.</h2>

        <form onSubmit={this.doHash.bind(this)}>

          {errors && errors !== null ? <p className="errors">{errors}</p> : ''}
          <div className="form-control">
            <label className="label">Text to hash <span className="required">*</span></label>
            <input type="text" placeholder="I like barbecue"
                   onChange={this.handleChangeTextToHash.bind(this)}/>
          </div>

          <div className="form-control">
            <label className="label">Choose a method</label>
            <select onChange={this.handleChangeMethod.bind(this)}>
              <option value="md5">MD5</option>
              <option value="sha1">SHA1</option>
              <option value="sha256">SHA256</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">Number of iteration <span className="required">*</span></label>
            <input type="number" className="type" placeholder="1 435"
                   onChange={this.handleChangeNumberOfIterations.bind(this)}/>
          </div>

          <button onClick={this.doHash.bind(this)} className="btn primary">Confirm</button>

        </form>

        {hash && hash !== null ?
          <div className="hash-result">
            <h3>Result:</h3>
            <p>{hash}</p>
          </div> : ''}
      </div>
    </div>
  }
}