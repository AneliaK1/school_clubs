import { getGradientFromString } from "../utils/avatar";

export default function Avatar({ name, size = 40 }) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "?";
  const gradient = getGradientFromString(name);

  return (
    <div
      className={`${gradient} flex items-center justify-center rounded-full text-white font-semibold shadow-sm`}
      style={{ width: size, height: size }}
    >
      {initial}
    </div>
  );
}