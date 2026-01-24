import { addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import {useAuth} from '../context/AuthContext'
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  
  const { user, role, clubName } = useAuth();
  const navigate = useNavigate();
  
  
  
  const handlePost = async (e) => {
    e.preventDefault();
    const postData = {
      clubName,
      title,
      description,
      date,
      time,
      createdAt: serverTimestamp(),
      state: 'waiting'
      /*image*/
      
    };
    try {
    await addDoc(collection(db, "Posts"), postData);
    console.log("Post created successfully!");
    navigate('/');
    toast.success("Моля изчакайте одобрение!", {
        position: "top-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
    });
    } catch (error) {
    console.error("Error creating post:", error);
    alert("Something went wrong. Please try again."); // optional UX feedback
    }
  };
  const handleBack = ()=>{
    navigate('/');
  }

  return (
    <div className="min-h-[100dvh] bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full sm:max-w-2xl sm:mx-auto sm:bg-white sm:rounded-xl sm:shadow-md sm:p-6 sm:space-y-5
                      md:max-w-3xl lg:max-w-3xl md:p-8">

        {/* Title & Subtitle */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-1">Създай публикация</h1>
          <p className="text-gray-500 mb-6">
            Сподели новина или събитие от твоя клуб
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
              value={clubName}
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

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Снимка (по избор)
            </label>
            <input
              type="file"
              accept="image/*"
              /*onChange={(e) => setImage(e.target.files[0])}*/
              className="w-full text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Поддържани формати: JPG, PNG
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            onClick={handleBack}>
              Отказ
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-500 text-white rounded-md font-medium hover:bg-teal-600"
              
            >
              Публикувай
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
