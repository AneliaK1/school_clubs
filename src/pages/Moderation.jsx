import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { AiOutlineExclamation } from "react-icons/ai";
import { Link } from "react-router-dom";

import ModerationCard from "../components/ModerationCard";
import CardApproved from "../components/ModerationPanels/CardApproved";
import CardWaiting from "../components/ModerationPanels/CardWaiting";
// import CardRejected from "../components/ModerationPanels/CardRejected"; // if you have one

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Moderation() {
  const [panel, setPanel] = useState("waiting");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "Posts"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const waitingPosts = posts.filter((p) => p.state === "waiting");
  const approvedPosts = posts.filter((p) => p.state === "approved");
  const rejectedPosts = posts.filter((p) => p.state === "rejected");

  if (loading) {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 md:py-10">
      <div className="w-full max-w-3xl px-4 sm:px-6 flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <CardApproved key={i} post={null} />
        ))}
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 md:py-10">
      <div className="w-full max-w-3xl px-4 sm:px-6 flex flex-col gap-4">

        {/* Back */}
        <Link to="/" className="flex items-center gap-1 text-sm text-neutral-500">
          <IoMdArrowBack />
          Назад към началото
        </Link>

        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="border-2 border-teal-600 rounded-full p-1 shrink-0">
            <AiOutlineExclamation className="text-teal-600 text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-2xl md:text-3xl">
              Панел за модерация
            </h1>
            <p className="text-neutral-500 text-sm md:text-base">
              Прегледай и одобри публикации от клубовете
            </p>
          </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          <ModerationCard number={waitingPosts.length} color="text-amber-600" text="Чакащи" />
          <ModerationCard number={approvedPosts.length} color="text-green-600" text="Одобрени" />
          <ModerationCard number={rejectedPosts.length} color="text-red-600" text="Отхвърлени" />
        </div>

        {/* Desktop tabs */}
        <div className="hidden md:block">
          <div className="flex gap-5 mb-2">
            {["waiting", "approved", "rejected", "all"].map((p) => (
              <div
                key={p}
                onClick={() => setPanel(p)}
                className={`cursor-pointer px-2 pb-2 relative transition ${
                panel === p
                  ? "text-black after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-teal-600"
                  : "text-neutral-500"
              }`}

              >
                {p === "waiting" && `Чакащи (${waitingPosts.length})`}
                {p === "approved" && `Одобрени (${approvedPosts.length})`}
                {p === "rejected" && `Отхвърлени (${rejectedPosts.length})`}
                {p === "all" && `Всички (${posts.length})`}
              </div>
            ))}
          </div>
          <hr />
        </div>

        {/* Mobile select */}
        <div className="md:hidden">
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={panel}
            onChange={(e) => setPanel(e.target.value)}
          >
            <option value="waiting">Чакащи</option>
            <option value="approved">Одобрени</option>
            <option value="rejected">Отхвърлени</option>
            <option value="all">Всички</option>
          </select>
        </div>

        {/* Panels */}
        <div className="flex flex-col md:gap-4">
          {panel === "waiting" &&
            waitingPosts.map((post) => <CardWaiting key={post.id} post={post} />)}

          {panel === "approved" &&
            approvedPosts.map((post) => <CardApproved key={post.id} post={post} />)}

          {panel === "rejected" &&
            rejectedPosts.map((post) => <CardApproved key={post.id} post={post} />)}

          {panel === "all" &&
            posts.map((post) =>
              post.state === "waiting" ? (
                <CardWaiting key={post.id} post={post} />
              ) : (
                <CardApproved key={post.id} post={post} />
              )
            )}
        </div>
      </div>
    </div>
  );
}
