import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useContext(AuthContext)

  const logout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
     
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
    }

    if(response.ok) {
      localStorage.removeItem('user')  
      dispatch({type: 'LOGOUT'})
    }
  }
  return { logout }
}

export default useLogout