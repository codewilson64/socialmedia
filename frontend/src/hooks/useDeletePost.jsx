import { useContext } from 'react';
import { UserPostContext } from '../context/UserPostsContext';

const useDeletePost = () => {

  const { dispatch } = useContext(UserPostContext)

  const deletePost = async (_id) => {
    const response = await fetch(`/api/post/${_id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
  
      if(response.ok) {
        dispatch({type: 'DELETE_POST', payload: data})
      }
  }
  
  return {deletePost}
}

export default useDeletePost