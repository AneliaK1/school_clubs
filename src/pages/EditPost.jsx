import { useEffect, useState } from "react";
import { serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function EditPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { user, role, clubName } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const post = state?.post;

  // ✅ safe redirect
  useEffect(() => {
    if (!post) {
      navigate("/account", { replace: true });
    }
  }, [post, navigate]);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
      setDate(post.date || "");
      setTime(post.time || "");
    }
  }, [post]);

  if (!post) return null;

  const handlePost = async (e) => {
    e.preventDefault();

    const postData = {
      clubName: post.clubName,
      clubId: post.clubId,
      title,
      description,
      date,
      time,
      createdAt: post.createdAt, 
      updatedAt: serverTimestamp(),
      state: "waiting",
      /* image */
    };

    try {
      await setDoc(doc(db, "Posts", post.id), postData);

        toast.success("Post edited succesfully!", {
        position: "top-center",
        autoClose: 2000,
        style: {
          textAlign: "center",
          width: "280px",        
          borderRadius: "12px",
          marginTop: "1rem",  
        },
      });
      if(!post.clubName){
        navigate("/account");
      } 
      else{
        navigate('/account');
      }

      
    } catch (error) {
      console.error("Error editing post:");
      toast.error("Error editing post", {
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
  };

  const handleBack = () => {
    navigate("/account");
  };

  return (
    <div className="min-h-[100dvh] bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full sm:max-w-2xl sm:mx-auto sm:bg-white sm:rounded-xl sm:shadow-md sm:p-6 sm:space-y-5
                      md:max-w-3xl lg:max-w-3xl md:p-8">

        {/* Title & Subtitle */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-1">Редактирай публикация</h1>
          <p className="text-gray-500 mb-6">
            Редактирай новина или събитие от твоя клуб
          </p>
        </div>

        <form className="space-y-5" onSubmit={handlePost}>

          {/* Club name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Клуб / Организация
            </label>
            <input
              type="text"
              value={post.clubName}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Заглавие *
            </label>
            <input
              type="text"
              placeholder="Напр. Състезание по логика"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание *
            </label>
            <textarea
              rows={4}
              placeholder="Опиши събитието или новината..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата (по избор)
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Час (по избор)
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          
          

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
              onClick={handleBack}
            >
              Отказ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600"
            >
              Запази редакцията
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
