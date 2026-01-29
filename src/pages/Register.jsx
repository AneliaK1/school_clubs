import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [clubName, setClubName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [isCrossClass, setIsCrossClass] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = cred.user;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        clubName,
        name,
        surname,
        grade: isCrossClass ? null : grade,
        theme,
        description,
        role: "club-owner",
        createdAt: serverTimestamp()
      });
      toast.success('You registered succcesfully',{
        position: "top-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });
      setTimeout(()=>{navigate("/account")}, 300);
      console.log("User registered successfully");

    } catch (error) {
      console.error(error.message);
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 1500, // closes after 1.5 seconds
        style: {
          textAlign: "center", // center text
        },
      });
    }
  };

  const inputClasses =
    "w-full px-4 py-2 border rounded-md transition " +
    "focus:outline-none focus:ring-2 focus:ring-teal-400";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-100 px-4 py-10 md:py-0">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center mb-2">
          Регистрация
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Създай профил на своя клуб
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Club name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Име на клуб/организация
            </label>
            <input
              type="text"
              required
              placeholder="Напр. Математически клуб"
              className={inputClasses}
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
            />
          </div>

          {/* Name + Surname */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              required
              placeholder="Име"
              className={inputClasses}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              required
              placeholder="Фамилия"
              className={inputClasses}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          {/* Email */}
          <input
            type="email"
            required
            placeholder="you@example.com"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="••••••••"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Grade + Cross-class */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <input
              type="text"
              placeholder="Клас (напр. 10A)"
              disabled={isCrossClass}
              className={`${inputClasses} ${
                isCrossClass
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }`}
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />

            <label className="flex items-center gap-2 text-sm sm:mb-2">
              <input
                type="checkbox"
                className="accent-teal-500"
                checked={isCrossClass}
                onChange={() =>
                  setIsCrossClass(!isCrossClass)
                }
              />
              Между класове
            </label>
          </div>

          {/* Theme */}
          <select
            required
            className={inputClasses}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="">Изберете тема</option>
            <option value="Изкуство">Изкуство</option>
            <option value="Спорт">Спорт</option>
            <option value="Наука">Наука</option>
            <option value="Музика">Музика</option>
            <option value="Математика">Математика</option>
            <option value="друго">Друго</option>
          </select>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание на клуба
            </label>
            <textarea
              rows={3}
              required
              maxLength={300}
              placeholder="Кратко описание на клуба (2–3 изречения)"
              className={`${inputClasses} resize-none`}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Максимум 300 символа
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600
                       text-white py-2 rounded-md font-semibold
                       transition"
          >
            Регистрация
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Вече имаш акаунт?{" "}
          <a
            href="/login"
            className="text-teal-500 hover:underline"
          >
            Вход
          </a>
        </p>
      </div>
    </div>
  );
}
