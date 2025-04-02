import { createContext, useReducer } from "react";

export const PostContext = createContext()

export const postReducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_POST':
      return {
        posts: [ action.payload, ...state.posts ]
      }
    case 'GET_ALL_POSTS': 
      return {
        posts: action.payload
      }
    case 'GET_SINGLE_POST': 
      return {
        posts: action.payload
      }
    default: 
      return state
  }
}

export const PostContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(postReducer, {
    posts: []
  })

  console.log('PostContext state: ', state)

  return (
    <PostContext.Provider value={{...state, dispatch}}>
      {children}
    </PostContext.Provider>
  )
}
