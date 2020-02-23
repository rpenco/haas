/**
 * @description More pretty error response
 */
export class ExceptionAPIError {

  /**
   * @description Create an error response
   * @param status HTTP Status code
   * @param message Human readable message
   */
  constructor ({status, message}) {
    this.status = status
    this.message = message
  }
}