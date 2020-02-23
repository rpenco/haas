import express from 'express'
import { HashService } from '../services/hash_service'
import { Authorized } from '../middlewares/authorized_middleware'

const router = express.Router()

/**
 * @description Generate Dummy Hash
 */
router.get('/api/generateDummyHash', Authorized, async (req, res) => {
  let service = new HashService()

  const hash = await service.generateDummyHash()
  console.info(`generateDummyHash: Successful generate dummy hash`)
  res.send(hash)
})

export { router as generateDummyHash }
