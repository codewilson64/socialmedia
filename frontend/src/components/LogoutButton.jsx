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
        className='w-9 h-9 sm:w-5 sm:h-5 cursor-pointer'
        onClick={handleLogout}
      />
    </div>
  )
}

export default LogoutButton