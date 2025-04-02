import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import validator from 'validator'
import { v2 as cloudinary } from 'cloudinary'

// Get User Profile
const getUserProfile = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({username}).select('-password')

    if(!user) {
      return res.status(400).json({error: 'User not found'})
    }
    res.status(200).json(user)
  }
  catch(error) {
    res.status(400).json({error: error.message})
    console.log('Error in getUserProfile controller', error.message)
  }
}

// Follow/Unfollow
const followUser = async (req, res) => {
  const { id } = req.params
  const otherUser = await User.findById(id)
  const currentUser = await User.findById(req.user._id)

  try {
    if(id === req.user._id.toString()) {
      return res.status(400).json({error: 'You cannot follow yourself'})
    }

    if(!otherUser || !currentUser) {
      return res.status(400).json({error: 'User not found'})
    }

    const isFollowing = currentUser.following.includes(id)

    if(isFollowing) {
      await User.findByIdAndUpdate(req.user._id, {$pull: {following: id}})
      await User.findByIdAndUpdate(id, {$pull: {followers: req.user._id}})
      res.status(200).json({message: 'Unfollow successful'})
    } 
    else {
      await User.findByIdAndUpdate(req.user._id, {$push: {following: id}})
      await User.findByIdAndUpdate(id, {$push: {followers: req.user._id}})
      res.status(200).json({message: 'Follow successful'})
    }
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in followUser controller', error.message)
  }
}

// Update User
const updateUser = async (req, res) => {
  const { fullName, username, email, password, oldPassword, bio } = req.body
  let { profileImg } = req.body
  const _id = req.user._id

  try {
    let user = await User.findById(_id)

    if((!oldPassword && password) || (oldPassword && !password)) {
      return res.status(400).json({error: 'Please provide both current and new password'})
    }

    if(oldPassword && password) {
      const isMatch = await bcrypt.compare(oldPassword, user.password)

      if(!isMatch) {
        return res.status(400).json({error: 'Old password is incorrect'})
      }

      if(!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: 'Password is too weak' })
      }

      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      user.password = hash
    }

    if(profileImg) {
      if(user.profileImg) {
        await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0])
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg)
      profileImg = uploadedResponse.secure_url
    }

    user.fullName = fullName || user.fullName
    user.username = username || user.username
    user.email = email || user.email
    user.profileImg = profileImg || user.profileImg
    user.bio = bio || user.bio

    user = await user.save()

    user.password = null
    res.status(200).json(user)
  } 
  catch (error) {
    res.status(400).json({error: error.message})
    console.log('Error in updateUser controller', error.message)
  }
}

export { followUser, updateUser, getUserProfile }