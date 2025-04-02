import blankProfile from '../public/blankProfile.webp'
import { FaInstagram } from "react-icons/fa6";
import { CgMoreO } from "react-icons/cg";
import toast from 'react-hot-toast'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import UpdateProfilePage from '../pages/UpdateProfilePage';
import { useNavigate } from 'react-router-dom';

const UserHeader = ({ userProfile }) => {
  const [feedType, setFeedType] = useState('posts')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  
  const { authUser } = useContext(AuthContext)

  const isFollowing = userProfile.followers?.includes(authUser._id)
  const isMyProfile = authUser?._id === userProfile?._id

  const copyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
      .then(() => toast.success('Url copied to clipboard!'))
  }

  // Handle Follow User
  const handleFollowUser = async () => {
    setIsLoading(true)

    const response = await fetch(`/api/user/follow/${userProfile._id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      setIsLoading(false)
      navigate('/refresh')
      navigate(-1)
    }
  }

  return (
    <div className='flex flex-col gap-6 px-6 py-3'>

      <div className='flex justify-between items-center'>
        <div>
          <p className="text-2xl font-bold">{userProfile.fullName}</p>
          <span className='text-sm'>{userProfile.username}</span>
        </div>
        <div className="rounded-full">
          {authUser?.profileImg && (
            <img src={userProfile.profileImg} alt="profileImg" className="w-[80px] h-[80px] rounded-full object-cover"/>
          )}
          {!authUser?.profileImg && (
            <img src={blankProfile} alt="profileImg" className="w-[80px] h-[80px] rounded-full object-cover"/>
          )}
        </div>
      </div>
      
      <p className='text-sm'>{userProfile.bio}</p>

      {isMyProfile && <UpdateProfilePage />}
      {!isMyProfile && (
        <button 
          disabled={isLoading}
          onClick={handleFollowUser} 
          className='border border-black text-white font-semibold bg-black py-1 rounded-xl'>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}

      <div className='flex justify-between'>
        <p className='text-sm text-slate-500 font-normal'>{userProfile?.followers?.length} followers</p>
        <div className='flex gap-3'>
          <FaInstagram size={24} cursor={"pointer"}/>
          <div className="dropdown dropdown-end">
            <CgMoreO size={24} cursor={"pointer"} tabIndex={0} role="button"/>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li onClick={copyURL}><a>Copy link</a></li>
              </ul>
          </div>    
        </div>
      </div>
      
      <div className="flex cursor-pointer mb-3">
        <div className='relative flex-1 text-center py-3' onClick={() => setFeedType('posts')}>
          <p className='font-semibold text-slate-600'>Posts</p>       
          {feedType === 'posts' && <div className="absolute w-full h-[1px] left-0 bottom-0 rounded-full bg-slate-600"></div>}
        </div>
        <div className='relative flex-1 text-center py-3' onClick={() => setFeedType('replies')}>
          <p className='font-semibold text-slate-600'>Replies</p>  
          {feedType === 'replies' && <div className="absolute w-full h-[1px] right-0 bottom-0 rounded-full bg-slate-600"></div>}     
        </div>
      </div>
    </div>
  )
}

export default UserHeader