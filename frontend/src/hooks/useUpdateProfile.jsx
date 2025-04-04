import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const useUpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  const updateProfile = async (fullName, username, bio, oldPassword, password, imageUrl) => {
    setIsLoading(true)
    setError(null)
    
    const response = await fetch('/api/user/update', {
      method: 'PUT',
      body: JSON.stringify({fullName, username, bio, oldPassword, password, profileImg: imageUrl}),
      headers: { 'Content-Type': 'application/json' }
    })
  
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({type: 'LOGIN', payload: data})
      setIsLoading(false)
      navigate('/refresh')
      navigate(-1)
    }
}
    return { updateProfile, isLoading, error }
}

export default useUpdateProfile