import axios from 'axios'

/**
 * Simple API Service
 */
export class APIService {

  /**
   * @description Get logged user profile
   * @returns {*}
   */
  getProfile () {
    try {
      return JSON.parse(atob(localStorage.getItem('profile')))
    } catch (e) {
      return null
    }
  }

  /**
   * @description Set logged user profile
   * @param profile
   * @returns {null}
   */
  setProfile (profile) {
    try {
      localStorage.setItem('profile', btoa(JSON.stringify(profile)))
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @description logout user (remove localstorage item)
   * @returns {null}
   */
  logout () {
    try {
      localStorage.removeItem('profile')
    } catch (e) {
      console.error(e)
      return null
    }
  }

  /**
   * @description Check if user is logged (has entry in localstorage)
   * @returns {boolean}
   */
  isLogged () {
    return !!this.getProfile()
  }

  /**
   * @description sign in user
   * @param username
   * @param password
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  async signIn ({username, password}) {
    return axios.post(`/api/login`, {username, password})
      .then(res => {
        this.setProfile(res.data)
        return res.data
      })
  }

  /**
   * @description register an user
   * @param username
   * @param password
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  async register ({username, password}) {
    return axios.post(`/api/register`, {username, password})
      .then(res => {
        if (res.status === 201) {
          return true
        }
        throw new Error(res)
      })
      .catch((e) => {
        throw new Error(e.response.data.message)
      })
  }

  /**
   * @description Executes an hash in the cloud !
   * @param data
   * @param algorithm
   * @param iterations
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  async hash ({data, algorithm, iterations}) {
    const {token} = this.getProfile()
    const options = {headers: {'Authorization': token}}
    return axios.post(`/api/calculateHash`, {data, algorithm, iterations}, options)
      .then(res => res.data.hash)
  }

}