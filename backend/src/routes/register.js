import express from 'express'
import { HashService } from '../services/hash_service'
import { CalculateHashOptions } from '../services/pojo/CalculateHashOptions'
import { ExceptionAPIError } from './pojo/ExceptionError'
import { RegisterForm } from '../services/pojo/RegisterForm'
import { AccessService } from '../services/access_service'

const router = express.Router()

/**
 * @description Register a new user.
 */
router.post('/api/register', async (req, res) => {

  // TODO middleware with Joi to validate request body
  const {username, password} = req.body

  // TODO In a configuration service, of course ...
  const passwordLength = 6

  // TODO Joi can easily validate that..
  if (!password || typeof password !== 'string' || password.length < passwordLength) {
    return res.status(400).send(new ExceptionAPIError({
      status: 400,
      message: `Failed to register. Password must be greater than ${passwordLength} characters.`
    }))
  }

  // TODO Joi can easily validate that..
  if (!username || typeof username !== 'string' || password.length <= 1) {
    return res.status(400).send(new ExceptionAPIError({
      status: 400,
      message: `Failed to register. Username must be greater than 1 character.`
    }))
  }

  const options = new RegisterForm({username, password})

  let service = new AccessService()
  try {
    let registred = await service.register(options)
    console.info(`register: Successful register new user: ${options.username}`)
    res.status(201).send()
  } catch (e) {
    console.error(`register: Failed to register new user options: ${options}`)
    res.status(500).send(new ExceptionAPIError({status: 400, message: e.message}))
  }
})

export { router as register }
