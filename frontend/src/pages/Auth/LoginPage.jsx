import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, isLoading, error } = useLogin()

  const handlelogin = async (e) => {
    e.preventDefault()
    await login(username, password)
  }

    return (
      <div className='max-w-[600px] w-full mx-auto'>     
        <div className='flex items-center justify-center h-screen'>
          <form onSubmit={handlelogin}>
            <h1 className='text-4xl font-extrabold text-black mb-3'>Let's go.</h1>
            <div className='w-[300px] flex flex-col gap-4'>
            <div className='flex flex-col'>
              <label className='mb-2'>Username: <span className='font-bold'>user123</span></label>
              <input 
                className='border border-gray-500 px-3 py-2 outline-none'
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <label className='mb-2'>Password: <span className='font-bold'>abcABC123#</span></label>
              <input
                className='border border-gray-500 px-3 py-2 outline-none' 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            </div>
            <div className='flex flex-col mt-4 gap-3'>
              <button disabled={isLoading} className='w-full bg-black text-white rounded-full py-3'>
                {isLoading ? 'Loading...' : 'Login'}
              </button>      
              {error && <p className='text-red-400'>{error}</p>}
              <p>Don't have an account?</p>
              <Link to={'/signup'}>
                <button className='w-full text-black border-2 border-black rounded-full py-3'>Sign up</button>
              </Link>
          </div>
          </form>
        </div>
      </div>
  )
}

export default LoginPage