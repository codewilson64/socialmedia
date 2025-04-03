import React, { useState } from 'react'

import { MdOutlineMoreHoriz } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

import { Link } from 'react-router-dom';

const Comments = ({ comment }) => {
  const [liked, setLiked] = useState(false)

  return (
    <div className='flex flex-col border border-t-0 border-l-0 border-r-0 border-slate-300 px-6 py-3'>
      <div className='flex gap-4'>

      <div className='w-[60px]'>
        <img src={comment.user.profileImg} alt="image" className="w-12 h-12 rounded-full object-cover"/>
      </div>

      <div className='flex flex-col w-full'>
        <div className='flex justify-between mb-3 mt-3'>
            <Link to={`/${comment.user.username}`} className='flex items-center gap-3'>
              <div>
                <p className='font-semibold'>{comment.user.fullName}</p>
              </div>
            </Link>

            <div className='flex items-center text-sm text-slate-500 gap-3'>

              {/* <MdOutlineMoreHoriz /> */}
            </div>
        </div>

        <div className='mb-4'>
          <p>{comment.text}</p>
        </div>

      {/* Actions */}
        <div className='flex gap-8'>
            <div className="flex gap-1 items-center">
                <FaRegHeart 
                    size={18} 
                    color={liked ? 'red' : ''} 
                    onClick={() => setLiked(!liked)}
                    className="cursor-pointer"
                />
                <span className="text-gray-700 text-sm"></span>
            </div>
                  
            <div className="flex gap-1 items-center">
                <FaRegComment size={18} className="cursor-pointer"/>
                <span className="text-gray-700 text-sm"></span>
            </div>
                  
            <div className="flex gap-1 items-center">
                <FaRegShareSquare size={18} className="cursor-pointer"/>
                <span className="text-gray-700 text-sm"></span>
            </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Comments