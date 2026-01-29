import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore";

import { db } from "../firebase";

import CardApproved from "../components/ModerationPanels/CardApproved";

export default function ClubProfile() {
  const { clubId } = useParams(); // get user ID from URL params
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👤 Profile listener
  useEffect(() => {
    if (!clubId) return;

    const userRef = doc(db, "Users", clubId);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      }
    });

    return () => unsubscribe();
  }, [clubId]);

  // 🗂 Approved posts listener
  useEffect(() => {
    if (!profile?.clubName) return;

    const postsRef = collection(db, "Posts");
    const q = query(
      postsRef,
      where("clubId", "==", clubId),
      where("state", "==", "approved"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile?.clubName]);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10">
      <div className="w-full px-4 md:w-3/5 flex flex-col gap-6">

        {/* Profile header */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex  gap-4 flex-row md:items-center">
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold">{profile.clubName}</h1>
            <p className="text-neutral-600 text-sm md:text-base">{profile.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm text-neutral-600">
          <span className="font-semibold text-black">{posts.length}</span> публикации
        </div>

        {/* Approved posts */}
        <div className="flex flex-col">
          {posts.length === 0 && (
            <div className="text-neutral-500 text-center">
              Няма одобрени публикации за показване.
            </div>
          )}

          {posts.map((post) => (
            <CardApproved key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
