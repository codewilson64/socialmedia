import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { 
  createPost, 
  getPosts, 
  getPost, 
  getFollowingPosts,
  getUserPosts,
  likePost, 
  commentPost, 
  deletePost, 
} from '../controllers/post.controller.js'

const router = express.Router()

router.get('/', protectRoute, getPosts)
router.get('/followingposts', protectRoute, getFollowingPosts)
router.get('/:id', protectRoute, getPost)
router.get('/user/:username', protectRoute, getUserPosts)

router.post('/create', protectRoute, createPost)
router.put('/like/:id', protectRoute, likePost)
router.post('/comment/:id', protectRoute, commentPost)

router.delete('/:id', protectRoute, deletePost)

export default router