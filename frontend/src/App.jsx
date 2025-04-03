import { Route, Routes, Navigate } from "react-router-dom"

import UserPage from "./pages/UserPage"
import PostPage from "./pages/PostPage"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/Auth/SignupPage"
import LoginPage from "./pages/Auth/LoginPage"

import Header from "./components/Header"

import { Toaster } from 'react-hot-toast'
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

function App() {
  const { authUser } = useContext(AuthContext)

  return (
    <div className="flex flex-col mx-auto">
      {authUser && <Header />} 
      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to='/login'/>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to='/'/>}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/'/>}/>
        <Route path="/:username" element={authUser ? <UserPage /> : <Navigate to='/login'/>}/>
        <Route path="/:username/post/:id" element={authUser ? <PostPage /> : <Navigate to='/login'/>}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
