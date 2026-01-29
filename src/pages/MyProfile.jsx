import { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import { db, auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

import CardApproved from "../components/ModerationPanels/CardApproved";
import CardWaiting from "../components/ModerationPanels/CardWaiting";

export default function MyProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // 👤 Profile listener
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "Users", user.uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data());
      }
    });

    return () => unsubscribe();
  }, [user]);

  // 🗂 Posts listener (waits for profile)
  useEffect(() => {
    if (!user || !profile?.clubName) return;

    const postsRef = collection(db, "Posts");
    const q = query(
      postsRef,
      where("clubId", "==", user.uid),
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
  }, [user, profile?.clubName]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (!user) {
    return <div className="p-10 text-center">Not authenticated</div>;
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-4 md:py-10">
      <div className="w-full px-4 md:w-3/5 flex flex-col gap-6">

        {/* Profile header */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-4">
            <img
              src={profile.avatarUrl || "/default-avatar.png"}
              alt="avatar"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />

            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {profile.clubName}
              </h1>
              <p className="text-neutral-600 text-sm md:text-base">
                {profile.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              w-full md:w-auto
              px-4 py-2
              rounded-md
              border border-red-500
              text-red-500
              hover:bg-red-500 hover:text-white
              transition
              disabled:opacity-50
            "
          >
            {loggingOut ? "Излизане..." : "Изход"}
          </button>
        </div>

        {/* Stats */}
        <div className="text-sm text-neutral-600">
          <span className="font-semibold text-black">
            {posts.length}
          </span>{" "}
          публикации
        </div>

        {/* Posts */}
        <div className="flex flex-col md:gap-4">
          {posts.length === 0 && (
            <div className="text-neutral-500 text-center">
              Нямаш публикувани постове.
            </div>
          )}

          {posts.map((post) =>
            post.state === "approved" || post.state === "rejected" ? (
              <CardApproved key={post.id} post={post} />
            ) : (
              <CardWaiting key={post.id} post={post} />
            )
          )}
        </div>

      </div>
    </div>
  );
}
