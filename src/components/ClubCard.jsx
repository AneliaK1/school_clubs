import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function ClubCard({ club }) {
  if (!club) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="h-3 w-full bg-gray-200 rounded mb-2" />
        <div className="h-3 w-5/6 bg-gray-200 rounded mb-4" />

        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    );
  }
  return (
    <div className="
      bg-white
      flex flex-col
      rounded-xl
      p-4
      shadow-sm
      hover:shadow-md
      transition
      h-full
    ">

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar name={club.clubName} size={40} />

        <div className="min-w-0">
          <div className="text-base md:text-lg font-semibold truncate">
            {club.clubName}
          </div>
          <div className="text-sm text-teal-600 font-medium">
            {club.theme}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="
        text-sm text-neutral-600
        leading-relaxed
        mb-4
        line-clamp-3
      ">
        {club.description || "Няма описание"}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <div className="
          w-full
          text-center
          py-2
          rounded-lg
          border
          border-teal-500
          text-teal-600
          font-semibold
          text-sm
          hover:bg-teal-50
          transition
        ">
          Виж повече
        </div>
      </div>
    </div>
  );
}
