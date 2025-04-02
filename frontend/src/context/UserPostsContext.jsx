import { createContext, useReducer } from "react";

export const UserPostContext = createContext()

export const userPostReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER_POSTS': 
      return {
        userPosts: action.payload
      }
    case 'DELETE_POST': 
      return {
        userPosts: state.userPosts.filter(post => post._id !== action.payload._id)
      }
    default: 
      return state
  }
}

export const UserPostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userPostReducer, {
    userPosts: []
  })

  console.log('UserPostContext state: ', state)

  return (
    <UserPostContext.Provider value={{...state, dispatch}}>
      {children}
    </UserPostContext.Provider>
  )
}
