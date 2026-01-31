import { useLocation } from "react-router-dom";
import { GoClockFill } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { TiTrash } from "react-icons/ti";
import { IoTrash } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { doc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar.jsx";
import { timeAgo } from "../../utils/timeago.js";

export default function CardApproved({ post }) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = async()=>{
    setShow(true);
    /*try{
    await deleteDoc(doc(db, 'Posts', post.id));
    toast.success("Post deleted succesfully", {
        position: "top-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });
    }catch(error){
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });
    }*/
  }
  const handleConfirm = async()=>{
    try{
    await deleteDoc(doc(db, 'Posts', post.id));
    toast.success("Post deleted successfully.", {
      position: "top-center",
      autoClose: 2000,
      style: {
        textAlign: "center",
        width: "280px",        
        borderRadius: "12px",
        marginTop: "1rem",  
      },
    });
    }catch(error){
      toast.error("Couldn't delete post", {
        position: "bottom-center",
        autoClose: 2000,
        style: {
          textAlign: "center",
          width: "280px",        
          borderRadius: "12px",
          marginTop: "1rem",  
        },
      });
    }
  }
  const handleEdit = ()=>{
    navigate('/edit', { state: { post } });
  }
  
  

  //  Loading skeleton
  if (!post) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-5 my-2 md:my-2 animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="h-5 w-20 bg-gray-200 rounded-lg" />
        </div>

        <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />

        <div className="flex gap-10">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  
  return (
    <div className="relative bg-white shadow-sm rounded-xl p-5 my-2 md:my-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Avatar name={post.clubName} size={40} />

          <div>
            <div className="text-lg font-semibold break-words leading-snug w-4/5">
              {post.clubName}
            </div>
            <div className="text-sm text-neutral-600 w-4/5">{timeAgo(post.createdAt)}</div>
          </div>
        </div>

        {(post.state === "approved" && !pathname.startsWith("/clubs/")) && (
          <div className="absolute top-5 right-5 z-5 flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
              <TiTick className="text-green-600 text-sm" />
            </div>
            <div className="bg-neutral-100  py-2 px-1 p rounded-xl flex flex-col gap-3 items-center">
              <div className="text-neutral-400 hover:text-neutral-500" onClick={handleDelete}><FaTrash size={12}/></div>
              <div className="text-neutral-400 hover:text-neutral-500" onClick={handleEdit}><MdEdit size={16}/></div>
            </div>
            {show && (
            <DeletePopup
              onCancel={() => setShow(false)}
              onConfirm={() => {
                handleConfirm();
                setShow(false);
              }}
            />
          )}
            
          </div>  
        )}

        {post.state === "rejected" && (
          <div className="absolute top-5 right-5 z-5 flex flex-col items-center gap-3">  
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-100">
              <TiTimes className="text-red-600 text-sm" />
            </div>
            <div className="bg-neutral-100  py-2 px-1 p rounded-xl flex flex-col gap-3 items-center">
              <div className="text-neutral-400 hover:text-neutral-500 cursor-pointer"><FaTrash size={12} onClick={handleDelete}/></div>
              <div className="text-neutral-400 hover:text-neutral-500 cursor-pointer"><MdEdit size={16}/></div>
            </div>
            {show && (
            <DeletePopup
              onCancel={() => setShow(false)}
              onConfirm={() => {
                handleConfirm();
                setShow(false);
              }}
            />
          )}
          </div> 
           
        )}
        
       
         
      </div>

      {/* Title */}
      <div className="pl-1 text-lg font-semibold w-5/6">{post.title}</div>

      {/* Description */}
      <div className="pl-1 text-md mb-4 text-neutral-600 break-words leading-relaxed">
        {post.description}
      </div>

      <hr className="my-2" />

      <div className="flex gap-16 pl-1 text-neutral-600 text-sm">
        {post.date && (
          <div className="flex items-center gap-2">
            <FaCalendar />
            <div>{post.date}</div>
          </div>
        )}
        {post.time && (
          <div className="flex items-center gap-2">
            <GoClockFill />
            <div>{post.time}</div>
          </div>
        )}
      </div>
    </div>
  );
}
function DeletePopup({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl animate-fadeIn">
        
        <h2 className="text-lg font-semibold text-neutral-800">
          Delete post?
        </h2>

        <p className="text-sm text-neutral-500 mt-2">
          Are you sure you want to delete this post?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-neutral-600 hover:bg-neutral-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

