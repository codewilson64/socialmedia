import React from 'react'
import useLogout from '../hooks/useLogout'
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const { logout } = useLogout()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div>
      <MdLogout 
        className='w-5 h-5 cursor-pointer'
        onClick={handleLogout}
      />
    </div>
  )
}

export default LogoutButton