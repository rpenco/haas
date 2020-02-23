import express from 'express'
import { generateDummyHash } from './generate_dummy_hash'
import { calculateHash } from './calculate_hash'
import { register } from './register'
import { login } from './login'

let router = express.Router()

router.use(generateDummyHash)
router.use(calculateHash)
router.use(register)
router.use(login)

export { router as apiRoutes }