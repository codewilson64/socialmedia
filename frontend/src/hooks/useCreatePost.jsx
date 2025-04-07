import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

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
      navigate('/refresh')
      navigate(-1)
    }
  }

  return {createPost, isLoading, error}
}

export default useCreatePost