import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";

const Actions = ({ liked, setLiked }) => {
  return (
    <div className='flex gap-8 mb-4'>
      <div className="flex gap-1 items-center">
        <FaRegHeart 
            size={18} 
            color={liked ? 'red' : ''} 
            onClick={() => setLiked(!liked)}
            className="cursor-pointer"
        />
        <span className="text-gray-700 text-sm">200</span>
      </div>

      <div className="flex gap-1 items-center">
        <FaRegComment
          size={18} 
          className="cursor-pointer"
          onClick={()=>document.getElementById('comment_modal').showModal()}
        />
          <dialog id="comment_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        <span className="text-gray-700 text-sm">40</span>
      </div>

      <div className="flex gap-1 items-center">
        <FaRegShareSquare size={18} className="cursor-pointer"/>
        <span className="text-gray-700 text-sm">85</span>
      </div>
    </div>
  )
}

export default Actions