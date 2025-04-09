import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'

import { FaRegUser } from "react-icons/fa6";
import { MdOutlineAddAPhoto } from "react-icons/md";

const Header = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <div className='relative w-full flex justify-center items-center py-4'>
      <Link to='/'>
      <div className='flex items-center gap-1'>
        <MdOutlineAddAPhoto size={24}/>
        <h1 className='text-2xl font-bold'>chatgram</h1>  
      </div>         
      </Link>
      
      <div className='absolute right-3'>
        <div className='flex items-center gap-2'>
          <Link to={`/${authUser?.username}`}>
            <FaRegUser className='w-5 h-5' />
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