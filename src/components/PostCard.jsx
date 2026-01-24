/*
      { 
        id: 4,
        clubName: "Изкуство клуб",
        logo: "art_club_logo.png",
        title: "Картина на седмицата",
        description: "Покажете своята креативност и участвате в нашата изложба.",
        date: "26 януари събота",
        time: null,
        state: "rejected",
        postedAt: new Date("2026-01-03T14:15:00Z")
      }
*/
/* responsive*/
import { GoClockFill } from "react-icons/go";
import { FaCalendar } from "react-icons/fa";
export default function PostCard({ post }) {
  if (!post) {
  return (
    <div className="bg-white rounded-xl p-5 my-3 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="h-4 w-3/4 bg-gray-200 rounded mb-3" />
      <div className="h-3 w-full bg-gray-200 rounded mb-2" />
      <div className="h-3 w-5/6 bg-gray-200 rounded" />
    </div>
  );
}
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 my-6">
      {/* Header: club + avatar */}
      <div className="flex flex-row items-center gap-3 mb-4">
        <div className="w-10 h-10 min-w-[2.5rem] min-h-[2.5rem] shrink-0 rounded-full bg-blue-200 overflow-hidden flex items-center justify-center"></div>
        <div>
          <div className="text-md md:text-lg font-semibold">{post.clubName}</div>
          <div className="text-xs md:text-sm text-neutral-600">Преди 2 часа</div>
        </div>
      </div>

      {/* Post title */}
      <div className="pl-1 text-md md:text-lg font-semibold break-words whitespace-normal ">{post.title}</div>

      {/* Post description */}
      <div className="pl-1 text-sm md:text-md mb-4 text-neutral-600 break-words whitespace-normal leading-relaxed">{post.description}</div>

      <hr className="my-2 " />
      <div className="flex flex-row items-center gap-16 pl-1 text-neutral-600 text-sm">
        {post.date && <div className="flex flex-row items-center gap-2"><FaCalendar /><div>{post.date}</div></div>}
        {post.time && <div className="flex flex-row items-center gap-2"><GoClockFill /><div>{post.time}</div></div>}
      </div>
      
    </div>
  );
}
