import express from 'express'
import { HashService } from '../services/hash_service'
import { CalculateHashOptions } from '../services/pojo/CalculateHashOptions'
import { ExceptionAPIError } from './pojo/ExceptionError'
import { LoginForm } from '../services/pojo/LoginForm'
import { AccessService } from '../services/access_service'

const router = express.Router()

/**
 * @description Sign in registred user.
 */
router.post('/api/login', async (req, res) => {

  // TODO middleware with Joi to validate request body
  const {username, password} = req.body

  const options = new LoginForm({username, password})

  let service = new AccessService()
  try {
    let profile = await service.login(options)

    console.info(`login: Successful sign in user: ${options.username}`)
    res.send(profile)
  } catch (e) {
    console.error(`login: Failed to sign in user. Options: ${options}`)
    res.status(401).send(new ExceptionAPIError({status: 401, message: e.message}))
  }
})

export { router as login }
