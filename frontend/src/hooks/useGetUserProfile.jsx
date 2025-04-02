import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const useGetUserProfile = () => {
  const [userProfile, setUserProfile] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { username } = useParams()

  useEffect(() => {
    setIsLoading(true)

    const getUserProfile = async () => {
      const response = await fetch(`api/user/profile/${username}`)
      const data = await response.json()

      if(!response.ok) {
        setError(data.error)
      }

      if(response.ok) {
        console.log(data)
        setUserProfile(data)
        setIsLoading(false)
      }
    }

    getUserProfile()
  }, [username])

  return { userProfile, isLoading, error }
}

export default useGetUserProfile