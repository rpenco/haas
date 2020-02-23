import express from 'express'
import { HashService } from '../services/hash_service'
import { CalculateHashOptions } from '../services/pojo/CalculateHashOptions'
import { ExceptionAPIError } from './pojo/ExceptionError'
import { Authorized } from '../middlewares/authorized_middleware'

const router = express.Router()

/**
 * @description Calculate Hash.
 * Hash data with a specific algorithm, an number of iterations.
 */
router.post('/api/calculateHash', Authorized, async (req, res) => {

  // TODO middleware with Joi to validate request body
  const {data, algorithm, iterations} = req.body

  const options = new CalculateHashOptions({data, algorithm, iterations})

  let service = new HashService()
  try {
    let hash = await service.calculateHash(options)
    console.info(`calculateHash: Successful calculate hash: ${options}`)
    res.send(hash)
  } catch (e) {
    console.error(`calculateHash: Invalid options: ${options}`)
    res.status(400).send(new ExceptionAPIError({status: 400, message: e.message}))
  }
})

export { router as calculateHash }
