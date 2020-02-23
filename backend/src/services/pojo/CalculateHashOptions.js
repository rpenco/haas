/**
 * @description calculate hash options class.
 * Defines options used to calculate hash.
 */
export class CalculateHashOptions {
  /**
   *
   * @param data the data that need to be hashed
   * @param algorithm can be md5, sha1, sha256
   * @param iterations the number of iteration of the hash
   */
  constructor ({data, algorithm, iterations}) {
    this.data = data
    this.algorithm = algorithm
    this.iterations = parseInt(iterations)
  }

  toString () {
    return `(CalculateHashOptions data=${this.data},algorithm=${this.algorithm},iterations=${this.iterations})`
  }
}