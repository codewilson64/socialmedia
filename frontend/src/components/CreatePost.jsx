import React, { useRef, useState } from 'react'

import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import usePreviewImage from '../hooks/usePreviewImage';
import useCreatePost from '../hooks/useCreatePost';

const CreatePost = () => {
  const [text, setText] = useState('')
  const imageRef = useRef(null)

  // Custom Hooks
  const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage()
  const { createPost, isLoading, error } = useCreatePost()

  // Handle Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault()
    await createPost(text, imageUrl)

    setText('')
    setImageUrl(null)
  }

  return (
    <div className='px-6 py-3'>
      <form onSubmit={handleCreatePost}>
        <div className='border-b border-gray-300 mb-3'>
          <textarea
            className='w-full outline-none resize-none p-4 pl-0 bg-transparent'
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {imageUrl && (
            <div className='relative w-72 mx-auto'>
              <IoCloseSharp 
                className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                onClick={() => {
                  setImageUrl(null)
                }}
              />
              <img src={imageUrl} className='w-full mx-auto h-72 object-contain rounded' />
            </div>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <CiImageOn className='w-7 h-7 cursor-pointer' onClick={() => imageRef.current.click()}/>
          <input type='file' accept='image/*' hidden ref={imageRef} onChange={handleImageChange}/>
          <button 
            disabled={isLoading} 
            className={`${isLoading && 'w-[90px]'} w-[70px] font-bold text-white text-center bg-blue-500 rounded-full py-2`}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
          {error && <div className='text-red-400'>{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default CreatePost