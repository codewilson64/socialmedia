import Post from "../models/post.model.js"
import User from "../models/user.model.js"
import {v2 as cloudinary} from 'cloudinary'

// Get Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({createdAt: -1})
      .populate({
        path: 'user',
        select: '-password'
      })

    if(!posts) {
      return res.status(400).json({error: 'No posts available'})
    }

    res.status(200).json(posts)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in getPosts controller', error.message)
  }
}

// Get Post
const getPost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findById(id)
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user'
      })

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    res.status(200).json(post)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in getPost controller', error.message)
  }
}

// Get Following Posts
const getFollowingPosts = async (req, res) => {
  const _id = req.user._id

  try {
    const user = await User.findById(_id)

    const followingPosts = await Post.find({user: {$in: user.following}})
      .sort({createdAt: -1})
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user',
        select: '-password'
      })

    res.status(200).json(followingPosts)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in getFollowingPosts controller', error.message)
  }
}

// Get User Posts
const getUserPosts = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({username})  

    if(!user) {
      return res.status(400).json({error: 'User not found'})
    }

    const posts = await Post.find({user: user._id}).sort({createdAt: -1})
      .populate({
        path: 'user'
      })
      .populate({
        path: 'comments.user'
      })
    
    res.status(200).json(posts)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in getUserPosts controller', error.message)
  }
}

// Create Post
const createPost = async (req, res) => {
  const { text } = req.body
  let { image } = req.body
  const _id = req.user._id

  try {
    if(!text) {
      return res.status(400).json({error: 'You must write something to post'})
    }

    if(image) {
      const uploadedResponse = await cloudinary.uploader.upload(image)
      image = uploadedResponse.secure_url
    }

    const post = new Post({
      text,
      image,
      user: _id
    })

    await post.save()
    res.status(200).json(post)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in createPost controller', error.message)
  }
}

// Delete Post
const deletePost = async (req, res) => {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndDelete(id)

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    if(post.image) {
      await cloudinary.uploader.destroy(post.image.split('/').pop().split('/')[0])
    }

    res.status(200).json(post)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in deletePost controller', error.message)
  }
}

// Like Post
const likePost = async (req, res) => {
  const { id } = req.params
  const _id = req.user._id

  try {
    const post = await Post.findById(id)

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    const isLiked = post.likes.includes(_id)

    if(isLiked) {
      await Post.findByIdAndUpdate(id, {$pull: {likes: _id}})
      await User.findByIdAndUpdate(_id, {$pull: {likedPosts: id}})
      res.status(200).json(post)
    }
    else {
      await Post.findByIdAndUpdate(id, {$push: {likes: _id}})
      await User.findByIdAndUpdate(_id, {$push: {likedPosts: id}})
      res.status(200).json(post)
    }
    
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in likePost controller', error.message)
  }
}

// Comment Post
const commentPost = async (req, res) => {
  const { text } = req.body
  const { id } = req.params
  const { _id } = req.user._id

  try {
    const post = await Post.findById(id).populate({
      path: 'comments.user'
    })

    if(!post) {
      return res.status(400).json({error: 'Post not found'})
    }

    post.comments.push({user: _id, text})
    post.save()

    res.status(200).json(post)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in commentPost controller', error.message)
  }
}

export { createPost, getPosts, getPost, getFollowingPosts, getUserPosts, deletePost, likePost, commentPost }