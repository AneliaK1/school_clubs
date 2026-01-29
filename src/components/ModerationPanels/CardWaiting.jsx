import { GoClockFill } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import { useEffect } from "react";
import { collection } from "firebase/firestore";
import { db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteDoc } from "firebase/firestore";
import Avatar from "../Avatar";

export default function CardWaiting({ post }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleAccept = async(e)=>{
    console.log('clicked');
    e.stopPropagation()
    try{
      
      await setDoc(doc(db, 'Posts', post.id), {
        ...post,
        state: 'approved'
      })

    }
    catch(error){
      console.log(error)
    }
    
  }
  const handleReject = async(e)=>{
    console.log('clicked');
    e.stopPropagation()
    try{
      
      await setDoc(doc(db, 'Posts', post.id), {
        ...post,
        state: 'rejected'
      })

    }
    catch(error){
      console.log(error)
    }
    
  }
  const handleEdit = ()=>{
    navigate('/edit', { state: { post } });
  }
  const handleDelete = async()=>{
    try{
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
    }
  }
  
 
  return (
    <div className="relative bg-white shadow-sm rounded-xl p-5 my-3 md:my-6">
      {/* Header: club + avatar */}
      <div className="flex flex-row gap-4 justify-between items-center mb-4 ">
        <div className="flex flex-row items-center gap-3">
          <Avatar name={post.clubName} size={40} />

          <div>
            <div className="text-lg font-semibold break-words leading-snug">{post.clubName}</div>
            <div className="text-sm text-neutral-600">Преди 2 часа</div>
          </div>
        </div>
        <div className="absolute top-5 right-5 z-5 flex flex-col items-center gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
            <GoClockFill className="text-amber-600 text-sm" />
          </div> 
          <div className=" bg-neutral-100  py-2 px-1 p rounded-xl flex flex-col gap-3 items-center">
              <div className="text-neutral-400 hover:text-neutral-500 cursor-pointer" onClick={handleDelete}><FaTrash size={12}/></div>
              <div className="text-neutral-400 hover:text-neutral-500 cursor-pointer" onClick={handleEdit}><MdEdit size={16}/></div>
          </div>
        </div>
         
        
      </div>
      

      {/* Post title */}
      <div className="pl-1 text-lg font-semibold w-5/6">{post.title}</div>

      {/* Post description */}
      <div className="pl-1 text-md mb-4 text-neutral-600 break-words whitespace-normal leading-relaxed">
      {post.description}
      </div>


      <hr className="my-2 " />
      <div className="flex flex-row items-center gap-16 pl-1 text-neutral-600 text-sm pr-10 md:pr-0">
        {post.date && <div className="flex flex-row items-center gap-2"><FaCalendar /><div>{post.date}</div></div>}
        {post.time && <div className="flex flex-row items-center gap-2"><GoClockFill /><div>{post.time}</div></div>}
      </div>
      {pathname !== '/account' ? <div className="flex flex-col md:flex-row gap-2 mt-3">
        <div className="border border-1 w-full flex flex-row items-center gap-2 justify-center py-2 rounded-lg bg-teal-600 text-white text-sm tracking-wide font-semibold hover:opacity-90 transition duration-200 shadow-sm" onClick={handleAccept}><TiTick className="text-lg font-light cursor-pointer"/> <div>Одобри</div></div>
        <div className="border border-1 w-full flex flex-row items-center gap-2 justify-center py-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition duration-200 text-sm tracking-wide font-semibold shadow-sm cursor-pointer" onClick={handleReject}><TiTimes className="text-lg font-light"/> <div>Отхвърли</div></div>
      </div> : null }
      
    </div>
  );
}