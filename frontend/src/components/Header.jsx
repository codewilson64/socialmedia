import { useContext } from 'react'
import darklogo from '../public/dark-logo.svg'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

import { FaRegUser } from "react-icons/fa6";

const Header = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <div className='relative w-[600px] mx-auto flex justify-center items-center py-4'>
      <Link to='/'>
        <img src={darklogo} alt="logo" className='w-12 h-12 sm:w-6 sm:h-6'/>     
      </Link>
      
      <div className='absolute right-3'>
        <div className='flex items-center gap-2'>
          <Link to={`/${authUser?.username}`}>
            <FaRegUser className='w-8 h-8 sm:w-5 sm:h-5' />
          </Link>
          <div>
            {authUser && <LogoutButton/>}
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Header