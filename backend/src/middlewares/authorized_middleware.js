import { ExceptionAPIError } from '../routes/pojo/ExceptionError'
import { HashService } from '../services/hash_service'

/**
 * @description simple middleware who checks if token is corrects
 * @param req
 * @param res
 * @param next
 */
export async function Authorized (req, res, next) {

  const token = req.header('Authorization')
  if (!token || token.length < 0) {
    console.warn(`Invalid session.`)
    return res.send(new ExceptionAPIError({status: 401, message: 'Invalid session. Please login before.'}))
  }

  try {
    await HashService.validateToken(token)
    console.log(`user is logged.`)
    return next()
  } catch (e) {
    return res.send(new ExceptionAPIError({status: 401, message: 'Invalid session. Please login before.'}))
  }
}
