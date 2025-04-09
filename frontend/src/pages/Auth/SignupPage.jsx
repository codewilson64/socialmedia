import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signup, isLoading, error } = useSignup() 

  const handlesignup = async (e) => {
    e.preventDefault()
    await signup(username, fullName, email, password)
  }


  return (
    <div className='max-w-[600px] w-full mx-auto'>
      <div className='flex items-center justify-center h-screen'>
        <form onSubmit={handlesignup}>
          <h1 className='text-4xl font-extrabold text-black mb-3'>Join today.</h1>
          <div className='w-[300px] flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label className='mb-2'>Username:</label>
            <input 
              className='border border-gray-500 px-3 py-2 outline-none'
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-2'>Fullname:</label>
            <input 
              className='border border-gray-500 px-3 py-2 outline-none'
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-2'>Email:</label>
            <input 
              className='border border-gray-500 px-3 py-2 outline-none'
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-2'>Password:</label>
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
              {isLoading ? 'Loading...' : 'Sign up'}
            </button>      
          {error && <p className='text-red-400'>{error}</p>}
            <p>Already have an account?</p>
            <Link to={'/login'}>
              <button className='w-full text-black border-2 border-black rounded-full py-3'>Sign in</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage