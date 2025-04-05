import React, { useContext, useRef, useState } from 'react'
import blankProfile from '../public/blankProfile.webp'
import { AuthContext } from '../context/AuthContext';
import usePreviewImage from '../hooks/usePreviewImage';
import useUpdateProfile from '../hooks/useUpdateProfile';

const UpdateProfilePage = () => {
  const { authUser } = useContext(AuthContext)

  const [fullName, setFullName] = useState(authUser.fullName);
  const [username, setUsername] = useState(authUser.username);
  const [bio, setBio] = useState(authUser.bio);
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')

  const fileRef = useRef(null)

  const { handleImageChange, imageUrl } = usePreviewImage()

  const { updateProfile, isLoading, error } = useUpdateProfile()

  const handleUpdate = async (e) => {
    e.preventDefault()
    await updateProfile(fullName, username, bio, oldPassword, password, imageUrl)
  }

  return (
    <div>
      <button 
        className='w-full border border-gray-300 text-black font-semibold py-1 rounded-xl' 
        onClick={()=>document.getElementById('edit_profile_modal').showModal()}
      >
        Edit profile
      </button>
        <dialog id="edit_profile_modal" className="modal">

        <div className="modal-box bg-white">
        <h3 className="font-bold text-lg mb-5">Update Profile</h3>
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <div className="rounded-full mx-auto">
              <img 
                src={imageUrl || blankProfile} 
                alt="profileImg" 
                className="w-[80px] h-[80px] rounded-full object-cover cursor-pointer"
                onClick={() => fileRef.current.click()}
              />
            </div>
            <input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
            <div className="flex gap-2">
              <input 
                className="flex-1 p-3 rounded-lg outline-none border border-gray-500" 
                type="text" 
                placeholder="Fullname" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} />
              <input 
                className="flex-1 p-3 rounded-lg outline-none border border-gray-500" 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <textarea 
              className='w-full outline-none resize-none p-3 rounded-lg border border-gray-500'
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input 
              className="flex-1 p-3 rounded-lg outline-none border border-gray-500" 
              placeholder="Old Password" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
            />
            <input 
              className="flex-1 p-3 rounded-lg outline-none border border-gray-500" 
              placeholder="New Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            /> 
            <button 
              className='w-full font-bold text-white bg-black rounded-full py-2'
              disabled={isLoading}
              type='submit'
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
            {error && <p className='text-red-400'>{error}</p>}
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
            <button>close</button>
        </form>

       </dialog>
    </div>
  )
}

export default UpdateProfilePage