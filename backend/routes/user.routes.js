import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { followUser, updateUser, getUserProfile } from '../controllers/user.controller.js'

const router = express.Router()

router.post('/follow/:id', protectRoute, followUser)
router.put('/update', protectRoute, updateUser)

router.get('/profile/:username', protectRoute, getUserProfile)

export default router