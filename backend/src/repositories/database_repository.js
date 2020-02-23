/**
 * Database Repository
 */
export class DatabaseRepository {

  constructor () {
    this.MongoClient = require('mongodb').MongoClient

    // TODO In a configuration service, of course ...
    this.url = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017'

    // TODO In a configuration service, of course ...
    this.dbName = process.env.MONGODB_DB || 'chat256'

  }

  /**
   * Insert data in database
   * @param data
   * @returns {Promise<*>}
   */
  async insert (data) {

    // change of pattern, use of promise instead of callback.
    // I can also use one of the many modules that makes it ...
    return new Promise((resolve, reject) => {
      this.MongoClient.connect(this.url, (err, client) => {
        if (!client) return reject()
        client.db(this.dbName).collection('users').insert(data, (err, result) => {
          client.close()
          return err ? reject(err) : resolve(true)
        })
      })
    })
  }

  /**
   * @summary Get user by is name
   * @param username
   * @returns {Promise<*>}
   */
  async getByUsername (username) {
    return new Promise((resolve, reject) => {
      this.MongoClient.connect(this.url, (err, client) => {
        if (!client) return reject()
        client.db(this.dbName).collection('users').findOne({username}, (err, result) => {
          client.close()
          return err ? reject(err) : resolve(result)
        })
      })
    })
  }

  /**
   * @summary Update user
   * @param data
   * @returns {Promise<*>}
   */
  async updateUser (data) {
    const {username, password, attempts} = data
    return new Promise((resolve, reject) => {
      this.MongoClient.connect(this.url, (err, client) => {
        if (!client) return reject()
        client.db(this.dbName).collection('users').updateOne({username}, {
          $set: {
            username,
            password,
            attempts
          }
        }, (err, result) => {
          client.close()
          return err ? reject(err) : resolve(result)
        })
      })
    })
  }
}