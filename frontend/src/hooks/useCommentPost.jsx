import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useCommentPost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [text, setText] = useState('') 

  const navigate = useNavigate()

  const commentPost = async (text, _id) => {
    setIsLoading(true)

    const response = await fetch(`/api/post/comment/${_id}`, {
      method: 'POST',
      body: JSON.stringify({text}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      setText('')
      setIsLoading(false)
      navigate('/refresh')
      navigate(-1)
    }
  }

  return { commentPost, isLoading, error }
}

export default useCommentPost