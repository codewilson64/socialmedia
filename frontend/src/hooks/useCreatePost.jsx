import { useState } from 'react'

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const createPost = async (text, imageUrl) => {
    setIsLoading(true)
    
    const response = await fetch('/api/post/create', {
      method: 'POST',
      body: JSON.stringify({text, image: imageUrl}),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      setIsLoading(false)
      console.log('Post success')
    }
  }

  return {createPost, isLoading, error}
}

export default useCreatePost