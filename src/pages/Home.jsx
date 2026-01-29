import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(list);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const approvedPosts = posts.filter((p) => p.state === "approved");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 md:py-10">
      <div className="w-full max-w-2xl px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-9">
          <div className="flex flex-col mb-2 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold md:mb-1 self-center md:self-start">
              Новини
            </h1>
            <h3 className="text-sm md:text-md text-neutral-500 self-center md:self-start">
              Последни публикации и събития
            </h3>
          </div>

          <div className="pt-3">
            <Link
              to="/create"
              className="px-2 md:px-4 py-2 text-white font-semibold rounded-md text-sm md:text-md md:tracking-wide bg-teal-500 hover:bg-teal-600 transition duration-200 shadow-sm"
            >
              + Създай публикация
            </Link>
          </div>
        </div>

        {/* Content */}
        <div>
          {loading &&
            [...Array(4)].map((_, i) => (
              <PostCard key={i} post={null} />
            ))}

          {!loading && approvedPosts.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              Няма одобрени публикации
            </div>
          )}

          {!loading &&
            approvedPosts.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`} className="block w-full">
                <PostCard post={post} />
              </Link>
            ))}
        </div>

      </div>
    </div>  
  );
}
