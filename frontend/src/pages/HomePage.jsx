import React, { useContext, useEffect, useState } from 'react'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'
import { PostContext } from '../context/PostContext'

const HomePage = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { posts, dispatch } = useContext(PostContext)

  useEffect(() => {
    setIsLoading(true)

    const getPosts = async () => {
      const response = await fetch('/api/post/')
      const data = await response.json()

      if(!response.ok) {
        setError(data.error)
        setIsLoading(false)
      }

      if(response.ok) {
        dispatch({type: 'GET_ALL_POSTS', payload: data})
        setIsLoading(false)
      }
    }
    getPosts()
  }, [])

  return (
    <div className='max-w-[600px] w-full mx-auto'>
      <div className='flex flex-col border border-slate-300 rounded-3xl'>
        <CreatePost />

        {/* {isLoading && (
          <div className='flex justify-center items-center p-12'>
            <h3>Loading posts...</h3>
          </div>
        )} */}
        {!isLoading && posts?.length === 0 && (
          <div className='flex justify-center items-center p-12'>
            <h1>Follow some users to see their posts.</h1>
          </div>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} user={post.user}/>
        ))}
      </div>
    </div>
  )
}

export default HomePage