import UserHeader from '../components/UserHeader'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'
import { UserPostContext } from '../context/UserPostsContext'
import useGetUserProfile from '../hooks/useGetUserProfile'

const UserPage = () => { 
  const [error, setError] = useState(null)

  const { username } = useParams()

  // Custom Hooks
  const { userPosts, dispatch } = useContext(UserPostContext)
  const { userProfile, isLoading } = useGetUserProfile()

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await fetch(`/api/post/user/${username}`)
      const data = await response.json()

      if(!response.ok) {
        setError(data.error)
      }

      if(response.ok) {
        dispatch({type: 'GET_USER_POSTS', payload: data})
      }
    }

    getUserPosts()
  },[username])

  return (
    <div className='w-[600px] mx-auto border border-slate-300 rounded-3xl'>
      <UserHeader userProfile={userProfile} />  

      {userPosts.length === 0 && (
        <div className='flex justify-center items-center p-20'>
          <h1 className='text-sm text-slate-500 font-normal'>You have no posts.</h1>
        </div>
      )}

      {userPosts.map((post) => (
        <Post key={post._id} post={post} user={post.user}/>
      ))}
    </div>
  )
}

export default UserPage