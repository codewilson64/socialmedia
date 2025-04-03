import React, { useContext, useEffect, useState } from 'react'

import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

import { formatDistanceToNow } from 'date-fns'

import { Link, useParams, useNavigate  } from 'react-router-dom';
import Comments from '../components/Comments';
import { AuthContext } from '../context/AuthContext';

import useCommentPost from '../hooks/useCommentPost';
import useDeletePost from '../hooks/useDeletePost';

const PostPage = () => {
  const [post, setPost] = useState([])
  const [text, setText] = useState('') 
  
  const { id } = useParams()
  
  const navigate = useNavigate()
  
  const { authUser } = useContext(AuthContext)

  const isLiked = post.likes?.includes(authUser._id)

  // Custom Hooks
  const { commentPost, isLoading, error } = useCommentPost()
  const { deletePost } = useDeletePost()

  // Handle Like Post
  const handleLikePost = async () => {
    const response = await fetch(`/api/post/like/${post._id}`, {
      method: 'PUT'
    })
    const data = await response.json()

    if(response.ok) {
      navigate('/refresh')
      navigate(-1)
    }    
  }

  // Handle Post Comment
  const handlePostComment = async (_id) => {
    await commentPost(text, _id)  
  }

  // Handle Delete
  const handleDelete = async (_id) => {
    await deletePost(_id)
    navigate(`/${user.username}`)
  }

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`/api/post/${id}`)
      const data = await response.json()

      if(response.ok) {
        setPost(data)
        console.log(data)
      }
    }

    getPost()
  }, [])

  return (
    <div className='flex flex-col w-[600px] mx-auto border border-slate-300 rounded-xl'>
      <div className='flex gap-4 px-6 py-3'>

      <div className='w-[60px]'>
        <img src={post.user?.profileImg} alt="image" className="w-12 h-12 rounded-full object-cover"/>
      </div>

      <div className='flex flex-col w-full'>  
      <div className='flex justify-between mb-3 mt-3'>
        <Link to={`/${post.user?.username}`} className='flex items-center gap-3'>
            <div>
              <p className='font-semibold'>{post.user?.fullName}</p>
            </div>
        </Link>

        <div className='dropdown dropdown-end'>
          
          {/* <MdOutlineMoreHoriz size={20} cursor={"pointer"} tabIndex={0} role="button"/> */}
          {authUser._id === post.user?._id && (
            <ul tabIndex={0} className="dropdown-content menu rounded-box text-black font-semibold z-[1] w-52 p-2 shadow">
              <li onClick={() => handleDelete(post._id)}><a>Delete</a></li>
            </ul>             
          )}
        </div>
      </div>

      <div className='mb-4'>
        <p className='mb-3'>{post.text}</p>
        {post.image && (
          <img src={post.image} alt="post" className='h-80 rounded-xl object-cover'/>
        )}
      </div>

      {/* Actions */}
            <div className='flex gap-8'>
              <div className="flex gap-1 items-center" onClick={handleLikePost}>
                {isLiked && (
                  <FaRegHeart 
                  size={18} 
                  className="fill-red-600 cursor-pointer"
                  />
                )}
                {!isLiked && (
                  <FaRegHeart 
                    size={18} 
                    className="cursor-pointer"
                  />
                )}
                  <span className={`${isLiked ? 'text-red-600' : 'text-gray-700'} text-sm`}>{post.likes?.length}</span>
              </div>
            
                  <div className="flex gap-1 items-center">
                    <FaRegComment 
                      size={18} 
                      className="cursor-pointer" 
                      onClick={()=>document.getElementById('comment_modal').showModal()}
                    />
                      <dialog id="comment_modal" className="modal">
                        <div className="modal-box">
                          <div className='p-3'>
                            <h3 className="text-black font-bold text-lg">Comments</h3>
                          </div>
      
                          <form>
                            <textarea 
                              className='w-full outline-none resize-none p-3 rounded-lg mb-2'
                              placeholder="Add a comment"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                            />
                            <button 
                              disabled={isLoading}
                              className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'
                              onClick={() => handlePostComment(post._id)}
                              >
                              {isLoading ? 'Posting...' : 'Post'}
                            </button>
                        </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button>close</button>
                        </form>
                      </dialog>
                    <span className="text-gray-700 text-sm">{post.comments?.length}</span>
                  </div>
            
                  <div className="flex gap-1 items-center">
                    <FaRegShareSquare size={18} className="cursor-pointer"/>
                    <span className="text-gray-700 text-sm"></span>
                  </div>
            </div>

        </div>
      </div>

      <div className='px-6 py-3 border border-r-0 border-l-0 border-e-gray-300'>
        <p className='text-lg font-medium'>Replies</p>
      </div>


    {post.comments?.map((comment) => (
      <Comments key={comment._id} comment={comment} />
    ))}
      
    </div>
  )
}

export default PostPage