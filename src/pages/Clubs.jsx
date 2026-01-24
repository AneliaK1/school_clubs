import { Link } from "react-router-dom";
import ClubCard from "../components/ClubCard";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "Users"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setClubs(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      },
      () => setLoading(false)
    );

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-6 md:py-10">
      <div className="w-full max-w-6xl px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">
            Клубове и организации
          </h1>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Открий или създай клуба за теб
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {loading &&
            [...Array(6)].map((_, i) => (
              <ClubCard key={i} club={null} />
            ))}

          {!loading &&
            clubs.map((club) => (
              <Link
                key={club.id}
                to={`/clubs/${club.id}`}
                className="block"
              >
                <ClubCard club={club} />
              </Link>
            ))}
        </div>

        {/* Empty state */}
        {!loading && clubs.length === 0 && (
          <div className="text-center text-neutral-400 mt-10">
            Няма налични клубове
          </div>
        )}

      </div>
    </div>
  );
}
